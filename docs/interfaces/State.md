[**WhatsApp Bot Framework**](../README.md)

***

[WhatsApp Bot Framework](../globals.md) / State

# Interface: State\<T\>

Defined in: [src/types/index.ts:117](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/6c0c4f4b360c7e87dd13e91d54244d90d03a5549/src/types/index.ts#L117)

Defines a state in the bot's state machine.

## Type Parameters

• **T** = `any`

Type of custom state data

## Properties

### name

> **name**: `string`

Defined in: [src/types/index.ts:119](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/6c0c4f4b360c7e87dd13e91d54244d90d03a5549/src/types/index.ts#L119)

Unique state identifier

***

### onEnter()?

> `optional` **onEnter**: (`message`, `stateData`?) => `Promise`\<`string` \| `void` \| [`StateTransition`](StateTransition.md)\<`T`\>\>

Defined in: [src/types/index.ts:127](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/6c0c4f4b360c7e87dd13e91d54244d90d03a5549/src/types/index.ts#L127)

Handler called when entering the state.
Return values:
- void: Stay in state
- string: Transition to that state
- StateTransition: Transition with data

#### Parameters

##### message

[`Message`](Message.md)

##### stateData?

`T`

#### Returns

`Promise`\<`string` \| `void` \| [`StateTransition`](StateTransition.md)\<`T`\>\>

***

### onLeave()?

> `optional` **onLeave**: (`message`, `stateData`?) => `Promise`\<`void`\>

Defined in: [src/types/index.ts:138](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/6c0c4f4b360c7e87dd13e91d54244d90d03a5549/src/types/index.ts#L138)

Handler called when leaving the state

#### Parameters

##### message

[`Message`](Message.md)

##### stateData?

`T`

#### Returns

`Promise`\<`void`\>

***

### onMessage()

> **onMessage**: (`message`, `stateData`?) => `Promise`\<`null` \| `string` \| `void` \| [`StateTransition`](StateTransition.md)\<`T`\>\>

Defined in: [src/types/index.ts:136](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/6c0c4f4b360c7e87dd13e91d54244d90d03a5549/src/types/index.ts#L136)

Handler for processing messages in this state.
Return values:
- null: Continue to global handlers
- undefined: Stop processing
- string: Transition to that state
- StateTransition: Transition with data

#### Parameters

##### message

[`Message`](Message.md)

##### stateData?

`T`

#### Returns

`Promise`\<`null` \| `string` \| `void` \| [`StateTransition`](StateTransition.md)\<`T`\>\>
