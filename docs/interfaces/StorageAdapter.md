[**WhatsApp Bot Framework**](../README.md)

***

[WhatsApp Bot Framework](../globals.md) / StorageAdapter

# Interface: StorageAdapter\<T\>

Defined in: [src/types/index.ts:174](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/c30756ad4732aa30584821f7e49dc15f946b6a2a/src/types/index.ts#L174)

Interface for implementing custom storage solutions.

## Type Parameters

• **T** = `any`

Type of custom state data

## Properties

### events?

> `optional` **events**: [`StorageEventEmitter`](../classes/StorageEventEmitter.md)\<`T`\>

Defined in: [src/types/index.ts:176](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/c30756ad4732aa30584821f7e49dc15f946b6a2a/src/types/index.ts#L176)

Optional event emitter for session-related events like expiration

## Methods

### get()

> **get**(`chatId`): `Promise`\<`null` \| [`SessionData`](SessionData.md)\<`T`\>\>

Defined in: [src/types/index.ts:179](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/c30756ad4732aa30584821f7e49dc15f946b6a2a/src/types/index.ts#L179)

Retrieves session data for a chat

#### Parameters

##### chatId

`string`

#### Returns

`Promise`\<`null` \| [`SessionData`](SessionData.md)\<`T`\>\>

***

### set()

> **set**(`chatId`, `data`): `Promise`\<`void`\>

Defined in: [src/types/index.ts:182](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/c30756ad4732aa30584821f7e49dc15f946b6a2a/src/types/index.ts#L182)

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

Defined in: [src/types/index.ts:185](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/c30756ad4732aa30584821f7e49dc15f946b6a2a/src/types/index.ts#L185)

Optional method to receive session timeout value for cleanup processes

#### Parameters

##### timeoutMs

`number`

#### Returns

`void`
