[**WhatsApp Bot Framework**](../README.md)

***

[WhatsApp Bot Framework](../globals.md) / StorageEvents

# Interface: StorageEvents\<T\>

Defined in: [src/storage/events.ts:8](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/6c0c4f4b360c7e87dd13e91d54244d90d03a5549/src/storage/events.ts#L8)

Defines the types of events that can be emitted by storage implementations.

## Type Parameters

• **T**

Type of custom state data stored in sessions

## Properties

### sessionExpired()

> **sessionExpired**: (`chatId`, `session`) => `void`

Defined in: [src/storage/events.ts:14](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/6c0c4f4b360c7e87dd13e91d54244d90d03a5549/src/storage/events.ts#L14)

Event emitted when a session expires and is removed from storage.

#### Parameters

##### chatId

`string`

The ID of the chat whose session expired

##### session

[`SessionData`](SessionData.md)\<`T`\>

The session data that was removed

#### Returns

`void`
