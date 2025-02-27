[**WhatsApp Bot Framework**](../README.md)

***

[WhatsApp Bot Framework](../globals.md) / StateTransition

# Interface: StateTransition\<T\>

Defined in: [src/types/index.ts:131](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/c30756ad4732aa30584821f7e49dc15f946b6a2a/src/types/index.ts#L131)

Represents a state transition with optional data.

## Type Parameters

• **T** = `any`

Type of custom state data

## Properties

### continueToOnMessage?

> `optional` **continueToOnMessage**: `boolean`

Defined in: [src/types/index.ts:139](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/c30756ad4732aa30584821f7e49dc15f946b6a2a/src/types/index.ts#L139)

Whether to continue processing the current message in onMessage after onEnter

***

### data?

> `optional` **data**: `T`

Defined in: [src/types/index.ts:135](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/c30756ad4732aa30584821f7e49dc15f946b6a2a/src/types/index.ts#L135)

Optional data to pass to the new state

***

### skipOnEnter?

> `optional` **skipOnEnter**: `boolean`

Defined in: [src/types/index.ts:137](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/c30756ad4732aa30584821f7e49dc15f946b6a2a/src/types/index.ts#L137)

Whether to skip the onEnter handler

***

### state

> **state**: `string`

Defined in: [src/types/index.ts:133](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/c30756ad4732aa30584821f7e49dc15f946b6a2a/src/types/index.ts#L133)

Target state name
