[**WhatsApp Bot Framework**](../README.md)

***

[WhatsApp Bot Framework](../globals.md) / MessageHandler

# Type Alias: MessageHandler()\<T\>

> **MessageHandler**\<`T`\>: (`message`, `session`) => `Promise`\<`void`\>

Defined in: [types/index.ts:90](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/types/index.ts#L90)

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
