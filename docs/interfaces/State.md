[**WhatsApp Bot Framework**](../README.md)

***

[WhatsApp Bot Framework](../globals.md) / State

# Interface: State\<T\>

Defined in: [src/types/index.ts:146](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/c30756ad4732aa30584821f7e49dc15f946b6a2a/src/types/index.ts#L146)

Defines a state in the bot's state machine.

## Type Parameters

• **T** = `any`

Type of custom state data

## Properties

### name

> **name**: `string`

Defined in: [src/types/index.ts:148](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/c30756ad4732aa30584821f7e49dc15f946b6a2a/src/types/index.ts#L148)

Unique state identifier

***

### onEnter()?

> `optional` **onEnter**: (`message`, `stateData`?) => `Promise`\<`string` \| `void` \| [`StateTransition`](StateTransition.md)\<`T`\>\>

Defined in: [src/types/index.ts:156](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/c30756ad4732aa30584821f7e49dc15f946b6a2a/src/types/index.ts#L156)

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

Defined in: [src/types/index.ts:167](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/c30756ad4732aa30584821f7e49dc15f946b6a2a/src/types/index.ts#L167)

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

Defined in: [src/types/index.ts:165](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/c30756ad4732aa30584821f7e49dc15f946b6a2a/src/types/index.ts#L165)

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
