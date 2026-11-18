import { CallWebhook } from "@green-api/whatsapp-api-client-js-v2";
import { CallEvent, CallEventStatus } from "../types";
import { CALL_END_STATUSES } from "../defaults";

/**
 * Parses an incomingCall or outgoingCall notification into a CallEvent.
 *
 * @param webhook - The call notification received from WhatsApp API
 * @returns The call event
 */
export function parseCall(webhook: CallWebhook): CallEvent {
	const status: CallEventStatus = webhook.status === "hungUp" ? "hangUp" : webhook.status;
	return {
		callId: webhook.idMessage,
		chatId: webhook.from,
		direction: webhook.typeWebhook === "incomingCall" ? "incoming" : "outgoing",
		status,
		ended: (CALL_END_STATUSES as readonly string[]).includes(status),
		durationSeconds: webhook.duration ?? 0,
		isVideo: webhook.isVideo ?? false,
		byApi: webhook.sendByApi ?? false,
		timestamp: webhook.timestamp,
		raw: webhook,
	};
}
