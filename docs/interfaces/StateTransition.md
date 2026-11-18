[**WhatsApp Bot Framework**](../README.md)

***

[WhatsApp Bot Framework](../globals.md) / StateTransition

# Interface: StateTransition\<T\>

Defined in: [src/types/index.ts:173](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L173)

Represents a state transition with optional data.

## Type Parameters

• **T** = `any`

Type of custom state data

## Properties

### continueToOnMessage?

> `optional` **continueToOnMessage**: `boolean`

Defined in: [src/types/index.ts:181](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L181)

Whether to continue processing the current message in onMessage after onEnter

***

### data?

> `optional` **data**: `T`

Defined in: [src/types/index.ts:177](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L177)

Optional data to pass to the new state

***

### skipOnEnter?

> `optional` **skipOnEnter**: `boolean`

Defined in: [src/types/index.ts:179](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L179)

Whether to skip the onEnter handler

***

### state

> **state**: `string`

Defined in: [src/types/index.ts:175](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L175)

Target state name
