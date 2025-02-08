import { WhatsAppBot, State, Message } from "../src";

/**
 * Example implementation of a support ticket system using the WhatsApp Bot Framework.
 * Demonstrates:
 * - Multi-state conversation flow
 * - Custom data types (TicketData)
 * - File attachments handling
 * - Analytics features
 * - Global command handlers
 * - Regular expression handlers
 *
 * Features:
 * - Create and manage support tickets
 * - Handle attachments (images and documents)
 * - View ticket analytics with custom date ranges
 * - Apply filters and generate reports
 * - Custom navigation with 'return' command
 *
 * Usage:
 * 1. Update the idInstance and apiTokenInstance with your credentials
 * 2. Run the bot
 * 3. Send "help" to see available commands
 */

interface TicketData {
	ticketId?: string;
	category?: string;
	description?: string;
	attachments?: string[];
	status?: "open" | "pending" | "resolved";
	priority?: "low" | "medium" | "high";
	dateRange?: "day" | "week" | "month" | string;
	format?: "summary" | "detailed";
	filters?: {
		status?: string[];
		priority?: string[];
	};
}

// Initialize bot with both features
const bot = new WhatsAppBot<TicketData>({
	idInstance: process.env.INSTANCE_ID!,
	apiTokenInstance: process.env.INSTANCE_TOKEN!,
	defaultState: "menu",
	backCommand: "return",
});

const menuState: State<TicketData> = {
	name: "menu",
	async onEnter(message) {
		await bot.sendText(
			message.chatId,
			"🎫 Support Ticket System\n\n" +
			"Choose an option:\n" +
			"1. Create New Ticket\n" +
			"2. View Analytics\n\n" +
			"Type 'help' to see all available commands.",
		);
	},
	async onMessage(message) {
		switch (message.text) {
			case "1":
				return "create_ticket";
			case "2":
				return "analytics";
			default:
				return null;
		}
	},
};

const createTicketState: State<TicketData> = {
	name: "create_ticket",
	async onEnter(message) {
		await bot.sendText(
			message.chatId,
			"Select ticket category:\n" +
			"1. Technical Issue\n" +
			"2. Billing Question\n" +
			"3. Feature Request\n\n" +
			"Type 'return' to return to menu",
		);
	},
	async onMessage(message, data) {
		const categories = {
			"1": "Technical Issue",
			"2": "Billing Question",
			"3": "Feature Request",
		};

		const category = categories[message.text as keyof typeof categories];
		if (category) {
			return {
				state: "describe_issue",
				data: {
					...data,
					category,
					ticketId: `TKT-${Date.now().toString(36)}`,
				},
			};
		}

		if (/^[1-9]\d*$/.test(message.text || "")) {
			await bot.sendText(
				message.chatId,
				"Please select a valid category (1-3)",
			);
			return;
		}

		return null;
	},
};

const describeIssueState: State<TicketData> = {
	name: "describe_issue",
	async onEnter(message, data) {
		await bot.sendText(
			message.chatId,
			`Creating ticket ${data?.ticketId} (${data?.category})\n\n` +
			"Please describe your issue. You can also:\n" +
			"- Send images/documents as attachments\n" +
			"- Type 'return' to change category\n" +
			"- Type 'cancel' to start over",
		);
	},
	async onMessage(message, data) {
		if (message.text?.toLowerCase() === "cancel") {
			return "menu";
		}

		if (message.type !== "text") {
			const attachments = data?.attachments || [];
			if (message.media?.url) {
				attachments.push(message.media.url);
			}
			await bot.sendText(
				message.chatId,
				"✅ Attachment received. You can send more or type your description.",
			);
			return {
				state: "describe_issue",
				data: {...data, attachments},
			};
		}

		if (message.text) {
			return {
				state: "confirm_ticket",
				data: {...data, description: message.text},
			};
		}

		return null;
	},
};

const confirmTicketState: State<TicketData> = {
	name: "confirm_ticket",
	async onEnter(message, data) {
		await bot.sendText(
			message.chatId,
			"📝 Ticket Summary:\n\n" +
			`ID: ${data?.ticketId}\n` +
			`Category: ${data?.category}\n` +
			`Description: ${data?.description}\n` +
			`Attachments: ${data?.attachments?.length || 0}\n\n` +
			"Type 'confirm' to submit or 'return' to edit",
		);
	},
	async onMessage(message, data) {
		if (message.text?.toLowerCase() === "confirm") {
			await handleTicketCreated(message, {...data, status: "open"});
			return "menu";
		}

		if (message.text?.toLowerCase() !== "confirm") {
			await bot.sendText(
				message.chatId,
				"Please type 'confirm' to submit or 'return' to edit",
			);
			return;
		}

		return null;
	},
};

