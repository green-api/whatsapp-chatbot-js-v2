[**WhatsApp Bot Framework**](../README.md)

***

[WhatsApp Bot Framework](../globals.md) / StorageAdapter

# Interface: StorageAdapter\<T\>

Defined in: [types/index.ts:128](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3380234d497abd1709008132b7d2cae4528def0f/src/types/index.ts#L128)

Interface for implementing custom storage solutions.

## Type Parameters

• **T** = `any`

Type of custom state data

## Methods

### get()

> **get**(`chatId`): `Promise`\<`null` \| [`SessionData`](SessionData.md)\<`T`\>\>

Defined in: [types/index.ts:130](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3380234d497abd1709008132b7d2cae4528def0f/src/types/index.ts#L130)

Retrieves session data for a chat

#### Parameters

##### chatId

`string`

#### Returns

`Promise`\<`null` \| [`SessionData`](SessionData.md)\<`T`\>\>

***

### set()

> **set**(`chatId`, `data`): `Promise`\<`void`\>

Defined in: [types/index.ts:133](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3380234d497abd1709008132b7d2cae4528def0f/src/types/index.ts#L133)

Stores session data for a chat

#### Parameters

##### chatId

`string`

##### data

[`SessionData`](SessionData.md)\<`T`\>

#### Returns

`Promise`\<`void`\>
