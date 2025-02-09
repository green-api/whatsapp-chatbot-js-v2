[**WhatsApp Bot Framework**](../README.md)

***

[WhatsApp Bot Framework](../globals.md) / OnEnterStateTransition

# Interface: OnEnterStateTransition\<T\>

Defined in: [types/index.ts:109](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/types/index.ts#L109)

State transition specifically for onEnter handlers.

## Extends

- [`StateTransition`](StateTransition.md)\<`T`\>

## Type Parameters

• **T** = `any`

Type of custom state data

## Properties

### data?

> `optional` **data**: `T`

Defined in: [types/index.ts:100](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/types/index.ts#L100)

Optional data to pass to the new state

#### Inherited from

[`StateTransition`](StateTransition.md).[`data`](StateTransition.md#data)

***

### skipOnEnter?

> `optional` **skipOnEnter**: `boolean`

Defined in: [types/index.ts:111](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/types/index.ts#L111)

Whether to skip the onEnter handler

#### Overrides

[`StateTransition`](StateTransition.md).[`skipOnEnter`](StateTransition.md#skiponenter)

***

### state

> **state**: `string`

Defined in: [types/index.ts:98](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/types/index.ts#L98)

Target state name

#### Inherited from

[`StateTransition`](StateTransition.md).[`state`](StateTransition.md#state)
