import { Settings } from "@green-api/whatsapp-api-client";
import { StorageEventEmitter } from "../storage/events";

/**
 * Configuration options for initializing the WhatsApp bot.
 * @typeParam T - Type of custom state data
 */
export interface BotConfig<T = any> {
	/** Green API instance ID */
	idInstance: string;
	/** Green API instance token */
	apiTokenInstance: string;
	/** Custom storage adapter for session management */
	storage?: StorageAdapter;
	/** Session timeout in seconds */
	sessionTimeout?: number;
	/** Function that returns timeout message based on session data */
	getSessionTimeoutMessage?: (session: SessionData<T>) => string;
	/** Initial state name for new sessions. Default: root. */
	defaultState?: string;
	/** Command text to trigger back navigation */
	backCommands?: string | string[];
	/** Custom settings. If not provided, default settings are used */
	settings?: Partial<Settings.Settings>;
	/** Whether to clear webhook notification queue on bot startup. Default: false. */
	clearWebhookQueueOnStart?: boolean;
	/** Controls message processing flow, allows handlers to be processed before onMessage. Default: false */
	handlersFirst?: boolean;
}

/**
 * Represents a normalized message from WhatsApp.
 */
export interface Message {
	/** Type of the message */
	type: MessageType;
	/** Text content if present */
	text?: string;
	/** Unique chat identifier */
	chatId: string;
	/** Unique message identifier */
	messageId: string;
	/** Message timestamp */
	timestamp: number;
	/** Name of the message sender */
	senderName: string;
	/** Media information if present (for image, video, document, audio) */
	media?: {
		/** URL to download the media */
		url?: string;
		/** Media caption if any */
		caption?: string;
		/** File name */
		fileName?: string;
		/** Mime type of the file */
		mimeType?: string;
	};
	/** Poll update */
	pollUpdate?: {
		stanzaId: string;
		name: string;
		votes: Array<{
			optionName: string;
			optionVoters: string[];
		}>;
		multipleAnswers: boolean;
	};
	/** Poll */
	poll?: {
		name: string;
		options: Array<{
			optionName: string;
		}>;
		multipleAnswers: boolean;
	};
	/** Location */
	location?: {
		latitude: number;
		longitude: number;
		name?: string;
		address?: string;
	};
	/** Contact */
	contact?: {
		displayName: string;
		vcard: string;
	};
	/** Original webhook notification data (for advanced use cases) */
	raw?: any;
}

/**
 * Session data structure for maintaining state between messages.
 * @typeParam T - Type of custom state data
 */
export interface SessionData<T = any> {
	/** Timestamp of last activity */
	lastActivity: number;
	/** Current state name */
	currentState?: string;
	/** Custom state data */
	stateData?: T;
	/** History of state transitions */
	navigationPath?: string[];
	/** Previous state name for back navigation */
	previousState?: string;
}

/** Supported message types from WhatsApp */
export type MessageType =
	"text"
	| "image"
	| "video"
	| "document"
	| "audio"
	| "location"
	| "contact"
	| "poll"
	| "pollUpdate";

/**
 * Function type for handling messages. Return true if handlersFirst config is set to "true" and you want to continue with the onMessage
 * @typeParam T - Type of custom state data
 */
export type MessageHandler<T = any> = (message: Message, session: SessionData<T>) => Promise<void | boolean>;

/**
 * Represents a state transition with optional data.
 * @typeParam T - Type of custom state data
 */
export interface StateTransition<T = any> {
	/** Target state name */
	state: string;
	/** Optional data to pass to the new state */
	data?: T;
	/** Whether to skip the onEnter handler */
	skipOnEnter?: boolean;
	/** Whether to continue processing the current message in onMessage after onEnter */
	continueToOnMessage?: boolean;
}

/**
 * Defines a state in the bot's state machine.
 * @typeParam T - Type of custom state data
 */
export interface State<T = any> {
	/** Unique state identifier */
	name: string;
	/**
	 * Handler called when entering the state.
	 * Return values:
	 * - void: Stay in state
	 * - string: Transition to that state
	 * - StateTransition: Transition with data
	 */
	onEnter?: (message: Message, stateData?: T) => Promise<void | string | StateTransition<T>>;
	/**
	 * Handler for processing messages in this state.
	 * Return values:
	 * - null: Continue to global handlers
	 * - undefined: Stop processing
	 * - string: Transition to that state
	 * - StateTransition: Transition with data
	 */
	onMessage: (message: Message, stateData?: T) => Promise<void | string | StateTransition<T> | null>;
	/** Handler called when leaving the state */
	onLeave?: (message: Message, stateData?: T) => Promise<void>;
}

/**
 * Interface for implementing custom storage solutions.
 * @typeParam T - Type of custom state data
 */
export interface StorageAdapter<T = any> {
	/** Optional event emitter for session-related events like expiration */
	events?: StorageEventEmitter<T>;

	/** Retrieves session data for a chat */
	get(chatId: string): Promise<SessionData<T> | null>;

	/** Stores session data for a chat */
	set(chatId: string, data: SessionData<T>): Promise<void>;

	/** Optional method to receive session timeout value for cleanup processes */
	setSessionTimeout?(timeoutMs: number): void;
}
