[**WhatsApp Bot Framework**](../README.md)

***

[WhatsApp Bot Framework](../globals.md) / StorageAdapter

# Interface: StorageAdapter\<T\>

Defined in: [src/types/index.ts:216](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L216)

Interface for implementing custom storage solutions.

## Type Parameters

• **T** = `any`

Type of custom state data

## Properties

### events?

> `optional` **events**: [`StorageEventEmitter`](../classes/StorageEventEmitter.md)\<`T`\>

Defined in: [src/types/index.ts:218](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L218)

Optional event emitter for session-related events like expiration

## Methods

### get()

> **get**(`chatId`): `Promise`\<`null` \| [`SessionData`](SessionData.md)\<`T`\>\>

Defined in: [src/types/index.ts:221](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L221)

Retrieves session data for a chat

#### Parameters

##### chatId

`string`

#### Returns

`Promise`\<`null` \| [`SessionData`](SessionData.md)\<`T`\>\>

***

### set()

> **set**(`chatId`, `data`): `Promise`\<`void`\>

Defined in: [src/types/index.ts:224](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L224)

Stores session data for a chat

#### Parameters

##### chatId

`string`

##### data

[`SessionData`](SessionData.md)\<`T`\>

#### Returns

`Promise`\<`void`\>

***

### setSessionTimeout()?

> `optional` **setSessionTimeout**(`timeoutMs`): `void`

Defined in: [src/types/index.ts:227](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L227)

Optional method to receive session timeout value for cleanup processes

#### Parameters

##### timeoutMs

`number`

#### Returns

`void`
