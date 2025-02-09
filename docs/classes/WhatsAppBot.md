[**WhatsApp Bot Framework**](../README.md)

***

[WhatsApp Bot Framework](../globals.md) / WhatsAppBot

# Class: WhatsAppBot\<T\>

Defined in: [whatsapp-bot.ts:37](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/whatsapp-bot.ts#L37)

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

Defined in: [whatsapp-bot.ts:66](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/whatsapp-bot.ts#L66)

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

Defined in: [whatsapp-bot.ts:39](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/whatsapp-bot.ts#L39)

Green API client instance

***

### wid?

> `optional` **wid**: `string`

Defined in: [whatsapp-bot.ts:59](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/whatsapp-bot.ts#L59)

## Methods

### addState()

> **addState**(`state`): `this`

Defined in: [whatsapp-bot.ts:106](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/whatsapp-bot.ts#L106)

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

Defined in: [whatsapp-bot.ts:124](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/whatsapp-bot.ts#L124)

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

> **onRegex**(`patterns`, `handler`): `this`

Defined in: [whatsapp-bot.ts:187](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/whatsapp-bot.ts#L187)

Registers a handler for regex pattern matches.

#### Parameters

##### patterns

Regular expression(s) to match against message text

`RegExp` | `RegExp`[]

##### handler

[`MessageHandler`](../type-aliases/MessageHandler.md)\<`T`\>

Handler function to call on match

#### Returns

`this`

This bot instance for chaining

***

### onText()

> **onText**(`text`, `handler`): `this`

Defined in: [whatsapp-bot.ts:172](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/whatsapp-bot.ts#L172)

Registers a handler for exact text matches.

#### Parameters

##### text

Text or array of texts to match (case-insensitive)

`string` | `string`[]

##### handler

[`MessageHandler`](../type-aliases/MessageHandler.md)\<`T`\>

Handler function to call on match

#### Returns

`this`

This bot instance for chaining

***

### onType()

> **onType**(`type`, `handler`): `this`

Defined in: [whatsapp-bot.ts:202](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/whatsapp-bot.ts#L202)

Registers a handler for specific message types.

#### Parameters

##### type

Message type(s) to handle, or "*" for all types

[`MessageType`](../type-aliases/MessageType.md) | [`MessageType`](../type-aliases/MessageType.md)[] | `"*"`

##### handler

[`MessageHandler`](../type-aliases/MessageHandler.md)\<`T`\>

Handler function to call for matching messages

#### Returns

`this`

This bot instance for chaining

***

### sendContact()

> **sendContact**(`chatId`, `contact`): `Promise`\<`any`\>

Defined in: [whatsapp-bot.ts:260](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/whatsapp-bot.ts#L260)

Sends contact information to a chat.

#### Parameters

##### chatId

`string`

Target chat ID

##### contact

Contact information to send

###### company

`string`

###### firstName

`string`

###### lastName

`string`

###### middleName

`string`

###### phoneContact

`number`

#### Returns

`Promise`\<`any`\>

***

### sendFileByUpload()

> **sendFileByUpload**(`chatId`, `options`): `Promise`\<`any`\>

Defined in: [whatsapp-bot.ts:301](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/whatsapp-bot.ts#L301)

Sends a file to a chat using file upload.

#### Parameters

##### chatId

`string`

Target chat ID

##### options

File upload options including file path, name and optional caption

###### caption

`string`

###### fileName

`string`

###### filePath

`string`

###### quotedMessageId

`string`

#### Returns

`Promise`\<`any`\>

***

### sendFileByUrl()

> **sendFileByUrl**(`chatId`, `options`): `Promise`\<`any`\>

Defined in: [whatsapp-bot.ts:286](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/whatsapp-bot.ts#L286)

Sends a file by url to a chat.

#### Parameters

##### chatId

`string`

Target chat ID

##### options

File options including URL, type, and optional caption

###### caption

`string`

###### fileName

`string`

###### url

`string`

#### Returns

`Promise`\<`any`\>

***

### sendLocation()

> **sendLocation**(`chatId`, `location`): `Promise`\<`any`\>

Defined in: [whatsapp-bot.ts:332](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/whatsapp-bot.ts#L332)

Sends a location message to a chat.

#### Parameters

##### chatId

`string`

Target chat ID

##### location

Location information

###### address

`string`

###### latitude

`number`

###### longitude

`number`

###### name

`string`

#### Returns

`Promise`\<`any`\>

***

### sendPoll()

> **sendPoll**(`chatId`, `options`): `Promise`\<`any`\>

Defined in: [whatsapp-bot.ts:236](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/whatsapp-bot.ts#L236)

Sends a poll message to a chat.

#### Parameters

##### chatId

`string`

Target chat ID

##### options

Poll options including question and choices

###### multipleAnswers

`boolean`

###### options

`string`[]

###### question

`string`

###### quotedMessageId

`string`

#### Returns

`Promise`\<`any`\>

***

### sendText()

> **sendText**(`chatId`, `text`, `options`?): `Promise`\<`any`\>

Defined in: [whatsapp-bot.ts:221](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/whatsapp-bot.ts#L221)

Sends a text message to a chat.

#### Parameters

##### chatId

`string`

Target chat ID

##### text

`string`

Message text to send

##### options?

Additional options

###### linkPreview

`boolean`

Whether to display link previews in the message. Defaults to true

###### quotedMessageId

`string`

ID of the message to quote

#### Returns

`Promise`\<`any`\>

***

### start()

> **start**(): `Promise`\<`void`\>

Defined in: [whatsapp-bot.ts:353](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/whatsapp-bot.ts#L353)

Configures instance settings and starts the bot.
Settings configuration may take several minutes to complete.

#### Returns

`Promise`\<`void`\>

***

### stop()

> **stop**(): `void`

Defined in: [whatsapp-bot.ts:408](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/whatsapp-bot.ts#L408)

Stops the bot and cleans up resources.

#### Returns

`void`
