[**WhatsApp Bot Framework**](../README.md)

***

[WhatsApp Bot Framework](../globals.md) / CallEventStatus

# Type Alias: CallEventStatus

> **CallEventStatus**: `"offer"` \| `"pickUp"` \| `"hangUp"` \| `"declined"` \| `"missed"` \| `"invalid"`

Defined in: [src/types/index.ts:40](https://github.com/green-api/whatsapp-chatbot-js-v2/blob/b14ea9b76fe91ba66e6abafe96b4927eaf57e7b5/src/types/index.ts#L40)

Status of a call notification: offer (ringing), pickUp (answered), hangUp (ended after an answer),
declined, missed or invalid. For incoming calls declined means the caller cancelled before the answer.
