[**WhatsApp Bot Framework**](../README.md)

***

[WhatsApp Bot Framework](../globals.md) / StorageAdapter

# Interface: StorageAdapter\<T\>

Defined in: [src/types/index.ts:145](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/6c0c4f4b360c7e87dd13e91d54244d90d03a5549/src/types/index.ts#L145)

Interface for implementing custom storage solutions.

## Type Parameters

• **T** = `any`

Type of custom state data

## Properties

### events?

> `optional` **events**: [`StorageEventEmitter`](../classes/StorageEventEmitter.md)\<`T`\>

Defined in: [src/types/index.ts:147](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/6c0c4f4b360c7e87dd13e91d54244d90d03a5549/src/types/index.ts#L147)

Optional event emitter for session-related events like expiration

## Methods

### get()

> **get**(`chatId`): `Promise`\<`null` \| [`SessionData`](SessionData.md)\<`T`\>\>

Defined in: [src/types/index.ts:150](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/6c0c4f4b360c7e87dd13e91d54244d90d03a5549/src/types/index.ts#L150)

Retrieves session data for a chat

#### Parameters

##### chatId

`string`

#### Returns

`Promise`\<`null` \| [`SessionData`](SessionData.md)\<`T`\>\>

***

### set()

> **set**(`chatId`, `data`): `Promise`\<`void`\>

Defined in: [src/types/index.ts:153](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/6c0c4f4b360c7e87dd13e91d54244d90d03a5549/src/types/index.ts#L153)

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

Defined in: [src/types/index.ts:156](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/6c0c4f4b360c7e87dd13e91d54244d90d03a5549/src/types/index.ts#L156)

Optional method to receive session timeout value for cleanup processes

#### Parameters

##### timeoutMs

`number`

#### Returns

`void`
