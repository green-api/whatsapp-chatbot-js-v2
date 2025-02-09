[**WhatsApp Bot Framework**](../README.md)

***

[WhatsApp Bot Framework](../globals.md) / StorageAdapter

# Interface: StorageAdapter\<T\>

Defined in: [types/index.ts:146](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/types/index.ts#L146)

Interface for implementing custom storage solutions.

## Type Parameters

• **T** = `any`

Type of custom state data

## Methods

### get()

> **get**(`chatId`): `Promise`\<`null` \| [`SessionData`](SessionData.md)\<`T`\>\>

Defined in: [types/index.ts:148](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/types/index.ts#L148)

Retrieves session data for a chat

#### Parameters

##### chatId

`string`

#### Returns

`Promise`\<`null` \| [`SessionData`](SessionData.md)\<`T`\>\>

***

### set()

> **set**(`chatId`, `data`): `Promise`\<`void`\>

Defined in: [types/index.ts:151](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/types/index.ts#L151)

Stores session data for a chat

#### Parameters

##### chatId

`string`

##### data

[`SessionData`](SessionData.md)\<`T`\>

#### Returns

`Promise`\<`void`\>
