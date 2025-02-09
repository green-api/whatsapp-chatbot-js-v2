import { Message, MessageType } from "../types";
import { WebhookResponse } from "@green-api/whatsapp-api-client";
import debug from "debug";

/**
 * Parses a WhatsApp webhook notification into a standardized Message format.
 *
 * @param notification - The webhook notification received from WhatsApp API
 * @returns A standardized Message object containing the parsed message data
 *
 * @example
 * ```typescript
 * const message = parseMessage(webhookNotification);
 * console.log(message.type); // 'text', 'image', etc.
 * console.log(message.text); // Message content if it's a text message
 * ```
 */
export function parseMessage(notification: WebhookResponse.MessageWebhook): Message {
	const messageData = notification.messageData;
	const message: Message = {
		type: getMessageType(messageData),
		chatId: notification.senderData.chatId,
		senderName: notification.senderData.senderName,
		messageId: notification.idMessage,
		timestamp: notification.timestamp,
	};

	if (messageData.typeMessage === "textMessage") {
		message.text = messageData.textMessageData.textMessage;
	} else if (messageData.typeMessage === "extendedTextMessage") {
		message.text = messageData.extendedTextMessageData.text;
	} else if (messageData.typeMessage === "pollUpdateMessage") {
		message.pollUpdate = {
			stanzaId: messageData.pollMessageData.stanzaId,
			name: messageData.pollMessageData.name,
			votes: messageData.pollMessageData.votes,
			multipleAnswers: messageData.pollMessageData.multipleAnswers,
		};
	}

	if ("fileMessageData" in messageData) {
		message.media = {
			url: messageData.fileMessageData.downloadUrl,
			caption: messageData.fileMessageData.caption,
		};
	}

	debug(`Message: ${JSON.stringify(message, null, 2)}`);
	return message;
}

/**
 * Determines the message type based on the WhatsApp message data.
 *
 * @param messageData - The message data from the webhook notification
 * @returns The standardized message type
 *
 * @internal
 */
function getMessageType(messageData: WebhookResponse.MessageData): MessageType {
	switch (messageData.typeMessage) {
		case "imageMessage":
			return "image";
		case "videoMessage":
			return "video";
		case "documentMessage":
			return "document";
		case "audioMessage":
			return "audio";
		case "locationMessage":
			return "location";
		case "contactMessage":
			return "contact";
		case "pollMessage":
			return "poll";
		case "pollUpdateMessage":
			return "pollUpdate";
		default:
			return "text";
	}
}
