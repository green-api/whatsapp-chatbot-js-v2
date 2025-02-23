[**WhatsApp Bot Framework**](../README.md)

***

[WhatsApp Bot Framework](../globals.md) / StateTransition

# Interface: StateTransition\<T\>

Defined in: [src/types/index.ts:102](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/6c0c4f4b360c7e87dd13e91d54244d90d03a5549/src/types/index.ts#L102)

Represents a state transition with optional data.

## Type Parameters

• **T** = `any`

Type of custom state data

## Properties

### continueToOnMessage?

> `optional` **continueToOnMessage**: `boolean`

Defined in: [src/types/index.ts:110](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/6c0c4f4b360c7e87dd13e91d54244d90d03a5549/src/types/index.ts#L110)

Whether to continue processing the current message in onMessage after onEnter

***

### data?

> `optional` **data**: `T`

Defined in: [src/types/index.ts:106](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/6c0c4f4b360c7e87dd13e91d54244d90d03a5549/src/types/index.ts#L106)

Optional data to pass to the new state

***

### skipOnEnter?

> `optional` **skipOnEnter**: `boolean`

Defined in: [src/types/index.ts:108](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/6c0c4f4b360c7e87dd13e91d54244d90d03a5549/src/types/index.ts#L108)

Whether to skip the onEnter handler

***

### state

> **state**: `string`

Defined in: [src/types/index.ts:104](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/6c0c4f4b360c7e87dd13e91d54244d90d03a5549/src/types/index.ts#L104)

Target state name
