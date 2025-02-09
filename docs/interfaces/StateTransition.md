[**WhatsApp Bot Framework**](../README.md)

***

[WhatsApp Bot Framework](../globals.md) / StateTransition

# Interface: StateTransition\<T\>

Defined in: [types/index.ts:96](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/types/index.ts#L96)

Represents a state transition with optional data.

## Extended by

- [`OnEnterStateTransition`](OnEnterStateTransition.md)

## Type Parameters

• **T** = `any`

Type of custom state data

## Properties

### data?

> `optional` **data**: `T`

Defined in: [types/index.ts:100](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/types/index.ts#L100)

Optional data to pass to the new state

***

### skipOnEnter?

> `optional` **skipOnEnter**: `boolean`

Defined in: [types/index.ts:102](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/types/index.ts#L102)

Whether to skip the onEnter handler

***

### state

> **state**: `string`

Defined in: [types/index.ts:98](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/types/index.ts#L98)

Target state name
