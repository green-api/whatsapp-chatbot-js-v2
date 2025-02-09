[**WhatsApp Bot Framework**](../README.md)

***

[WhatsApp Bot Framework](../globals.md) / MemoryStorage

# Class: MemoryStorage\<T\>

Defined in: [storage/memory.ts:21](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/storage/memory.ts#L21)

In-memory implementation of the StorageAdapter interface.
Provides temporary session storage with automatic cleanup of expired sessions.

## Example

```typescript
// Create storage with 10-minute session timeout
const storage = new MemoryStorage(10);

// Store session data
await storage.set("chat123", { lastActivity: Date.now() });

// Retrieve session data
const session = await storage.get("chat123");
```

## Type Parameters

• **T** = `any`

Type of custom state data to be stored in sessions

## Implements

- [`StorageAdapter`](../interfaces/StorageAdapter.md)\<`T`\>

## Constructors

### new MemoryStorage()

> **new MemoryStorage**\<`T`\>(`timeoutMinutes`): [`MemoryStorage`](MemoryStorage.md)\<`T`\>

Defined in: [storage/memory.ts:33](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/storage/memory.ts#L33)

Creates a new instance of MemoryStorage.

#### Parameters

##### timeoutMinutes

`number` = `5`

Number of minutes after which inactive sessions are removed

#### Returns

[`MemoryStorage`](MemoryStorage.md)\<`T`\>

## Methods

### get()

> **get**(`chatId`): `Promise`\<`null` \| [`SessionData`](../interfaces/SessionData.md)\<`T`\>\>

Defined in: [storage/memory.ts:80](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/storage/memory.ts#L80)

Retrieves session data for the specified chat ID.

#### Parameters

##### chatId

`string`

The unique identifier of the chat

#### Returns

`Promise`\<`null` \| [`SessionData`](../interfaces/SessionData.md)\<`T`\>\>

The session data if found, null otherwise

#### Implementation of

[`StorageAdapter`](../interfaces/StorageAdapter.md).[`get`](../interfaces/StorageAdapter.md#get)

***

### set()

> **set**(`chatId`, `data`): `Promise`\<`void`\>

Defined in: [storage/memory.ts:91](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/storage/memory.ts#L91)

Stores session data for the specified chat ID.
If data already exists for this chat ID, it will be overwritten.

#### Parameters

##### chatId

`string`

The unique identifier of the chat

##### data

[`SessionData`](../interfaces/SessionData.md)\<`T`\>

The session data to store

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`StorageAdapter`](../interfaces/StorageAdapter.md).[`set`](../interfaces/StorageAdapter.md#set)

***

### stopCleanup()

> **stopCleanup**(): `void`

Defined in: [storage/memory.ts:67](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/storage/memory.ts#L67)

Stops the automatic cleanup of expired sessions.
Should be called when the storage is no longer needed to prevent memory leaks.

#### Returns

`void`

#### Example

```typescript
const storage = new MemoryStorage();
// ... use storage ...
storage.stopCleanup(); // Call when done
```
