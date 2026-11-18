[**WhatsApp Bot Framework**](../README.md)

***

[WhatsApp Bot Framework](../globals.md) / BotConfig

# Interface: BotConfig\<T\>

Defined in: [src/types/index.ts:8](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L8)

Configuration options for initializing the WhatsApp bot.

## Type Parameters

• **T** = `any`

Type of custom state data

## Properties

### apiTokenInstance

> **apiTokenInstance**: `string`

Defined in: [src/types/index.ts:12](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L12)

Green API instance token

***

### backCommands?

> `optional` **backCommands**: `string` \| `string`[]

Defined in: [src/types/index.ts:22](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L22)

Command text to trigger back navigation

***

### calls?

> `optional` **calls**: `CallsConnectionOptions`

Defined in: [src/types/index.ts:30](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L30)

Options of the calls connection (bot.calls), for example the PCM sample rate of realtime audio

***

### clearWebhookQueueOnStart?

> `optional` **clearWebhookQueueOnStart**: `boolean`

Defined in: [src/types/index.ts:26](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L26)

Whether to clear webhook notification queue on bot startup. Default: false.

***

### defaultState?

> `optional` **defaultState**: `string`

Defined in: [src/types/index.ts:20](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L20)

Initial state name for new sessions. Default: root.

***

### getSessionTimeoutMessage()?

> `optional` **getSessionTimeoutMessage**: (`session`) => `string`

Defined in: [src/types/index.ts:18](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L18)

Function that returns timeout message based on session data

#### Parameters

##### session

[`SessionData`](SessionData.md)\<`T`\>

#### Returns

`string`

***

### handlersFirst?

> `optional` **handlersFirst**: `boolean`

Defined in: [src/types/index.ts:28](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L28)

Controls message processing flow, allows handlers to be processed before onMessage. Default: false

***

### idInstance

> **idInstance**: `string`

Defined in: [src/types/index.ts:10](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L10)

Green API instance ID

***

### sessionTimeout?

> `optional` **sessionTimeout**: `number`

Defined in: [src/types/index.ts:16](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L16)

Session timeout in seconds

***

### settings?

> `optional` **settings**: `Partial`\<`Settings`\>

Defined in: [src/types/index.ts:24](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L24)

Custom settings. If not provided, default settings are used

***

### storage?

> `optional` **storage**: [`StorageAdapter`](StorageAdapter.md)

Defined in: [src/types/index.ts:14](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L14)

Custom storage adapter for session management
