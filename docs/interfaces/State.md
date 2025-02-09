[**WhatsApp Bot Framework**](../README.md)

***

[WhatsApp Bot Framework](../globals.md) / State

# Interface: State\<T\>

Defined in: [types/index.ts:118](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/types/index.ts#L118)

Defines a state in the bot's state machine.

## Type Parameters

• **T** = `any`

Type of custom state data

## Properties

### name

> **name**: `string`

Defined in: [types/index.ts:120](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/types/index.ts#L120)

Unique state identifier

***

### onEnter()?

> `optional` **onEnter**: (`message`, `stateData`?) => `Promise`\<`string` \| `void` \| [`OnEnterStateTransition`](OnEnterStateTransition.md)\<`T`\>\>

Defined in: [types/index.ts:128](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/types/index.ts#L128)

Handler called when entering the state.
Return values:
- void: Stay in state
- string: Transition to that state
- OnEnterStateTransition: Transition with data

#### Parameters

##### message

[`Message`](Message.md)

##### stateData?

`T`

#### Returns

`Promise`\<`string` \| `void` \| [`OnEnterStateTransition`](OnEnterStateTransition.md)\<`T`\>\>

***

### onLeave()?

> `optional` **onLeave**: (`message`, `stateData`?) => `Promise`\<`void`\>

Defined in: [types/index.ts:139](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/types/index.ts#L139)

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

Defined in: [types/index.ts:137](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/types/index.ts#L137)

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
