[**WhatsApp Bot Framework**](../README.md)

***

[WhatsApp Bot Framework](../globals.md) / Message

# Interface: Message

Defined in: [src/types/index.ts:34](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/c30756ad4732aa30584821f7e49dc15f946b6a2a/src/types/index.ts#L34)

Represents a normalized message from WhatsApp.

## Properties

### chatId

> **chatId**: `string`

Defined in: [src/types/index.ts:40](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/c30756ad4732aa30584821f7e49dc15f946b6a2a/src/types/index.ts#L40)

Unique chat identifier

***

### contact?

> `optional` **contact**: `object`

Defined in: [src/types/index.ts:84](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/c30756ad4732aa30584821f7e49dc15f946b6a2a/src/types/index.ts#L84)

Contact

#### displayName

> **displayName**: `string`

#### vcard

> **vcard**: `string`

***

### location?

> `optional` **location**: `object`

Defined in: [src/types/index.ts:77](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/c30756ad4732aa30584821f7e49dc15f946b6a2a/src/types/index.ts#L77)

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

Defined in: [src/types/index.ts:48](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/c30756ad4732aa30584821f7e49dc15f946b6a2a/src/types/index.ts#L48)

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

Defined in: [src/types/index.ts:42](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/c30756ad4732aa30584821f7e49dc15f946b6a2a/src/types/index.ts#L42)

Unique message identifier

***

### poll?

> `optional` **poll**: `object`

Defined in: [src/types/index.ts:69](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/c30756ad4732aa30584821f7e49dc15f946b6a2a/src/types/index.ts#L69)

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

Defined in: [src/types/index.ts:59](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/c30756ad4732aa30584821f7e49dc15f946b6a2a/src/types/index.ts#L59)

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

Defined in: [src/types/index.ts:89](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/c30756ad4732aa30584821f7e49dc15f946b6a2a/src/types/index.ts#L89)

Original webhook notification data (for advanced use cases)

***

### senderName

> **senderName**: `string`

Defined in: [src/types/index.ts:46](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/c30756ad4732aa30584821f7e49dc15f946b6a2a/src/types/index.ts#L46)

Name of the message sender

***

### text?

> `optional` **text**: `string`

Defined in: [src/types/index.ts:38](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/c30756ad4732aa30584821f7e49dc15f946b6a2a/src/types/index.ts#L38)

Text content if present

***

### timestamp

> **timestamp**: `number`

Defined in: [src/types/index.ts:44](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/c30756ad4732aa30584821f7e49dc15f946b6a2a/src/types/index.ts#L44)

Message timestamp

***

### type

> **type**: [`MessageType`](../type-aliases/MessageType.md)

Defined in: [src/types/index.ts:36](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/c30756ad4732aa30584821f7e49dc15f946b6a2a/src/types/index.ts#L36)

Type of the message
