[**WhatsApp Bot Framework**](../README.md)

***

[WhatsApp Bot Framework](../globals.md) / SessionData

# Interface: SessionData\<T\>

Defined in: [src/types/index.ts:138](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L138)

Session data structure for maintaining state between messages.

## Type Parameters

• **T** = `any`

Type of custom state data

## Properties

### currentState?

> `optional` **currentState**: `string`

Defined in: [src/types/index.ts:142](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L142)

Current state name

***

### lastActivity

> **lastActivity**: `number`

Defined in: [src/types/index.ts:140](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L140)

Timestamp of last activity

***

### navigationPath?

> `optional` **navigationPath**: `string`[]

Defined in: [src/types/index.ts:146](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L146)

History of state transitions

***

### previousState?

> `optional` **previousState**: `string`

Defined in: [src/types/index.ts:148](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L148)

Previous state name for back navigation

***

### stateData?

> `optional` **stateData**: `T`

Defined in: [src/types/index.ts:144](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L144)

Custom state data
