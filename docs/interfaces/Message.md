[**WhatsApp Bot Framework**](../README.md)

***

[WhatsApp Bot Framework](../globals.md) / Message

# Interface: Message

Defined in: [types/index.ts:26](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/types/index.ts#L26)

Represents a normalized message from WhatsApp.

## Properties

### chatId

> **chatId**: `string`

Defined in: [types/index.ts:32](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/types/index.ts#L32)

Unique chat identifier

***

### media?

> `optional` **media**: `object`

Defined in: [types/index.ts:40](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/types/index.ts#L40)

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

Defined in: [types/index.ts:34](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/types/index.ts#L34)

Unique message identifier

***

### pollUpdate?

> `optional` **pollUpdate**: `object`

Defined in: [types/index.ts:46](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/types/index.ts#L46)

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

Defined in: [types/index.ts:38](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/types/index.ts#L38)

Name of the message sender

***

### text?

> `optional` **text**: `string`

Defined in: [types/index.ts:30](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/types/index.ts#L30)

Text content if present

***

### timestamp

> **timestamp**: `number`

Defined in: [types/index.ts:36](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/types/index.ts#L36)

Message timestamp

***

### type

> **type**: [`MessageType`](../type-aliases/MessageType.md)

Defined in: [types/index.ts:28](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/3a291a116c693666e84c00cdfc7b1afd2795fe33/src/types/index.ts#L28)

Type of the message
