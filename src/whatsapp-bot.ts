import { restAPI, API, WebhookResponse, Settings } from "@green-api/whatsapp-api-client";
import {
	BotConfig,
	Message,
	MessageType,
	MessageHandler,
	State,
	SessionData,
	StorageAdapter,
} from "./types";
import { MemoryStorage } from "./storage/memory";
import { parseMessage } from "./parser/message-parser";
import debugFactory from "debug";

const debug = debugFactory("@green-api/whatsapp-bot");

/**
 * Main WhatsApp bot class that handles message processing, state management, and message routing.
 *
 * @typeParam T - Type of custom state data stored in sessions
 *
 * @example
 * ```typescript
 * const bot = new WhatsAppBot({
 *   idInstance: "your-instance-id",
 *   apiTokenInstance: "your-token",
 *   defaultState: "menu"
 * });
 *
 * bot.addState({
 *   name: "menu",
 *   async onMessage(message) {
 *     if (message.text === "help") {
 *       await bot.sendText(message.chatId, "Help message");
 *     }
 *   }
 * });
 *
 * bot.start();
 * ```
 */
export class WhatsAppBot<T = any> {
	/** Green API client instance */
	public api: API;
	/** Storage adapter for session management */
	private readonly storage: StorageAdapter<T>;
	/** Map of message type handlers */
	private typeHandlers = new Map<string, MessageHandler<T>[]>();
	/** Map of exact text match handlers */
	private textHandlers = new Map<string, MessageHandler<T>>();
	/** Array of regex pattern handlers */
	private regexHandlers: { pattern: RegExp; handler: MessageHandler<T> }[] = [];
	/** Map of state handlers */
	private states = new Map<string, State<T>>();
	/** Session timeout in milliseconds */
	private readonly sessionTimeout: number;
	/** Bot running status */
	private isRunning = false;
	/** Default state name */
	private readonly defaultState: string;
	/** Command to trigger back navigation */
	private readonly backCommand: string;
	private readonly settings: Partial<Settings.Settings>;

	/**
	 * Creates a new WhatsApp bot instance.
	 *
	 * @param config - Bot configuration options
	 */
	constructor(config: BotConfig) {
		this.api = restAPI({
			idInstance: config.idInstance,
			apiTokenInstance: config.apiTokenInstance,
		});

		this.storage = config.storage || new MemoryStorage<T>();
		this.sessionTimeout = (config.sessionTimeout || 5) * 60000;
		this.defaultState = config.defaultState || "root";
		this.backCommand = config.backCommand || "back";
		this.settings = config.settings || {
			webhookUrl: "",
			webhookUrlToken: "",
			outgoingWebhook: "no",
			stateWebhook: "no",
			incomingWebhook: "yes",
			outgoingAPIMessageWebhook: "no",
			outgoingMessageWebhook: "no",
			pollMessageWebhook: "yes",
		};

		this.onText(this.backCommand, async (message, session) => {
			if (session.previousState) {
				await this.enterState(message, session, session.previousState);
			} else {
				await this.enterState(message, session, this.defaultState);
			}
		});
	}

	/**
	 * Adds a new state to the bot.
	 *
	 * @param state - State object containing handlers and configuration
	 * @returns This bot instance for chaining
	 */
	addState(state: State): this {
		this.states.set(state.name, state);
		return this;
	}

	/**
	 * Transitions to a new state, handling state exit and entry logic.
	 * Processes state's onEnter function return values:
	 * - undefined: Stay in state
	 * - string: Transition to that state
	 * - OnEnterStateTransition object: Transition with data
	 *
	 * @param message - Current message context
	 * @param session - Current session data
	 * @param stateName - Name of the state to enter
	 * @param stateData - Optional data to pass to the new state
	 * @param skipOnEnter - Whether to skip the onEnter handler
	 */
	async enterState(
		message: Message,
		session: SessionData<T>,
		stateName: string,
		stateData?: T,
		skipOnEnter?: boolean,
	): Promise<void> {
		const state = this.states.get(stateName);
		if (!state) {
			throw new Error(`State ${stateName} not found`);
		}

		if (session.currentState) {
			const currentState = this.states.get(session.currentState);
			if (currentState?.onLeave) {
				await currentState.onLeave(message, session.stateData);
			}
		}

		session.previousState = session.currentState;
		if (!session.navigationPath) {
			session.navigationPath = [];
		}
		session.navigationPath.push(stateName);

		session.currentState = stateName;
		session.stateData = stateData;
		await this.storage.set(message.chatId, session);

		if (state.onEnter && !skipOnEnter) {
			const result = await state.onEnter(message, stateData);
			if (result) {
				if (typeof result === "string") {
					await this.enterState(message, session, result, undefined, false);
				} else if ("state" in result) {
					await this.enterState(message, session, result.state, result.data, result.skipOnEnter);
				}
			}
		}
	}

	/**
	 * Registers a handler for exact text matches.
	 *
	 * @param text - Text to match (case-insensitive)
	 * @param handler - Handler function to call on match
	 * @returns This bot instance for chaining
	 */
	onText(text: string, handler: MessageHandler<T>): this {
		this.textHandlers.set(text.toLowerCase(), handler);
		return this;
	}

	/**
	 * Registers a handler for regex pattern matches.
	 *
	 * @param pattern - Regular expression to match against message text
	 * @param handler - Handler function to call on match
	 * @returns This bot instance for chaining
	 */
	onRegex(pattern: RegExp, handler: MessageHandler<T>): this {
		this.regexHandlers.push({pattern, handler});
		return this;
	}

