[**WhatsApp Bot Framework**](../README.md)

***

[WhatsApp Bot Framework](../globals.md) / WhatsAppBot

# Class: WhatsAppBot\<T\>

Defined in: [whatsapp-bot.ts:42](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3380234d497abd1709008132b7d2cae4528def0f/src/whatsapp-bot.ts#L42)

Main WhatsApp bot class that handles message processing, state management, and message routing.

## Example

```typescript
const bot = new WhatsAppBot({
  idInstance: "your-instance-id",
  apiTokenInstance: "your-token",
  defaultState: "menu"
});

bot.addState({
  name: "menu",
  async onMessage(message) {
    if (message.text === "help") {
      await bot.sendText(message.chatId, "Help message");
    }
  }
});

bot.start();
```

## Type Parameters

• **T** = `any`

Type of custom state data stored in sessions

## Constructors

### new WhatsAppBot()

> **new WhatsAppBot**\<`T`\>(`config`): [`WhatsAppBot`](WhatsAppBot.md)\<`T`\>

Defined in: [whatsapp-bot.ts:70](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3380234d497abd1709008132b7d2cae4528def0f/src/whatsapp-bot.ts#L70)

Creates a new WhatsApp bot instance.

#### Parameters

##### config

[`BotConfig`](../interfaces/BotConfig.md)

Bot configuration options

#### Returns

[`WhatsAppBot`](WhatsAppBot.md)\<`T`\>

## Properties

### api

> **api**: `API`

Defined in: [whatsapp-bot.ts:44](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3380234d497abd1709008132b7d2cae4528def0f/src/whatsapp-bot.ts#L44)

Green API client instance

## Methods

### addState()

> **addState**(`state`): `this`

Defined in: [whatsapp-bot.ts:106](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3380234d497abd1709008132b7d2cae4528def0f/src/whatsapp-bot.ts#L106)

Adds a new state to the bot.

#### Parameters

##### state

[`State`](../interfaces/State.md)

State object containing handlers and configuration

#### Returns

`this`

This bot instance for chaining

***

### enterState()

> **enterState**(`message`, `session`, `stateName`, `stateData`?, `skipOnEnter`?): `Promise`\<`void`\>

Defined in: [whatsapp-bot.ts:124](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3380234d497abd1709008132b7d2cae4528def0f/src/whatsapp-bot.ts#L124)

Transitions to a new state, handling state exit and entry logic.
Processes state's onEnter function return values:
- undefined: Stay in state
- string: Transition to that state
- OnEnterStateTransition object: Transition with data

#### Parameters

##### message

[`Message`](../interfaces/Message.md)

Current message context

##### session

[`SessionData`](../interfaces/SessionData.md)\<`T`\>

Current session data

##### stateName

`string`

Name of the state to enter

##### stateData?

`T`

Optional data to pass to the new state

##### skipOnEnter?

`boolean`

Whether to skip the onEnter handler

#### Returns

`Promise`\<`void`\>

***

### onRegex()

> **onRegex**(`pattern`, `handler`): `this`

Defined in: [whatsapp-bot.ts:184](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3380234d497abd1709008132b7d2cae4528def0f/src/whatsapp-bot.ts#L184)

Registers a handler for regex pattern matches.

#### Parameters

##### pattern

`RegExp`

Regular expression to match against message text

##### handler

[`MessageHandler`](../type-aliases/MessageHandler.md)\<`T`\>

Handler function to call on match

#### Returns

`this`

This bot instance for chaining

***

### onText()

> **onText**(`text`, `handler`): `this`

Defined in: [whatsapp-bot.ts:172](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3380234d497abd1709008132b7d2cae4528def0f/src/whatsapp-bot.ts#L172)

Registers a handler for exact text matches.

#### Parameters

##### text

`string`

Text to match (case-insensitive)

##### handler

[`MessageHandler`](../type-aliases/MessageHandler.md)\<`T`\>

Handler function to call on match

#### Returns

`this`

This bot instance for chaining

***

### onType()

> **onType**(`type`, `handler`): `this`

Defined in: [whatsapp-bot.ts:196](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3380234d497abd1709008132b7d2cae4528def0f/src/whatsapp-bot.ts#L196)

Registers a handler for specific message types.

#### Parameters

##### type

Message type to handle, or "*" for all types

[`MessageType`](../type-aliases/MessageType.md) | `"*"`

##### handler

[`MessageHandler`](../type-aliases/MessageHandler.md)\<`T`\>

Handler function to call for matching messages

#### Returns

`this`

This bot instance for chaining

***

### sendFile()

> **sendFile**(`chatId`, `options`): `Promise`\<`any`\>

Defined in: [whatsapp-bot.ts:220](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3380234d497abd1709008132b7d2cae4528def0f/src/whatsapp-bot.ts#L220)

Sends a file message to a chat.

#### Parameters

##### chatId

`string`

Target chat ID

##### options

File options including URL, type, and optional caption

###### caption

`string`

###### type

`"image"` \| `"video"` \| `"document"` \| `"audio"`

###### url

`string`

#### Returns

`Promise`\<`any`\>

***

### sendText()

> **sendText**(`chatId`, `text`): `Promise`\<`any`\>

Defined in: [whatsapp-bot.ts:209](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3380234d497abd1709008132b7d2cae4528def0f/src/whatsapp-bot.ts#L209)

Sends a text message to a chat.

#### Parameters

##### chatId

`string`

Target chat ID

##### text

`string`

Message text to send

#### Returns

`Promise`\<`any`\>

***

### start()

> **start**(): `Promise`\<`void`\>

Defined in: [whatsapp-bot.ts:233](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3380234d497abd1709008132b7d2cae4528def0f/src/whatsapp-bot.ts#L233)

Configures instance settings and starts the bot.
Settings configuration may take several minutes to complete.

#### Returns

`Promise`\<`void`\>

***

### stop()

> **stop**(): `void`

Defined in: [whatsapp-bot.ts:271](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3380234d497abd1709008132b7d2cae4528def0f/src/whatsapp-bot.ts#L271)

Stops the bot and cleans up resources.

#### Returns

`void`
