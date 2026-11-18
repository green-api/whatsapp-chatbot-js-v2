[**WhatsApp Bot Framework**](../README.md)

***

[WhatsApp Bot Framework](../globals.md) / State

# Interface: State\<T\>

Defined in: [src/types/index.ts:188](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L188)

Defines a state in the bot's state machine.

## Type Parameters

• **T** = `any`

Type of custom state data

## Properties

### name

> **name**: `string`

Defined in: [src/types/index.ts:190](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L190)

Unique state identifier

***

### onEnter()?

> `optional` **onEnter**: (`message`, `stateData`?) => `Promise`\<`string` \| `void` \| [`StateTransition`](StateTransition.md)\<`T`\>\>

Defined in: [src/types/index.ts:198](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L198)

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

Defined in: [src/types/index.ts:209](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L209)

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

Defined in: [src/types/index.ts:207](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L207)

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
