# WhatsApp Bot Library

A modern, state-based WhatsApp bot library for Node.js built on top of GREEN-API.

## Support Links

[![Support](https://img.shields.io/badge/support@green--api.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:support@green-api.com)
[![Support](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/greenapi_support_eng_bot)
[![Support](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/77273122366)

## Guides & News

[![Guides](https://img.shields.io/badge/YouTube-%23FF0000.svg?style=for-the-badge&logo=YouTube&logoColor=white)](https://www.youtube.com/@greenapi-en)
[![News](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/green_api)
[![News](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://whatsapp.com/channel/0029VaLj6J4LNSa2B5Jx6s3h)

[![NPM Version](https://img.shields.io/npm/v/@green-api/whatsapp-chatbot-js-v2)](https://www.npmjs.com/package/@green-api/whatsapp-chatbot-js-v2)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- State-based conversation flow
- Built-in session management
- Flexible message handling
- Navigation support
- Custom storage extensibility
- TypeScript support
- Automatic instance settings configuration

## Installation

```bash
npm install @green-api/whatsapp-chatbot-js-v2
```

## Quick Start

```typescript
import { WhatsAppBot, State } from '@green-api/whatsapp-chatbot-js-v2';

// Initialize the bot
const bot = new WhatsAppBot({
	idInstance: "your-instance-id",
	apiTokenInstance: "your-token",
	defaultState: "menu"
});

// Define states
const menuState: State = {
	name: "menu",
	async onEnter(message) {
		await bot.sendText(
			message.chatId,
			"Welcome! Choose an option:\n1. Help\n2. About"
		);
	},
	async onMessage(message) {
		if (message.text === "1") {
			return "help";
		}
		return null; // Continue to global handlers
	}
};

// Add states and start the bot
bot.addState(menuState);
bot.start();
```

## Core Components

### Bot Configuration

Complete configuration options for the WhatsAppBot:

```typescript
interface BotConfig<T = any> {
	/** Green API instance ID */
	idInstance: string;

	/** Green API instance token */
	apiTokenInstance: string;

	/** Initial state name for new sessions. Default: "root" */
	defaultState?: string;

	/** Session timeout in seconds. Default: 300 (5 minutes) */
	sessionTimeout?: number;

	/** Function to generate session timeout message based on session data */
	getSessionTimeoutMessage?: (session: SessionData<T>) => string;

	/** Command(s) to trigger back navigation. Default: "back" */
	backCommands?: string | string[];

	/** Custom storage adapter for session management. Default: MemoryStorage */
	storage?: StorageAdapter<T>;

	/** Custom settings for the GREEN-API instance */
	settings?: {
		webhookUrl?: string;
		webhookUrlToken?: string;
		outgoingWebhook?: "yes" | "no";
		stateWebhook?: "yes" | "no";
		incomingWebhook?: "yes" | "no";
		outgoingAPIMessageWebhook?: "yes" | "no";
		outgoingMessageWebhook?: "yes" | "no";
		pollMessageWebhook?: "yes" | "no";
		markIncomingMessagesReaded?: "yes" | "no";
	};

	/** Whether to clear webhook queue on bot startup. Default: false */
	clearWebhookQueueOnStart?: boolean;

	/** Controls message processing order. When true, global handlers run before state handlers (onMessage).
	 * When false (default), state handlers run first. */
	handlersFirst?: boolean;
}
```

### WhatsAppBot

Main class for creating and managing your bot:

```typescript
const bot = new WhatsAppBot<CustomSessionData>({
	// Required parameters
	idInstance: "your-instance-id",
	apiTokenInstance: "your-token",

	// Optional parameters
	defaultState: "menu",
	sessionTimeout: 30, // 30 seconds
	getSessionTimeoutMessage: (session) => {
		// Custom logic to return timeout message
		return "Your session has expired. Starting over.";
	},
	backCommands: ["back", "return", "menu"],
	storage: new CustomStorage(),
	clearWebhookQueueOnStart: true,

	// GREEN-API instance settings
	settings: {
		webhookUrl: "",
		webhookUrlToken: "",
		outgoingWebhook: "no",
		stateWebhook: "no",
		incomingWebhook: "yes",
		outgoingAPIMessageWebhook: "no",
		outgoingMessageWebhook: "no",
		pollMessageWebhook: "yes",
		markIncomingMessagesReaded: "yes"
	}
});
```

### States

States define the conversation flow:

```typescript
interface State<T = any> {
	name: string;
	onEnter?: (message, stateData?) => Promise<void | string | StateTransition>;
	onMessage: (message, stateData?) => Promise<void | string | StateTransition | null>;
	onLeave?: (message, stateData?) => Promise<void>;
}
```

State handler return values:

- `null`: Continue to global handlers
- `undefined`: Stop processing
- `string`: Transition to that state
- `StateTransition`: Transition with data

### Message Handlers

Global message handlers for specific patterns:

```typescript
// Exact text match
bot.onText("help", async (message) => {
	await bot.sendText(message.chatId, "Help message");
});

// Regular expression
bot.onRegex(/^order:\s*(\d+)$/, async (message) => {
	const [, orderId] = message.text.match(/^order:\s*(\d+)$/);
	await bot.sendText(message.chatId, `Order ${orderId} info...`);
});

// Message type
bot.onType("image", async (message) => {
	await bot.sendText(message.chatId, "Image received!");
});
```

### Storage

Built-in memory storage with custom adapter support:

```typescript
interface StorageAdapter<T = any> {
	/** Optional event emitter for session-related events like expiration */
	events?: StorageEventEmitter<T>;

	/** Retrieves session data for a chat */
	get(chatId: string): Promise<SessionData<T> | null>;

	/** Stores session data for a chat */
	set(chatId: string, data: SessionData<T>): Promise<void>;

	/** Optional method to receive session timeout value for cleanup processes */
	setSessionTimeout?(timeoutMs: number): void;
}
```

Example custom storage:

```typescript
class CustomStorage implements StorageAdapter {
	async get(chatId: string) {
		return await db.sessions.findOne({chatId});
	}

	async set(chatId: string, data: SessionData) {
		await db.sessions.upsert({chatId, ...data});
	}
}
```

# State System

The bot uses a state-based architecture where each state represents a specific point in the conversation flow. States
can have entry points, message handlers, and exit points.

## State Functions

### onEnter

Called when the bot enters a state. Useful for sending initial messages or setting up state data.

```typescript
const menuState: State = {
	name: "menu",
	async onEnter(message) {
		await bot.sendText(message.chatId, "Welcome to the menu!");
	}
};
```

Return values from onEnter:

- `void` - Stay in current state
- `string` - Name of state to transition to
- `StateTransition` - Transition with data:
  ```typescript
  return {
      state: "next_state",
      data: { someData: "value" },
      skipOnEnter: false // Optional: skip next state's onEnter
  };
  ```

### onMessage

Handles messages received while in this state.

```typescript
const orderState: State<OrderData> = {
	name: "create_order",
	async onMessage(message, data = {items: []}) {
		if (message.text === "done") {
			return "confirm_order";
		}

		// Add item to order
		data.items.push(message.text);
		return {
			state: "create_order", // Stay in same state
			data: data // Update state data
		};
	}
};
```

Return values from onMessage:

- `null` - Continue to global handlers (like back command)
- `undefined` - Stop processing
- `string` - Name of state to transition to
- `StateTransition` - Transition with data

### onLeave

Called when leaving a state. Use for cleanup or final processing.

```typescript
const paymentState: State = {
	name: "payment",
	async onLeave(message, data) {
		await savePaymentAttempt(data);
	}
};
```

## Session Management

Sessions maintain conversation state and custom data between messages.

### Session Data Structure

```typescript
interface SessionData<T = any> {
	lastActivity: number;     // Timestamp of last activity
	currentState?: string;    // Current state name
	stateData?: T;           // Custom state data
	navigationPath?: string[]; // History of states
	previousState?: string;   // Last state (for back navigation)
}
```

### State Data

Custom data persists between messages in the same state:

```typescript
interface OrderData {
	orderId: string;
	items: string[];
	total: number;
}

const bot = new WhatsAppBot<OrderData>();

const orderState: State<OrderData> = {
	name: "order",
	async onMessage(message, data = {items: [], total: 0}) {
		// data is typed as OrderData
		data.items.push(message.text);
		return {state: "order", data};
	}
};
```

### Session Timeout

Sessions expire after inactivity (default 300 seconds / 5 minutes). You can customize both the timeout duration and the
message sent when a session times out:

```typescript
const bot = new WhatsAppBot({
	// Set timeout to 30 seconds
	sessionTimeout: 30,

	// Custom timeout message
	getSessionTimeoutMessage: (session) => {
		// You can access session data to customize the message
		const userName = session.stateData?.userName || "User";
		return `Hello ${userName}, your session has expired. Starting a new conversation.`;
	}
});
```

The built-in memory storage checks for expired sessions every 10 seconds and automatically removes them. If you
implement your own storage adapter, you'll need to implement your own cleanup mechanism.

### Session Timeout Events

Storage adapters can optionally emit events when sessions expire. This feature enables the bot to send timeout
notifications:

```typescript
import { EventEmitter } from 'events';

class DatabaseStorage implements StorageAdapter {
	public events = new StorageEventEmitter();

	constructor(timeoutSeconds: number) {
		// Set up cleanup that emits events
		setInterval(() => {
			// Find expired sessions
			const expiredSessions = // ... your logic

			for (const session of expiredSessions) {
				this.events.emit('sessionExpired', session.chatId, session);
				// Delete session
			}
		}, 10000);
	}
}
```

The events field is optional - if you don't need timeout notifications, you can omit it from your storage
implementation. The timeout message is defined in the getSessionTimeoutMessage function.

## Message Handling Flow

The bot offers two message processing flows, controlled by the `handlersFirst` configuration option:

#### Default Flow (handlersFirst: false)

1. Bot receives message
2. Current state's `onMessage` handler processes message
3. Based on return value:
    - If `null`: Global handlers process message (onText, onType, onRegex)
    - If `undefined`: Stop processing
    - If state name/transition: Enter new state

#### Handlers-First Flow (handlersFirst: true)

1. Bot receives message
2. Global handlers (onText, onRegex, onType) process message
    - If a handler returns `true`, continue to state processing
    - If a handler returns anything else, stop processing
3. If previous global handler returned `true`, current state's `onMessage` handler processes it

### Handler Return Values

When using the handlers-first approach (`handlersFirst: true`), global message handlers support an additional return
value:

- undefined: Message was handled, stop processing (default)
- true: Message was partially handled, continue to state processing
- anything else: Treat as undefined (stop processing)

## Message Handling Priority (if handlersFirst: false)

Messages are processed in a specific priority order:

1. **State Handler (First)**
    - The current state's `onMessage` handler gets the first chance to process every message
    - Based on its return value:
        - `null`: Continue to global handlers
        - `undefined`: Stop processing
        - `string`: Transition to that state and stop
        - `StateTransition`: Transition with data and stop

2. **Global Handlers (Only if state handler returns null)**
   Messages that aren't fully handled by the state (returned `null`) continue to global handlers in this order:

   a. **Text Handlers**
    - Exact text matches (case-insensitive)
    - First matching handler processes the message and stops further handling

   b. **Regex Handlers**
    - Regular expression pattern matches
    - First matching pattern processes the message and stops further handling

   c. **Type Handlers**
    - Specific type handlers run first
    - Generic ("*") handlers run last as fallback
    - First matching handler processes the message and stops further handling

This means that if your state's `onMessage` handler returns `undefined` (the default return value), global handlers will
never run. Make sure to return `null` if you want to allow global handlers to process the message.

### Examples of using handlersFirst

#### Configuring the Flow Order

```typescript
const bot = new WhatsAppBot({
	idInstance: "your-instance-id",
	apiTokenInstance: "your-token",
	defaultState: "menu",
	handlersFirst: true // Process global handlers before state handlers
});
```

#### Handlers with Different Return Values

```typescript
// Handler that fully processes the message (stops further processing)
bot.onText("/help", async (message) => {
	await bot.sendText(message.chatId, "Here's the help information...");
	// No explicit return - defaults to undefined (stop processing)
});

// Handler that partially processes the message and continues to state handler
bot.onType("location", async (message) => {
	await bot.sendText(message.chatId, "I've received your location...");
	return true; // Continue to state processing for additional handling
});
```

## Global Handlers

### Text Handlers

Match exact text (case-insensitive):

```typescript
bot.onText("menu", async (message) => {
	await bot.sendText(message.chatId, "Main menu");
});
```

### Regex Handlers

Match text patterns:

```typescript
bot.onRegex(/order:\s*(\d+)/, async (message) => {
	const [, orderId] = message.text.match(/order:\s*(\d+)/);
	await bot.sendText(message.chatId, `Order ${orderId} details...`);
});
```

### Type Handlers

Handle specific message types:

```typescript
// Handle all images
bot.onType("image", async (message) => {
	const url = message.media?.url;
	await processImage(url);
});

// Handle all messages (fallback)
bot.onType("*", async (message) => {
	console.log("Unhandled message:", message);
});
```

## Custom Storage

Default storage is in-memory, but you can implement custom storage:

```typescript
class DatabaseStorage implements StorageAdapter {
	// Optional event support for timeout notifications
	public events?: StorageEventEmitter;

	constructor(timeoutSeconds: number) {
		// Optional: Set up events if you want timeout notifications
		this.events = new StorageEventEmitter();
		this.startCleanup(timeoutSeconds);
	}

	private async startCleanup(timeoutSeconds: number) {
		setInterval(async () => {
			// Your cleanup logic
			if (this.events) {
				// Emit events for expired sessions
				this.events.emit('sessionExpired', chatId, session);
			}
		}, 10000);
	}

	async get(chatId: string): Promise<SessionData | null> {
		return await db.sessions.findOne({chatId});
	}

	async set(chatId: string, data: SessionData): Promise<void> {
		await db.sessions.updateOne(
			{chatId},
			{$set: data},
			{upsert: true}
		);
	}
}

const bot = new WhatsAppBot({
	storage: new DatabaseStorage()
});
```

## State Transition Examples

### Simple State Chain

```typescript
const steps: State[] = [
	{
		name: "step1",
		async onMessage(message) {
			if (message.text) return "step2";
			return undefined;
		}
	},
	{
		name: "step2",
		async onMessage(message) {
			if (message.text) return "step3";
			return undefined;
		}
	}
];
```

### Conditional Transitions

```typescript
const menuState: State = {
	name: "menu",
	async onMessage(message) {
		switch (message.text) {
			case "1":
				return "orders";
			case "2":
				return "settings";
			default:
				return null;
		}
	}
};
```

### Data Passing Between States

```typescript
interface UserData {
	name?: string;
	age?: number;
}

const nameState: State<UserData> = {
	name: "get_name",
	async onMessage(message, data = {}) {
		return {
			state: "get_age",
			data: {...data, name: message.text}
		};
	}
};

const ageState: State<UserData> = {
	name: "get_age",
	async onMessage(message, data = {}) {
		const age = parseInt(message.text);
		return {
			state: "confirm",
			data: {...data, age}
		};
	}
};
```

## Advanced Features

### Custom State Data

Add type-safe custom data to your states:

```typescript
interface OrderData {
	orderId?: string;
	items: string[];
	total: number;
}

const bot = new WhatsAppBot<OrderData>({...});

const orderState: State<OrderData> = {
	name: "create_order",
	async onMessage(message, data = {items: [], total: 0}) {
		// Type-safe access to custom data
		data.items.push(message.text);
		return {
			state: "confirm_order",
			data: data
		};
	}
};
```

### File Handling

Send different types of files:

```typescript
await bot.sendFile(chatId, {
	url: "https://example.com/image.jpg",
	type: "image",
	caption: "Check this out!"
});
```

## Best Practices

1. **State Organization**
    - Keep states focused and single-purpose
    - Use clear naming conventions
    - Handle edge cases and errors

2. **Error Handling**
    - Implement global error handlers
    - Log errors appropriately
    - Provide user-friendly error messages

3. **Session Management**
    - Clean up old sessions regularly
    - Implement proper timeout handling

## Examples

### Support Ticket Bot

See `examples/tickets.ts` for a complete example of a support ticket system demonstrating state
management, file handling, and complex conversation flows.

### Custom Storage Implementation

Check `examples/custom-storage/` for an example of implementing a custom storage provider
with a simple bot implementation.

### Demo chatbot example

Check out [our demo chatbot](https://github.com/green-api/whatsapp-demo-chatbot-js-v2) to see a big scale
implementation, based on GREEN-API

## License

MIT
