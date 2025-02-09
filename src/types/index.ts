import { Settings } from "@green-api/whatsapp-api-client";

/**
 * Configuration options for initializing the WhatsApp bot.
 */
export interface BotConfig {
	/** Green API instance ID */
	idInstance: string;
	/** Green API instance token */
	apiTokenInstance: string;
	/** Custom storage adapter for session management */
	storage?: StorageAdapter;
	/** Session timeout in minutes */
	sessionTimeout?: number;
	/** Initial state name for new sessions */
	defaultState: string;
	/** Command text to trigger back navigation */
	backCommands: string | string[];
	/** Custom settings. If not provided, default settings are used */
	settings?: Partial<Settings.Settings>;
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
	/** Media information if present */
	media?: {
		/** URL to download the media */
		url?: string;
		/** Media caption if any */
		caption?: string;
	};
	pollUpdate?: {
		stanzaId: string;
		name: string;
		votes: Array<{
			optionName: string;
			optionVoters: string[];
		}>;
		multipleAnswers: boolean;
	};
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
 * Function type for handling messages.
 * @typeParam T - Type of custom state data
 */
export type MessageHandler<T = any> = (message: Message, session: SessionData<T>) => Promise<void>;

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
}

/**
 * State transition specifically for onEnter handlers.
 * @typeParam T - Type of custom state data
 */
export interface OnEnterStateTransition<T = any> extends StateTransition<T> {
	/** Whether to skip the onEnter handler */
	skipOnEnter?: boolean;
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
	 * - OnEnterStateTransition: Transition with data
	 */
	onEnter?: (message: Message, stateData?: T) => Promise<void | string | OnEnterStateTransition<T>>;
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
	/** Retrieves session data for a chat */
	get(chatId: string): Promise<SessionData<T> | null>;

	/** Stores session data for a chat */
	set(chatId: string, data: SessionData<T>): Promise<void>;
}
