[**WhatsApp Bot Framework**](../README.md)

***

[WhatsApp Bot Framework](../globals.md) / CallEvent

# Interface: CallEvent

Defined in: [src/types/index.ts:45](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L45)

A call notification from WhatsApp.

## Properties

### byApi

> **byApi**: `boolean`

Defined in: [src/types/index.ts:61](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L61)

Whether the call was started, answered or ended through the API

***

### callId

> **callId**: `string`

Defined in: [src/types/index.ts:47](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L47)

Call ID, the same as returned by bot.call

***

### chatId

> **chatId**: `string`

Defined in: [src/types/index.ts:49](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L49)

Chat of the other side

***

### direction

> **direction**: [`CallDirection`](../type-aliases/CallDirection.md)

Defined in: [src/types/index.ts:51](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L51)

Whether the call is incoming or outgoing

***

### durationSeconds

> **durationSeconds**: `number`

Defined in: [src/types/index.ts:57](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L57)

Call duration in seconds, set when the call ends

***

### ended

> **ended**: `boolean`

Defined in: [src/types/index.ts:55](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L55)

Whether this notification ends the call

***

### isVideo

> **isVideo**: `boolean`

Defined in: [src/types/index.ts:59](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L59)

Whether it is a video call

***

### raw

> **raw**: `CallWebhook`

Defined in: [src/types/index.ts:65](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L65)

Original webhook notification data

***

### status

> **status**: [`CallEventStatus`](../type-aliases/CallEventStatus.md)

Defined in: [src/types/index.ts:53](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L53)

Call status

***

### timestamp

> **timestamp**: `number`

Defined in: [src/types/index.ts:63](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L63)

Notification timestamp
