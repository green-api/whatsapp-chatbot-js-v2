[**WhatsApp Bot Framework**](../README.md)

***

[WhatsApp Bot Framework](../globals.md) / Message

# Interface: Message

Defined in: [src/types/index.ts:76](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L76)

Represents a normalized message from WhatsApp.

## Properties

### chatId

> **chatId**: `string`

Defined in: [src/types/index.ts:82](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L82)

Unique chat identifier

***

### contact?

> `optional` **contact**: `object`

Defined in: [src/types/index.ts:126](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L126)

Contact

#### displayName

> **displayName**: `string`

#### vcard

> **vcard**: `string`

***

### location?

> `optional` **location**: `object`

Defined in: [src/types/index.ts:119](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L119)

Location

#### address?

> `optional` **address**: `string`

#### latitude

> **latitude**: `number`

#### longitude

> **longitude**: `number`

#### name?

> `optional` **name**: `string`

***

### media?

> `optional` **media**: `object`

Defined in: [src/types/index.ts:90](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L90)

Media information if present (for image, video, document, audio)

#### caption?

> `optional` **caption**: `string`

Media caption if any

#### fileName?

> `optional` **fileName**: `string`

File name

#### mimeType?

> `optional` **mimeType**: `string`

Mime type of the file

#### url?

> `optional` **url**: `string`

URL to download the media

***

### messageId

> **messageId**: `string`

Defined in: [src/types/index.ts:84](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L84)

Unique message identifier

***

### poll?

> `optional` **poll**: `object`

Defined in: [src/types/index.ts:111](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L111)

Poll

#### multipleAnswers

> **multipleAnswers**: `boolean`

#### name

> **name**: `string`

#### options

> **options**: `object`[]

***

### pollUpdate?

> `optional` **pollUpdate**: `object`

Defined in: [src/types/index.ts:101](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L101)

Poll update

#### multipleAnswers

> **multipleAnswers**: `boolean`

#### name

> **name**: `string`

#### stanzaId

> **stanzaId**: `string`

#### votes

> **votes**: `object`[]

***

### raw?

> `optional` **raw**: `any`

Defined in: [src/types/index.ts:131](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L131)

Original webhook notification data (for advanced use cases)

***

### senderName

> **senderName**: `string`

Defined in: [src/types/index.ts:88](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L88)

Name of the message sender

***

### text?

> `optional` **text**: `string`

Defined in: [src/types/index.ts:80](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L80)

Text content if present

***

### timestamp

> **timestamp**: `number`

Defined in: [src/types/index.ts:86](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L86)

Message timestamp

***

### type

> **type**: [`MessageType`](../type-aliases/MessageType.md)

Defined in: [src/types/index.ts:78](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L78)

Type of the message
