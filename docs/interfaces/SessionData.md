[**WhatsApp Bot Framework**](../README.md)

***

[WhatsApp Bot Framework](../globals.md) / SessionData

# Interface: SessionData\<T\>

Defined in: [types/index.ts:61](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/types/index.ts#L61)

Session data structure for maintaining state between messages.

## Type Parameters

• **T** = `any`

Type of custom state data

## Properties

### currentState?

> `optional` **currentState**: `string`

Defined in: [types/index.ts:65](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/types/index.ts#L65)

Current state name

***

### lastActivity

> **lastActivity**: `number`

Defined in: [types/index.ts:63](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/types/index.ts#L63)

Timestamp of last activity

***

### navigationPath?

> `optional` **navigationPath**: `string`[]

Defined in: [types/index.ts:69](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/types/index.ts#L69)

History of state transitions

***

### previousState?

> `optional` **previousState**: `string`

Defined in: [types/index.ts:71](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/types/index.ts#L71)

Previous state name for back navigation

***

### stateData?

> `optional` **stateData**: `T`

Defined in: [types/index.ts:67](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/types/index.ts#L67)

Custom state data
