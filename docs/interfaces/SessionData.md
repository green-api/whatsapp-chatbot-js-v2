[**WhatsApp Bot Framework**](../README.md)

***

[WhatsApp Bot Framework](../globals.md) / SessionData

# Interface: SessionData\<T\>

Defined in: [src/types/index.ts:96](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/c30756ad4732aa30584821f7e49dc15f946b6a2a/src/types/index.ts#L96)

Session data structure for maintaining state between messages.

## Type Parameters

• **T** = `any`

Type of custom state data

## Properties

### currentState?

> `optional` **currentState**: `string`

Defined in: [src/types/index.ts:100](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/c30756ad4732aa30584821f7e49dc15f946b6a2a/src/types/index.ts#L100)

Current state name

***

### lastActivity

> **lastActivity**: `number`

Defined in: [src/types/index.ts:98](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/c30756ad4732aa30584821f7e49dc15f946b6a2a/src/types/index.ts#L98)

Timestamp of last activity

***

### navigationPath?

> `optional` **navigationPath**: `string`[]

Defined in: [src/types/index.ts:104](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/c30756ad4732aa30584821f7e49dc15f946b6a2a/src/types/index.ts#L104)

History of state transitions

***

### previousState?

> `optional` **previousState**: `string`

Defined in: [src/types/index.ts:106](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/c30756ad4732aa30584821f7e49dc15f946b6a2a/src/types/index.ts#L106)

Previous state name for back navigation

***

### stateData?

> `optional` **stateData**: `T`

Defined in: [src/types/index.ts:102](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/c30756ad4732aa30584821f7e49dc15f946b6a2a/src/types/index.ts#L102)

Custom state data
