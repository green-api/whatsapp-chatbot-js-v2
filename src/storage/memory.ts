import { StorageAdapter, SessionData } from "../types";
import { StorageEventEmitter } from "./events";

/**
 * In-memory implementation of the StorageAdapter interface.
 * Provides temporary session storage with automatic cleanup of expired sessions.
 *
 * @typeParam T - Type of custom state data to be stored in sessions
 *
 * @example
 * ```typescript
 * // Create storage with 600 seconds (10 minutes) session timeout
 * const storage = new MemoryStorage(600);
 *
 * // Store session data
 * await storage.set("chat123", { lastActivity: Date.now() });
 *
 * // Retrieve session data
 * const session = await storage.get("chat123");
 * ```
 */
export class MemoryStorage<T = any> implements StorageAdapter<T> {
	/** Internal storage using Map to hold session data */
	private store = new Map<string, SessionData<T>>();
	/** Reference to the cleanup interval timer */
	private cleanupInterval: ReturnType<typeof setInterval> | null = null;
	/** Callback for handling session timeouts */
	public events = new StorageEventEmitter<T>();

	/**
	 * Creates a new instance of MemoryStorage.
	 *
	 * @param timeoutSeconds - Number of seconds after which inactive sessions are removed
	 */
	constructor(private timeoutSeconds: number) {
		this.startCleanup();
	}

	/**
	 * Starts the periodic cleanup of expired sessions.
	 * Runs every 10 seconds to remove sessions that have been inactive
	 * longer than the specified timeout.
	 *
	 * @internal
	 */
	private startCleanup() {
		this.cleanupInterval = setInterval(() => {
			const cutoff = Date.now() - (this.timeoutSeconds * 1000);

			for (const [chatId, session] of this.store.entries()) {
				if (session.lastActivity < cutoff) {
					this.events.emit("sessionExpired", chatId, session);
					this.store.delete(chatId);
				}
			}
		}, 10000);
	}

	/**
	 * Stops the automatic cleanup of expired sessions.
	 * Should be called when the storage is no longer needed to prevent memory leaks.
	 *
	 * @example
	 * ```typescript
	 * const storage = new MemoryStorage();
	 * // ... use storage ...
	 * storage.stopCleanup(); // Call when done
	 * ```
	 */
	public stopCleanup(): void {
		if (this.cleanupInterval) {
			clearInterval(this.cleanupInterval);
			this.cleanupInterval = null;
		}
	}

	/**
	 * Retrieves session data for the specified chat ID.
	 *
	 * @param chatId - The unique identifier of the chat
	 * @returns The session data if found, null otherwise
	 */
	async get(chatId: string): Promise<SessionData<T> | null> {
		return this.store.get(chatId) || null;
	}

	/**
	 * Stores session data for the specified chat ID.
	 * If data already exists for this chat ID, it will be overwritten.
	 *
	 * @param chatId - The unique identifier of the chat
	 * @param data - The session data to store
	 */
	async set(chatId: string, data: SessionData<T>): Promise<void> {
		this.store.set(chatId, data);
	}
}
