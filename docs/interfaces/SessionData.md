[**WhatsApp Bot Framework**](../README.md)

***

[WhatsApp Bot Framework](../globals.md) / SessionData

# Interface: SessionData\<T\>

Defined in: [src/types/index.ts:67](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/6c0c4f4b360c7e87dd13e91d54244d90d03a5549/src/types/index.ts#L67)

Session data structure for maintaining state between messages.

## Type Parameters

• **T** = `any`

Type of custom state data

## Properties

### currentState?

> `optional` **currentState**: `string`

Defined in: [src/types/index.ts:71](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/6c0c4f4b360c7e87dd13e91d54244d90d03a5549/src/types/index.ts#L71)

Current state name

***

### lastActivity

> **lastActivity**: `number`

Defined in: [src/types/index.ts:69](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/6c0c4f4b360c7e87dd13e91d54244d90d03a5549/src/types/index.ts#L69)

Timestamp of last activity

***

### navigationPath?

> `optional` **navigationPath**: `string`[]

Defined in: [src/types/index.ts:75](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/6c0c4f4b360c7e87dd13e91d54244d90d03a5549/src/types/index.ts#L75)

History of state transitions

***

### previousState?

> `optional` **previousState**: `string`

Defined in: [src/types/index.ts:77](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/6c0c4f4b360c7e87dd13e91d54244d90d03a5549/src/types/index.ts#L77)

Previous state name for back navigation

***

### stateData?

> `optional` **stateData**: `T`

Defined in: [src/types/index.ts:73](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/6c0c4f4b360c7e87dd13e91d54244d90d03a5549/src/types/index.ts#L73)

Custom state data
