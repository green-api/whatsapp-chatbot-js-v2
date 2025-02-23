[**WhatsApp Bot Framework**](../README.md)

***

[WhatsApp Bot Framework](../globals.md) / MessageHandler

# Type Alias: MessageHandler()\<T\>

> **MessageHandler**\<`T`\>: (`message`, `session`) => `Promise`\<`void`\>

Defined in: [src/types/index.ts:96](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/6c0c4f4b360c7e87dd13e91d54244d90d03a5549/src/types/index.ts#L96)

Function type for handling messages.

## Type Parameters

• **T** = `any`

Type of custom state data

## Parameters

### message

[`Message`](../interfaces/Message.md)

### session

[`SessionData`](../interfaces/SessionData.md)\<`T`\>

## Returns

`Promise`\<`void`\>
