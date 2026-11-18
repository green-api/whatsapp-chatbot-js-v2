export const DEFAULT_UPLOAD_MIME_TYPE = "application/octet-stream";

export const CALL_WEBHOOK_SETTINGS = {
	incomingCallWebhook: "yes",
	outgoingCallWebhook: "yes",
} as const;

export const CALL_END_STATUSES = ["hangUp", "declined", "missed", "invalid"] as const;