const analyticsState: State<TicketData> = {
	name: "analytics",
	async onEnter(message) {
		await bot.sendText(
			message.chatId,
			"📊 Ticket Analytics\n\n" +
			"Select time range:\n" +
			"1. Last 24 hours\n" +
			"2. Last 7 days\n" +
			"3. Last 30 days\n\n" +
			"Or type 'custom: YYYY-MM-DD to YYYY-MM-DD'\n" +
			"Type 'return' to return to menu",
		);
	},
	async onMessage(message, data) {
		const dateRanges = {
			"1": "day",
			"2": "week",
			"3": "month",
		};

		const selectedRange = dateRanges[message.text as keyof typeof dateRanges];
		if (selectedRange) {
			return {
				state: "analytics_category",
				data: {...data, dateRange: selectedRange},
			};
		}

		return null;
	},
};

const analyticsCategoryState: State<TicketData> = {
	name: "analytics_category",
	async onEnter(message, data) {
		await bot.sendText(
			message.chatId,
			`📈 Analytics for ${formatDateRange(data?.dateRange)}\n\n` +
			"Select category:\n" +
			"1. Technical Issues\n" +
			"2. Billing Questions\n" +
			"3. Feature Requests\n" +
			"4. All Categories\n\n" +
			"Type 'filter' to add status/priority filters\n" +
			"Type 'back' to change date range",
		);
	},
	async onMessage(message, data) {
		if (message.text?.toLowerCase() === "back") {
			return "analytics";
		}

		if (message.text?.toLowerCase() === "filter") {
			return {
				state: "analytics_filters",
				data: {...data, filters: data?.filters || {status: [], priority: []}},
			};
		}

		const categories = {
			"1": "Technical Issue",
			"2": "Billing Question",
			"3": "Feature Request",
			"4": "All",
		};

		const category = categories[message.text as keyof typeof categories];
		if (category) {
			return {
				state: "analytics_format",
				data: {...data, category},
			};
		}

		if (/^[1-9]\d*$/.test(message.text || "")) {
			await bot.sendText(
				message.chatId,
				"Please select a valid category (1-4)",
			);
			return;
		}

		return null;
	},
};

const analyticsFiltersState: State<TicketData> = {
	name: "analytics_filters",
	async onEnter(message, data) {
		const filters = data?.filters || {status: [], priority: []};
		await bot.sendText(
			message.chatId,
			"🔍 Select Filters\n\n" +
			"Status filters:\n" +
			`1. Open tickets ${filters.status?.includes("open") ? "✓" : ""}\n` +
			`2. Pending tickets ${filters.status?.includes("pending") ? "✓" : ""}\n` +
			`3. Resolved tickets ${filters.status?.includes("resolved") ? "✓" : ""}\n\n` +
			"Priority filters:\n" +
			`4. High priority ${filters.priority?.includes("high") ? "✓" : ""}\n` +
			`5. Medium priority ${filters.priority?.includes("medium") ? "✓" : ""}\n` +
			`6. Low priority ${filters.priority?.includes("low") ? "✓" : ""}\n\n` +
			"Type numbers to toggle filters\n" +
			"Type 'done' when finished\n" +
			"Type 'back' to return without changes",
		);
	},
	async onMessage(message, data) {
		if (message.text?.toLowerCase() === "back") {
			return "analytics_category";
		}

		if (message.text?.toLowerCase() === "done") {
			return {
				state: "analytics_category",
				data,
			};
		}

		const filterMap = {
			"1": ["status", "open"],
			"2": ["status", "pending"],
			"3": ["status", "resolved"],
			"4": ["priority", "high"],
			"5": ["priority", "medium"],
			"6": ["priority", "low"],
		};

		const filter = filterMap[message.text as keyof typeof filterMap];
		if (filter) {
			const [type, value] = filter;
			const filters = data?.filters || {status: [], priority: []};
			const array = filters[type as keyof typeof filters] as string[];

			const index = array.indexOf(value);
			if (index === -1) {
				array.push(value);
			} else {
				array.splice(index, 1);
			}

			await bot.sendText(
				message.chatId,
				"Current filters:\n" +
				`Status: ${filters.status?.join(", ") || "none"}\n` +
				`Priority: ${filters.priority?.join(", ") || "none"}\n\n` +
				"Type 'done' when finished or continue selecting filters",
			);

			return {
				state: "analytics_filters",
				data: {...data, filters},
			};
		}

		if (/^[1-9]\d*$/.test(message.text || "")) {
			await bot.sendText(
				message.chatId,
				"Please select a valid filter option (1-6)",
			);
			return;
		}

		return null;
	},
};

