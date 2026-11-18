[**WhatsApp Bot Framework**](../README.md)

***

[WhatsApp Bot Framework](../globals.md) / MessageHandler

# Type Alias: MessageHandler()\<T\>

> **MessageHandler**\<`T`\>: (`message`, `session`) => `Promise`\<`void` \| `boolean`\>

Defined in: [src/types/index.ts:167](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L167)

Function type for handling messages. Return true if handlersFirst config is set to "true" and you want to continue with the onMessage

## Type Parameters

• **T** = `any`

Type of custom state data

## Parameters

### message

[`Message`](../interfaces/Message.md)

### session

[`SessionData`](../interfaces/SessionData.md)\<`T`\>

## Returns

`Promise`\<`void` \| `boolean`\>
