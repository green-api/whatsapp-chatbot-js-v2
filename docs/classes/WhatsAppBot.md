[**WhatsApp Bot Framework**](../README.md)

***

[WhatsApp Bot Framework](../globals.md) / WhatsAppBot

# Class: WhatsAppBot\<T\>

Defined in: [src/whatsapp-bot.ts:54](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/whatsapp-bot.ts#L54)

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

Defined in: [src/whatsapp-bot.ts:100](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/whatsapp-bot.ts#L100)

Creates a new WhatsApp bot instance.

#### Parameters

##### config

[`BotConfig`](../interfaces/BotConfig.md)\<`T`\>

Bot configuration options

#### Returns

[`WhatsAppBot`](WhatsAppBot.md)\<`T`\>

## Properties

### api

> **api**: `GreenApiClient`

Defined in: [src/whatsapp-bot.ts:56](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/whatsapp-bot.ts#L56)

GREEN-API client instance (@green-api/whatsapp-api-client-js-v2)

***

### handlersFirst?

> `optional` **handlersFirst**: `boolean`

Defined in: [src/whatsapp-bot.ts:83](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/whatsapp-bot.ts#L83)

Controls message processing flow, allows handlers to be processed before onMessage. Default: false

***

### storage

> `protected` `readonly` **storage**: [`StorageAdapter`](../interfaces/StorageAdapter.md)\<`T`\>

Defined in: [src/whatsapp-bot.ts:58](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/whatsapp-bot.ts#L58)

Storage adapter for session management

***

### wid?

> `optional` **wid**: `string`

Defined in: [src/whatsapp-bot.ts:79](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/whatsapp-bot.ts#L79)

## Accessors

### calls

#### Get Signature

> **get** **calls**(): `CallsConnection`

Defined in: [src/whatsapp-bot.ts:438](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/whatsapp-bot.ts#L438)

Calls connection of the instance for the call audio: play audio files, send and receive realtime audio.
Created on first use and not opened, use connectCalls() to get it open.
Audio needs the optional dependencies werift and ws, realtime audio also opusscript.

##### Returns

`CallsConnection`

## Methods

### acceptCall()

> **acceptCall**(): `Promise`\<`string`\>

Defined in: [src/whatsapp-bot.ts:408](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/whatsapp-bot.ts#L408)

Accepts the incoming call.

#### Returns

`Promise`\<`string`\>

The call ID

***

### addState()

> **addState**(`state`): `this`

Defined in: [src/whatsapp-bot.ts:179](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/whatsapp-bot.ts#L179)

Adds a new state to the bot.

#### Parameters

##### state

[`State`](../interfaces/State.md)

State object containing handlers and configuration

#### Returns

`this`

This bot instance for chaining

***

### call()

> **call**(`chatId`): `Promise`\<`string`\>

Defined in: [src/whatsapp-bot.ts:398](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/whatsapp-bot.ts#L398)

Starts an outgoing voice call. Outgoing calls work only to chats that wrote or called in the last 72 hours.

#### Parameters

##### chatId

`string`

Chat to call

#### Returns

`Promise`\<`string`\>

The call ID, the same as callId in call notifications

***

### connectCalls()

> **connectCalls**(): `Promise`\<`CallsConnection`\>

Defined in: [src/whatsapp-bot.ts:461](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/whatsapp-bot.ts#L461)

Opens the calls connection once and returns it.

#### Returns

`Promise`\<`CallsConnection`\>

The open calls connection

#### Example

```typescript
bot.onCall(async (call) => {
  if (call.direction === "incoming" && call.status === "offer") {
    const calls = await bot.connectCalls();
    await bot.acceptCall();
    await calls.startAudioBridge();
    await calls.play("./greeting.ogg");
    await bot.hangUp();
  }
});
```

***

### enterState()

> **enterState**(`message`, `session`, `stateName`, `stateData`?, `skipOnEnter`?, `continueToOnMessage`?): `Promise`\<`void`\>

Defined in: [src/whatsapp-bot.ts:198](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/whatsapp-bot.ts#L198)

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

##### continueToOnMessage?

`boolean` = `false`

Whether to continue processing the current message in onMessage after onEnter

#### Returns

`Promise`\<`void`\>

***

### hangUp()

> **hangUp**(): `Promise`\<`string`\>

Defined in: [src/whatsapp-bot.ts:428](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/whatsapp-bot.ts#L428)

Ends the current call.

#### Returns

`Promise`\<`string`\>

The call ID

***

### onCall()

> **onCall**(`handler`): `this`

Defined in: [src/whatsapp-bot.ts:387](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/whatsapp-bot.ts#L387)

Registers a handler for call notifications: incoming and outgoing calls, answers, ends, declines and missed calls.
Call handlers run alongside message processing, so playing audio in a call does not hold up messages.
With the default settings the bot turns on the call notifications when at least one call handler is registered.

#### Parameters

##### handler

[`CallHandler`](../type-aliases/CallHandler.md)

Handler function to call for every call notification

#### Returns

`this`

This bot instance for chaining

#### Example

```typescript
bot.onCall(async (call) => {
  if (call.direction === "incoming" && call.status === "offer") {
    await bot.rejectCall();
    await bot.sendText(call.chatId, "We can't take calls right now");
  }
});
```

***

### onRegex()

> **onRegex**(`patterns`, `handler`): `this`

Defined in: [src/whatsapp-bot.ts:344](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/whatsapp-bot.ts#L344)

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

Defined in: [src/whatsapp-bot.ts:329](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/whatsapp-bot.ts#L329)

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

Defined in: [src/whatsapp-bot.ts:359](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/whatsapp-bot.ts#L359)

Registers a handler for specific message types.

#### Parameters

##### type

Message type(s) to handle, or "*" for all types

[`MessageType`](../type-aliases/MessageType.md) | `"*"` | [`MessageType`](../type-aliases/MessageType.md)[]

##### handler

[`MessageHandler`](../type-aliases/MessageHandler.md)\<`T`\>

Handler function to call for matching messages

#### Returns

`this`

This bot instance for chaining

***

### rejectCall()

> **rejectCall**(): `Promise`\<`string`\>

Defined in: [src/whatsapp-bot.ts:418](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/whatsapp-bot.ts#L418)

Rejects the incoming call.

#### Returns

`Promise`\<`string`\>

The call ID

***

### sendContact()

> **sendContact**(`chatId`, `contact`): `Promise`\<`any`\>

Defined in: [src/whatsapp-bot.ts:517](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/whatsapp-bot.ts#L517)

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

Defined in: [src/whatsapp-bot.ts:558](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/whatsapp-bot.ts#L558)

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

Defined in: [src/whatsapp-bot.ts:543](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/whatsapp-bot.ts#L543)

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

Defined in: [src/whatsapp-bot.ts:580](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/whatsapp-bot.ts#L580)

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

Defined in: [src/whatsapp-bot.ts:494](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/whatsapp-bot.ts#L494)

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

Defined in: [src/whatsapp-bot.ts:479](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/whatsapp-bot.ts#L479)

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

Defined in: [src/whatsapp-bot.ts:600](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/whatsapp-bot.ts#L600)

Configures instance settings and starts the bot.
Settings configuration may take several minutes to complete.

#### Returns

`Promise`\<`void`\>

***

### stop()

> **stop**(): `void`

Defined in: [src/whatsapp-bot.ts:660](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/whatsapp-bot.ts#L660)

Stops the bot and cleans up resources.

#### Returns

`void`