const analyticsFormatState: State<TicketData> = {
	name: "analytics_format",
	async onEnter(message, data) {
		await bot.sendText(
			message.chatId,
			"📋 Select report format:\n\n" +
			"1. Summary (key metrics)\n" +
			"2. Detailed report\n\n" +
			"Current settings:\n" +
			`Category: ${data?.category}\n` +
			`Time range: ${formatDateRange(data?.dateRange)}\n` +
			formatFilters(data?.filters) + "\n\n" +
			"Type 'back' to change settings",
		);
	},
	async onMessage(message, data) {
		if (message.text?.toLowerCase() === "back") {
			return "analytics_category";
		}

		switch (message.text) {
			case "1":
				await generateAnalyticsReport(message, {...data, format: "summary"});
				return "menu";
			case "2":
				await generateAnalyticsReport(message, {...data, format: "detailed"});
				return "menu";
			default:
				if (/^[1-9]\d*$/.test(message.text || "")) {
					await bot.sendText(
						message.chatId,
						"Please select a valid format (1-2)",
					);
				}
				return null;
		}
	},
};

async function handleTicketCreated(message: Message, data: TicketData) {
	await bot.sendText(
		message.chatId,
		`✅ Ticket ${data.ticketId} created successfully!\n\n` +
		"We'll notify you of any updates.\n" +
		`To check this ticket later, type 'status: ${data.ticketId}'\n\n` +
		"Returning to main menu...",
	);
}

async function generateAnalyticsReport(message: Message, data: TicketData) {
	// Dummy data. In a real bot, fetch and analyze data from database
	const summary = data.format === "summary"
		? "📊 Summary Report:\n" +
		"Total Tickets: 125\n" +
		"Average Response Time: 2.4 hours\n" +
		"Resolution Rate: 87%"
		: "📈 Detailed Report:\n" +
		"Total Tickets: 125\n" +
		"- Open: 45\n" +
		"- Pending: 30\n" +
		"- Resolved: 50\n\n" +
		"Response Times:\n" +
		"- < 1 hour: 60%\n" +
		"- 1-4 hours: 30%\n" +
		"- > 4 hours: 10%\n\n" +
		"Top Categories:\n" +
		"1. Technical Issues (45%)\n" +
		"2. Billing Questions (30%)\n" +
		"3. Feature Requests (25%)";

	await bot.sendText(
		message.chatId,
		`Analytics Report\n\n` +
		`Period: ${formatDateRange(data.dateRange)}\n` +
		`Category: ${data.category}\n` +
		formatFilters(data.filters) + "\n\n" +
		summary + "\n\n" +
		"Type 'chart: pie/bar/line' to visualize data",
	);
}

function formatDateRange(range?: string): string {
	switch (range) {
		case "day":
			return "last 24 hours";
		case "week":
			return "last 7 days";
		case "month":
			return "last 30 days";
		default:
			return range || "unknown period";
	}
}

function formatFilters(filters?: TicketData["filters"]): string {
	if (!filters || (!filters.status?.length && !filters.priority?.length)) {
		return "Filters: none";
	}

	let result = "Filters:\n";
	if (filters.status?.length) {
		result += `- Status: ${filters.status.join(", ")}\n`;
	}
	if (filters.priority?.length) {
		result += `- Priority: ${filters.priority.join(", ")}`;
	}
	return result;
}

// Global command handlers
bot.onText("help", async (message) => {
	await bot.sendText(
		message.chatId,
		"📋 Available Commands:\n\n" +
		"Tickets:\n" +
		"- Create ticket: Select option 1 from menu\n" +
		"- Type 'urgent: [description]' for urgent tickets\n" +
		"- Type 'status: [ticket-id]' to check status\n\n" +
		"Analytics:\n" +
		"- View analytics: Select option 2 from menu\n" +
		"- Type 'chart: [pie/bar/line]' in analytics view\n" +
		"- Type 'custom: YYYY-MM-DD to YYYY-MM-DD' for custom date range\n\n" +
		"Navigation:\n" +
		"- Type 'menu' to return to main menu\n" +
		"- Type 'return' to go back to previous step\n" +
		"- Type 'help' to see this message",
	);
});

