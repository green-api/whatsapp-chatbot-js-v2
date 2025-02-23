import { EventEmitter } from "events";
import { SessionData } from "../types";

/**
 * Defines the types of events that can be emitted by storage implementations.
 * @typeParam T - Type of custom state data stored in sessions
 */
export interface StorageEvents<T> {
	/**
	 * Event emitted when a session expires and is removed from storage.
	 * @param chatId - The ID of the chat whose session expired
	 * @param session - The session data that was removed
	 */
	sessionExpired: (chatId: string, session: SessionData<T>) => void;
}

/**
 * Event emitter for storage events. Extends Node's EventEmitter.
 * @typeParam T - Type of custom state data stored in sessions
 */
export class StorageEventEmitter<T> extends EventEmitter {
	/**
	 * Emits a storage event
	 * @param event - The name of the event to emit
	 * @param args - Arguments to pass to the event listeners
	 * @returns true if the event had listeners, false otherwise
	 */
	emit<K extends keyof StorageEvents<T>>(event: K, ...args: Parameters<StorageEvents<T>[K]>): boolean {
		return super.emit(event, ...args);
	}

	/**
	 * Adds a listener for a storage event
	 * @param event - The name of the event to listen for
	 * @param listener - The callback to execute when the event occurs
	 * @returns this instance for chaining
	 */
	on<K extends keyof StorageEvents<T>>(event: K, listener: StorageEvents<T>[K]): this {
		return super.on(event, listener);
	}
}
