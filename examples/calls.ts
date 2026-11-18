import * as path from "node:path";
import { Message, WhatsAppBot } from "../src";

const GREETING = path.join(__dirname, "data", "greeting.ogg");

const bot = new WhatsAppBot({
	idInstance: process.env.INSTANCE_ID!,
	apiTokenInstance: process.env.INSTANCE_TOKEN!,
	defaultState: "menu",
});

async function playGreetingAndHangUp(): Promise<void> {
	const calls = await bot.connectCalls();
	await calls.startAudioBridge();
	await calls.waitFor("on-call", 60000);
	await calls.play(GREETING);
	await bot.hangUp();
}

async function handleText(message: Message): Promise<void> {
	if (message.text?.trim().toLowerCase() !== "call me") {
		await bot.sendText(message.chatId, "Call this number, or write \"call me\" and the bot calls you");
		return;
	}
	await bot.call(message.chatId);
	playGreetingAndHangUp().catch((error) => console.error("Call failed:", error.message));
}

bot.onCall(async (call) => {
	console.log(`${call.direction} call ${call.callId} with ${call.chatId}: ${call.status}`);

	if (call.direction === "incoming" && call.status === "offer") {
		await bot.acceptCall();
		await playGreetingAndHangUp();
	}

	if (call.ended && call.direction === "outgoing" && call.status !== "hangUp") {
		await bot.sendText(call.chatId, "Couldn't reach you, write \"call me\" to try again");
	}
});

bot.addState({
	name: "menu",
	async onEnter(message) {
		await handleText(message);
	},
	async onMessage(message) {
		await handleText(message);
		return undefined;
	},
});

bot.start().catch(console.error);