bot.onText("menu", async (message, session) => {
	await bot.enterState(message, session, "menu");
});

// Handle custom date range
bot.onRegex(/^custom:\s*(\d{4}-\d{2}-\d{2})\s*to\s*(\d{4}-\d{2}-\d{2})$/i, async (message, session) => {
	const [, start, end] = message.text?.match(/^custom:\s*(\d{4}-\d{2}-\d{2})\s*to\s*(\d{4}-\d{2}-\d{2})$/i) || [];

	const startDate = new Date(start);
	const endDate = new Date(end);

	if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
		await bot.sendText(
			message.chatId,
			"⚠️ Invalid date format. Please use YYYY-MM-DD, for example:\n" +
			"custom: 2024-01-01 to 2024-01-31",
		);
		return;
	}

	if (endDate < startDate) {
		await bot.sendText(
			message.chatId,
			"⚠️ End date must be after start date",
		);
		return;
	}

	if (endDate > new Date()) {
		await bot.sendText(
			message.chatId,
			"⚠️ End date cannot be in the future",
		);
		return;
	}

	return bot.enterState(message, session, "analytics_category", {
		dateRange: `${start} to ${end}`,
	});
});

// Handle urgent tickets
bot.onRegex(/^urgent:?\s*(.+)/i, async (message, session) => {
	const description = message.text?.match(/^urgent:?\s*(.+)/i)?.[1];

	if (!description || description.length < 10) {
		await bot.sendText(
			message.chatId,
			"⚠️ Please provide a more detailed description for urgent tickets.\n" +
			"Format: urgent: [your detailed description]",
		);
		return;
	}

	const ticketId = `URG-${Date.now().toString(36)}`;
	const stateData: TicketData = {
		ticketId,
		category: "Urgent Support",
		description,
		status: "open",
		priority: "high",
	};

	await handleTicketCreated(message, stateData);
	await bot.enterState(message, session, "menu");
});

// Handle ticket status checks
bot.onRegex(/^status:?\s*(TKT-\w+|URG-\w+)$/i, async (message) => {
	const ticketId = message.text?.match(/^status:?\s*(TKT-\w+|URG-\w+)$/i)?.[1];

	// In a real bot, fetch ticket status from database
	// For demo, generate random status
	const statuses = ["In Progress", "Under Review", "Waiting for Response"];
	const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
	const randomTime = Math.floor(Math.random() * 60);

	await bot.sendText(
		message.chatId,
		`🎫 Ticket ${ticketId}\n` +
		`Status: ${randomStatus}\n` +
		`Last Update: ${randomTime} minutes ago\n\n` +
		"Need to add more details? Create a new ticket or use 'urgent:' for critical updates.",
	);
});

// Handle chart generation
bot.onRegex(/^chart:\s*(pie|bar|line)$/i, async (message) => {
	const [, type] = message.text?.match(/^chart:\s*(pie|bar|line)$/i) || [];

	await bot.sendText(
		message.chatId,
		`📊 Generating ${type} chart...\n\n` +
		"In a real bot, this would generate and send a visualization of your analytics data.",
	);
});

bot.onType("image", async (message, session) => {
	if (session.currentState === "describe_issue") {
		return;
	}

	await bot.sendText(
		message.chatId,
		"📸 I see you've sent an image. If this is for a ticket, " +
		"please create a ticket first or attach it while describing your issue.",
	);
});

bot.onType("document", async (message, session) => {
	if (session.currentState === "describe_issue") {
		return;
	}

	await bot.sendText(
		message.chatId,
		"📎 I see you've sent a document. If this is for a ticket, " +
		"please create a ticket first or attach it while describing your issue.",
	);
});

// Fallback handler for unknown messages
bot.onType("*", async (message, session) => {
	if (!session.currentState || session.currentState === "menu") {
		await bot.sendText(
			message.chatId,
			"I didn't understand that message. Please select one of the options shown above, or type 'help' to see available commands.",
		);
	}
});

// Add all states
bot.addState(menuState);
bot.addState(createTicketState);
bot.addState(describeIssueState);
bot.addState(confirmTicketState);
bot.addState(analyticsState);
bot.addState(analyticsCategoryState);
bot.addState(analyticsFiltersState);
bot.addState(analyticsFormatState);

// Start the bot
bot.start().catch(console.error);
