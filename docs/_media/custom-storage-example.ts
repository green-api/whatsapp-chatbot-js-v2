import { WhatsAppBot, State } from "../../src";
import { MySQLStorage } from "./mysql-adapter";

// Define todo list data structure
interface TodoData {
	todos: Array<{
		id: number;
		text: string;
		completed: boolean;
		createdAt: number;
	}>;
	nextId: number;
}

// Create MySQL storage instance
const storage = new MySQLStorage({
	host: process.env.DATABASE_HOST!,
	port: 3306,
	database: process.env.DATABASE_NAME!,
	user: process.env.DATABASE_USER!,
	password: process.env.DATABASE_PASS!,
});

// Start periodic cleanup (every 30 minutes, remove sessions older than 24 hours)
storage.startCleanupTask(30, 1440);

// Initialize bot with MySQL storage
const bot = new WhatsAppBot<TodoData>({
	idInstance: process.env.INSTANCE_ID!,
	apiTokenInstance: process.env.INSTANCE_TOKEN!,
	defaultState: "menu",
	storage: storage,
	backCommand: "return",
});

// Menu state
const menuState: State<TodoData> = {
	name: "menu",
	async onEnter(message, data = {todos: [], nextId: 1}) {
		const todoList = data.todos
			.sort((a, b) => b.createdAt - a.createdAt)
			.map(todo => `${todo.completed ? "✅" : "⬜"} ${todo.id}. ${todo.text}`)
			.join("\n");

		await bot.sendText(
			message.chatId,
			"📝 Todo List\n\n" +
			(todoList || "No todos yet!\n\n") +
			"Commands:\n" +
			"- add: Add new todo\n" +
			"- done <id>: Mark todo as done\n" +
			"- undone <id>: Mark todo as not done\n" +
			"- del <id>: Delete todo\n" +
			"- clear: Clear all todos\n" +
			"- help: Show this message",
		);
	},
	async onMessage(message, data = {todos: [], nextId: 1}) {
		const text = message.text?.toLowerCase();

		if (text === "add") {
			return "add_todo";
		}

		// Handle done/undone commands
		const doneMatch = text?.match(/^(done|undone)\s+(\d+)$/);
		if (doneMatch) {
			const [, action, idStr] = doneMatch;
			const id = parseInt(idStr);
			const todo = data.todos.find(t => t.id === id);

			if (todo) {
				todo.completed = action === "done";
				await bot.sendText(
					message.chatId,
					`${action === "done" ? "✅" : "⬜"} ${todo.text} marked as ${action}`,
				);
				return {
					state: "menu",
					data: data,
				};
			}
		}

		// Handle delete command
		const deleteMatch = text?.match(/^del\s+(\d+)$/);
		if (deleteMatch) {
			const id = parseInt(deleteMatch[1]);
			const todoIndex = data.todos.findIndex(t => t.id === id);

			if (todoIndex !== -1) {
				const todo = data.todos[todoIndex];
				data.todos.splice(todoIndex, 1);
				await bot.sendText(message.chatId, `🗑️ Deleted "${todo.text}"`);
				return {
					state: "menu",
					data: data,
				};
			}
		}

		if (text === "clear") {
			return "confirm_clear";
		}

		if (text === "help") {
			return {
				state: "menu",
				data: data,
			};
		}

		await bot.sendText(
			message.chatId,
			"⚠️ Unknown command. Type 'help' to see available commands",
		);
		return;
	},
};

// Add todo state
const addTodoState: State<TodoData> = {
	name: "add_todo",
	async onEnter(message) {
		await bot.sendText(
			message.chatId,
			"Enter your todo text (or type 'return' to go back):",
		);
	},
	async onMessage(message, data = {todos: [], nextId: 1}) {
		if (message.text && message.text.length > 0) {
			data.todos.push({
				id: data.nextId++,
				text: message.text,
				completed: false,
				createdAt: Date.now(),
			});

			await bot.sendText(message.chatId, "✅ Todo added!");
			return {
				state: "menu",
				data: data,
			};
		}

		await bot.sendText(message.chatId, "⚠️ Please enter valid todo text");
		return;
	},
};

// Confirm clear state
const confirmClearState: State<TodoData> = {
	name: "confirm_clear",
	async onEnter(message) {
		await bot.sendText(
			message.chatId,
			"⚠️ Are you sure you want to clear all todos?\n" +
			"Type 'yes' to confirm or 'return' to go back",
		);
	},
	async onMessage(message, data = {todos: [], nextId: 1}) {
		if (message.text?.toLowerCase() === "yes") {
			data.todos = [];
			await bot.sendText(message.chatId, "🗑️ All todos cleared!");
			return {
				state: "menu",
				data: data,
			};
		}

		await bot.sendText(
			message.chatId,
			"Please type 'yes' to confirm or 'return' to go back",
		);
		return;
	},
};

// Fallback handler for unknown messages
bot.onType("*", async (message, session) => {
	if (!session.currentState) {
		await bot.sendText(
			message.chatId,
			"I didn't understand that message. Please select one of the options shown above, or type 'help' to see available commands.",
		);
		await bot.enterState(message, session, "menu");
	}
});

// Add all states
bot.addState(menuState);
bot.addState(addTodoState);
bot.addState(confirmClearState);

// Start the bot
bot.start().catch(console.error);
