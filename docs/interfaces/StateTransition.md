[**WhatsApp Bot Framework**](../README.md)

***

[WhatsApp Bot Framework](../globals.md) / StateTransition

# Interface: StateTransition\<T\>

Defined in: [types/index.ts:78](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3380234d497abd1709008132b7d2cae4528def0f/src/types/index.ts#L78)

Represents a state transition with optional data.

## Extended by

- [`OnEnterStateTransition`](OnEnterStateTransition.md)

## Type Parameters

• **T** = `any`

Type of custom state data

## Properties

### data?

> `optional` **data**: `T`

Defined in: [types/index.ts:82](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3380234d497abd1709008132b7d2cae4528def0f/src/types/index.ts#L82)

Optional data to pass to the new state

***

### skipOnEnter?

> `optional` **skipOnEnter**: `boolean`

Defined in: [types/index.ts:84](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3380234d497abd1709008132b7d2cae4528def0f/src/types/index.ts#L84)

Whether to skip the onEnter handler

***

### state

> **state**: `string`

Defined in: [types/index.ts:80](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3380234d497abd1709008132b7d2cae4528def0f/src/types/index.ts#L80)

Target state name
