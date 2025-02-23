import { EventEmitter } from "events";
import { SessionData } from "../types";

export interface StorageEvents<T> {
	sessionExpired: (chatId: string, session: SessionData<T>) => void;
}

export class StorageEventEmitter<T> extends EventEmitter {
	emit<K extends keyof StorageEvents<T>>(event: K, ...args: Parameters<StorageEvents<T>[K]>): boolean {
		return super.emit(event, ...args);
	}

	on<K extends keyof StorageEvents<T>>(event: K, listener: StorageEvents<T>[K]): this {
		return super.on(event, listener);
	}
}
