[**WhatsApp Bot Framework**](../README.md)

***

[WhatsApp Bot Framework](../globals.md) / StorageEventEmitter

# Class: StorageEventEmitter\<T\>

Defined in: [src/storage/events.ts:21](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/c30756ad4732aa30584821f7e49dc15f946b6a2a/src/storage/events.ts#L21)

Event emitter for storage events. Extends Node's EventEmitter.

## Extends

- `EventEmitter`

## Type Parameters

• **T**

Type of custom state data stored in sessions

## Constructors

### new StorageEventEmitter()

> **new StorageEventEmitter**\<`T`\>(`options`?): [`StorageEventEmitter`](StorageEventEmitter.md)\<`T`\>

Defined in: node\_modules/@types/node/events.d.ts:134

#### Parameters

##### options?

`EventEmitterOptions`

#### Returns

[`StorageEventEmitter`](StorageEventEmitter.md)\<`T`\>

#### Inherited from

`EventEmitter.constructor`

## Methods

### emit()

> **emit**\<`K`\>(`event`, ...`args`): `boolean`

Defined in: [src/storage/events.ts:28](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/c30756ad4732aa30584821f7e49dc15f946b6a2a/src/storage/events.ts#L28)

Emits a storage event

#### Type Parameters

• **K** *extends* `"sessionExpired"`

#### Parameters

##### event

`K`

The name of the event to emit

##### args

...`Parameters`\<[`StorageEvents`](../interfaces/StorageEvents.md)\<`T`\>\[`K`\]\>

Arguments to pass to the event listeners

#### Returns

`boolean`

true if the event had listeners, false otherwise

#### Overrides

`EventEmitter.emit`

***

### on()

> **on**\<`K`\>(`event`, `listener`): `this`

Defined in: [src/storage/events.ts:38](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/c30756ad4732aa30584821f7e49dc15f946b6a2a/src/storage/events.ts#L38)

Adds a listener for a storage event

#### Type Parameters

• **K** *extends* `"sessionExpired"`

#### Parameters

##### event

`K`

The name of the event to listen for

##### listener

[`StorageEvents`](../interfaces/StorageEvents.md)\<`T`\>\[`K`\]

The callback to execute when the event occurs

#### Returns

`this`

this instance for chaining

#### Overrides

`EventEmitter.on`
