[**WhatsApp Bot Framework**](../README.md)

***

[WhatsApp Bot Framework](../globals.md) / Message

# Interface: Message

Defined in: [src/types/index.ts:32](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/6c0c4f4b360c7e87dd13e91d54244d90d03a5549/src/types/index.ts#L32)

Represents a normalized message from WhatsApp.

## Properties

### chatId

> **chatId**: `string`

Defined in: [src/types/index.ts:38](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/6c0c4f4b360c7e87dd13e91d54244d90d03a5549/src/types/index.ts#L38)

Unique chat identifier

***

### media?

> `optional` **media**: `object`

Defined in: [src/types/index.ts:46](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/6c0c4f4b360c7e87dd13e91d54244d90d03a5549/src/types/index.ts#L46)

Media information if present

#### caption?

> `optional` **caption**: `string`

Media caption if any

#### url?

> `optional` **url**: `string`

URL to download the media

***

### messageId

> **messageId**: `string`

Defined in: [src/types/index.ts:40](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/6c0c4f4b360c7e87dd13e91d54244d90d03a5549/src/types/index.ts#L40)

Unique message identifier

***

### pollUpdate?

> `optional` **pollUpdate**: `object`

Defined in: [src/types/index.ts:52](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/6c0c4f4b360c7e87dd13e91d54244d90d03a5549/src/types/index.ts#L52)

#### multipleAnswers

> **multipleAnswers**: `boolean`

#### name

> **name**: `string`

#### stanzaId

> **stanzaId**: `string`

#### votes

> **votes**: `object`[]

***

### senderName

> **senderName**: `string`

Defined in: [src/types/index.ts:44](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/6c0c4f4b360c7e87dd13e91d54244d90d03a5549/src/types/index.ts#L44)

Name of the message sender

***

### text?

> `optional` **text**: `string`

Defined in: [src/types/index.ts:36](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/6c0c4f4b360c7e87dd13e91d54244d90d03a5549/src/types/index.ts#L36)

Text content if present

***

### timestamp

> **timestamp**: `number`

Defined in: [src/types/index.ts:42](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/6c0c4f4b360c7e87dd13e91d54244d90d03a5549/src/types/index.ts#L42)

Message timestamp

***

### type

> **type**: [`MessageType`](../type-aliases/MessageType.md)

Defined in: [src/types/index.ts:34](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/6c0c4f4b360c7e87dd13e91d54244d90d03a5549/src/types/index.ts#L34)

Type of the message
