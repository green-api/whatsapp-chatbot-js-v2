[**WhatsApp Bot Framework**](../README.md)

***

[WhatsApp Bot Framework](../globals.md) / SessionData

# Interface: SessionData\<T\>

Defined in: [types/index.ts:52](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3380234d497abd1709008132b7d2cae4528def0f/src/types/index.ts#L52)

Session data structure for maintaining state between messages.

## Type Parameters

• **T** = `any`

Type of custom state data

## Properties

### currentState?

> `optional` **currentState**: `string`

Defined in: [types/index.ts:56](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3380234d497abd1709008132b7d2cae4528def0f/src/types/index.ts#L56)

Current state name

***

### lastActivity

> **lastActivity**: `number`

Defined in: [types/index.ts:54](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3380234d497abd1709008132b7d2cae4528def0f/src/types/index.ts#L54)

Timestamp of last activity

***

### navigationPath?

> `optional` **navigationPath**: `string`[]

Defined in: [types/index.ts:60](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3380234d497abd1709008132b7d2cae4528def0f/src/types/index.ts#L60)

History of state transitions

***

### previousState?

> `optional` **previousState**: `string`

Defined in: [types/index.ts:62](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3380234d497abd1709008132b7d2cae4528def0f/src/types/index.ts#L62)

Previous state name for back navigation

***

### stateData?

> `optional` **stateData**: `T`

Defined in: [types/index.ts:58](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3380234d497abd1709008132b7d2cae4528def0f/src/types/index.ts#L58)

Custom state data
