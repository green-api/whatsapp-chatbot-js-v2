[**WhatsApp Bot Framework**](../README.md)

***

[WhatsApp Bot Framework](../globals.md) / OnEnterStateTransition

# Interface: OnEnterStateTransition\<T\>

Defined in: [types/index.ts:91](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3380234d497abd1709008132b7d2cae4528def0f/src/types/index.ts#L91)

State transition specifically for onEnter handlers.

## Extends

- [`StateTransition`](StateTransition.md)\<`T`\>

## Type Parameters

• **T** = `any`

Type of custom state data

## Properties

### data?

> `optional` **data**: `T`

Defined in: [types/index.ts:82](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3380234d497abd1709008132b7d2cae4528def0f/src/types/index.ts#L82)

Optional data to pass to the new state

#### Inherited from

[`StateTransition`](StateTransition.md).[`data`](StateTransition.md#data)

***

### skipOnEnter?

> `optional` **skipOnEnter**: `boolean`

Defined in: [types/index.ts:93](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3380234d497abd1709008132b7d2cae4528def0f/src/types/index.ts#L93)

Whether to skip the onEnter handler

#### Overrides

[`StateTransition`](StateTransition.md).[`skipOnEnter`](StateTransition.md#skiponenter)

***

### state

> **state**: `string`

Defined in: [types/index.ts:80](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3380234d497abd1709008132b7d2cae4528def0f/src/types/index.ts#L80)

Target state name

#### Inherited from

[`StateTransition`](StateTransition.md).[`state`](StateTransition.md#state)
