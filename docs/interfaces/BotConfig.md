[**WhatsApp Bot Framework**](../README.md)

***

[WhatsApp Bot Framework](../globals.md) / BotConfig

# Interface: BotConfig

Defined in: [types/index.ts:6](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3380234d497abd1709008132b7d2cae4528def0f/src/types/index.ts#L6)

Configuration options for initializing the WhatsApp bot.

## Properties

### apiTokenInstance

> **apiTokenInstance**: `string`

Defined in: [types/index.ts:10](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3380234d497abd1709008132b7d2cae4528def0f/src/types/index.ts#L10)

Green API instance token

***

### backCommand?

> `optional` **backCommand**: `string`

Defined in: [types/index.ts:18](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3380234d497abd1709008132b7d2cae4528def0f/src/types/index.ts#L18)

Command text to trigger back navigation

***

### defaultState?

> `optional` **defaultState**: `string`

Defined in: [types/index.ts:16](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3380234d497abd1709008132b7d2cae4528def0f/src/types/index.ts#L16)

Initial state name for new sessions

***

### idInstance

> **idInstance**: `string`

Defined in: [types/index.ts:8](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3380234d497abd1709008132b7d2cae4528def0f/src/types/index.ts#L8)

Green API instance ID

***

### sessionTimeout?

> `optional` **sessionTimeout**: `number`

Defined in: [types/index.ts:14](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3380234d497abd1709008132b7d2cae4528def0f/src/types/index.ts#L14)

Session timeout in minutes

***

### settings?

> `optional` **settings**: `Partial`\<`Settings`\>

Defined in: [types/index.ts:20](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3380234d497abd1709008132b7d2cae4528def0f/src/types/index.ts#L20)

Custom settings. If not provided, default settings are used

***

### storage?

> `optional` **storage**: [`StorageAdapter`](StorageAdapter.md)

Defined in: [types/index.ts:12](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3380234d497abd1709008132b7d2cae4528def0f/src/types/index.ts#L12)

Custom storage adapter for session management