	/**
	 * Registers a handler for specific message types.
	 *
	 * @param type - Message type to handle, or "*" for all types
	 * @param handler - Handler function to call for matching messages
	 * @returns This bot instance for chaining
	 */
	onType(type: MessageType | "*", handler: MessageHandler<T>): this {
		const handlers = this.typeHandlers.get(type) || [];
		handlers.push(handler);
		this.typeHandlers.set(type, handlers);
		return this;
	}

	/**
	 * Sends a text message to a chat.
	 *
	 * @param chatId - Target chat ID
	 * @param text - Message text to send
	 */
	async sendText(chatId: string, text: string): Promise<any> {
		debug("Sending text", {chatId, text});
		return this.api.message.sendMessage(chatId, null, text);
	}

	/**
	 * Sends a file message to a chat.
	 *
	 * @param chatId - Target chat ID
	 * @param options - File options including URL, type, and optional caption
	 */
	async sendFile(chatId: string, options: {
		url: string;
		type: "image" | "video" | "document" | "audio";
		caption?: string;
	}): Promise<any> {
		debug("Sending file", {chatId, options});
		return this.api.file.sendFileByUrl(chatId, null, options.url, options.type, options.caption);
	}

	/**
	 * Configures instance settings and starts the bot.
	 * Settings configuration may take several minutes to complete.
	 */
	async start(): Promise<void> {
		if (this.isRunning) return;

		debug("Starting bot initialization");

		try {
			await this.api.settings.setSettings(this.settings);
			debug("Settings configuration initiated - they may take several minutes to apply");
		} catch (error: any) {
			debug("Error during settings configuration:", error);
			throw new Error(`Failed to configure settings: ${error.message}`);
		}

		this.isRunning = true;
		debug("Bot started - beginning message processing");

		const RETRY_DELAY = 10000; // 10 seconds

		while (this.isRunning) {
			try {
				const notification = await this.api.webhookService.receiveNotification();
				if (notification) {
					debug(notification);
					await this.handleNotification(notification);
					await this.api.webhookService.deleteNotification(notification.receiptId);
				}

				await new Promise(resolve => setTimeout(resolve, 100));
			} catch (error) {
				debug("Error receiving notifications, will retry in 10 seconds:", error);
				await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
			}
		}
	}

	/**
	 * Stops the bot and cleans up resources.
	 */
	stop(): void {
		debug("Stopping bot");
		this.isRunning = false;
		if (this.storage instanceof MemoryStorage) {
			(this.storage as MemoryStorage<T>).stopCleanup();
		}
	}

	/**
	 * Processes an incoming webhook notification and routes it through the handler chain.
	 * First attempts to handle via state's onMessage handler, then falls back to global handlers
	 * if the state's onMessage function returns null. State.onMessage return values:
	 * - null: Continue to global handlers
	 * - undefined: Stop processing
	 * - string: Transition to that state
	 * - StateTransition object: Transition with data
	 *
	 * Note: State's onEnter return values are handled by enterState method, not here.
	 *
	 * @param notification - Webhook notification from WhatsApp
	 * @internal
	 */
	private async handleNotification(notification: WebhookResponse.Notification): Promise<void> {
		if (notification.body.typeWebhook !== "incomingMessageReceived") {
			return;
		}

		const message = parseMessage(notification.body);
		const session = await this.getSession(message.chatId);

		if (!session.currentState) {
			await this.enterState(message, session, this.defaultState);
			return;
		}

		let shouldContinueToHandlers = true;

		if (session.currentState) {
			const state = this.states.get(session.currentState);
			if (state) {
				const result = await state.onMessage(message, session.stateData);

				if (result === null) {
					shouldContinueToHandlers = true;
				} else if (result === undefined) {
					shouldContinueToHandlers = false;
				} else if (typeof result === "string") {
					await this.enterState(message, session, result);
					shouldContinueToHandlers = false;
				} else if (typeof result === "object" && "state" in result) {
					await this.enterState(message, session, result.state, result.data);
					shouldContinueToHandlers = false;
				}
			}
		}

		if (shouldContinueToHandlers) {
			if (message.text) {
				const lowerText = message.text.toLowerCase();
				const textHandler = this.textHandlers.get(lowerText);
				if (textHandler) {
					await textHandler(message, session);
					return;
				}

				for (const {pattern, handler} of this.regexHandlers) {
					if (pattern.test(message.text)) {
						await handler(message, session);
						return;
					}
				}
			}

			const typeHandlers = [
				...(this.typeHandlers.get("*") || []),
				...(this.typeHandlers.get(message.type) || []),
			];

			for (const handler of typeHandlers) {
				await handler(message, session);
			}
		}
	}

	/**
	 * Retrieves or creates a session for a chat, handling timeout logic and activity updates.
	 * Creates a new session if the existing one has timed out.
	 *
	 * @param chatId - Chat ID to get session for
	 * @returns Session data for the chat
	 * @internal
	 */
	private async getSession(chatId: string): Promise<SessionData<T>> {
		const session = await this.storage.get(chatId) || {
			lastActivity: Date.now(),
		};

		if (Date.now() - session.lastActivity > this.sessionTimeout) {
			const newSession = {lastActivity: Date.now()};
			await this.storage.set(chatId, newSession);
			return newSession;
		}

		session.lastActivity = Date.now();
		await this.storage.set(chatId, session);
		return session;
	}
}
