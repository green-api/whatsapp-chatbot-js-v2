# Библиотека для создания WhatsApp-бота

Современная библиотека для создания WhatsApp-бота на Node.js, основанная на состояниях и построенный на базе GREEN-API.

## Ссылки поддержки

[![Support](https://img.shields.io/badge/support@green--api.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:support@green-api.com)
[![Support](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/greenapi_support_eng_bot)
[![Support](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/77273122366)

## Руководства и новости

[![Guides](https://img.shields.io/badge/YouTube-%23FF0000.svg?style=for-the-badge&logo=YouTube&logoColor=white)](https://www.youtube.com/@greenapi-en)
[![News](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/green_api)
[![News](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://whatsapp.com/channel/0029VaLj6J4LNSa2B5Jx6s3h)

[![NPM Version](https://img.shields.io/npm/v/@green-api/whatsapp-chatbot-js-v2)](https://www.npmjs.com/package/@green-api/whatsapp-chatbot-js-v2)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Особенности

- Система состояний для управления диалогом
- Встроенное управление сессиями
- Гибкая обработка сообщений
- Поддержка навигации
- Возможность добавления свои адаптеров для разных БД
- Поддержка TypeScript
- Автоматическая настройка параметров инстанса

## Установка

```bash
npm install @green-api/whatsapp-chatbot-js-v2
```

## Быстрый старт

```typescript
import { WhatsAppBot, State } from '@green-api/whatsapp-chatbot-js-v2';

// Инициализация бота
const bot = new WhatsAppBot({
	idInstance: "your-instance-id",
	apiTokenInstance: "your-token",
	defaultState: "menu"
});

// Пример состояния
const menuState: State = {
	name: "menu",
	async onEnter(message) {
		await bot.sendText(
			message.chatId,
			"Добро пожаловать! Выберите опцию:\n1. Помощь\n2. О нас"
		);
	},
	async onMessage(message) {
		if (message.text === "1") {
			return "help";
		}
		return null; // Продолжить обработку глобальными обработчиками
	}
};

// Добавление состояний и запуск бота
bot.addState(menuState);
bot.start();
```

## Основные компоненты

### Конфигурация бота

Полные параметры конфигурации для WhatsAppBot:

```typescript
interface BotConfig<T = any> {
	/** ID инстанса GREEN API */
	idInstance: string;

	/** Токен инстанса GREEN API */
	apiTokenInstance: string;

	/** Начальное состояние для новых сессий. По умолчанию: "root" */
	defaultState?: string;

	/** Таймаут сессии в секундах. По умолчанию: 300 (5 минут) */
	sessionTimeout?: number;

	/** Функция для генерации сообщения о таймауте сессии на основе данных сессии */
	getSessionTimeoutMessage?: (session: SessionData<T>) => string;

	/** Команда(ы) для навигации назад. По умолчанию: "back" */
	backCommands?: string | string[];

	/** Пользовательский адаптер хранилища для управления сессиями. По умолчанию: MemoryStorage */
	storage?: StorageAdapter<T>;

	/** Пользовательские настройки для инстанса GREEN-API */
	settings?: {
		webhookUrl?: string;
		webhookUrlToken?: string;
		outgoingWebhook?: "yes" | "no";
		stateWebhook?: "yes" | "no";
		incomingWebhook?: "yes" | "no";
		outgoingAPIMessageWebhook?: "yes" | "no";
		outgoingMessageWebhook?: "yes" | "no";
		pollMessageWebhook?: "yes" | "no";
		markIncomingMessagesReaded?: "yes" | "no";
	};

	/** Очищать ли очередь webhook при запуске бота. По умолчанию: false */
	clearWebhookQueueOnStart?: boolean;

	/** Управляет порядком обработки сообщений. При значении true, глобальные обработчики запускаются
	 * перед обработчиком состояний (onMessage). При значении false (по умолчанию), сначала запускается обработчик состояний. */
	handlersFirst?: boolean;
}
```

### WhatsAppBot

Основной класс для создания и управления ботом:

```typescript
const bot = new WhatsAppBot<CustomSessionData>({
	// Обязательные параметры
	idInstance: "your-instance-id",
	apiTokenInstance: "your-token",

	// Опциональные параметры
	defaultState: "menu",
	sessionTimeout: 30, // 30 секунд
	getSessionTimeoutMessage: (session) => {
		// Пользовательская логика для сообщения о таймауте
		return "Ваша сессия истекла. Начинаем сначала.";
	},
	backCommands: ["back", "назад", "меню"],
	storage: new CustomStorage(),
	clearWebhookQueueOnStart: true,

	// Настройки инстанса GREEN-API
	settings: {
		webhookUrl: "",
		webhookUrlToken: "",
		outgoingWebhook: "no",
		stateWebhook: "no",
		incomingWebhook: "yes",
		outgoingAPIMessageWebhook: "no",
		outgoingMessageWebhook: "no",
		pollMessageWebhook: "yes",
		markIncomingMessagesReaded: "yes"
	}
});
```

### Состояния

Состояния определяют поток диалога:

```typescript
interface State<T = any> {
	name: string;
	onEnter?: (message, stateData?) => Promise<void | string | StateTransition>;
	onMessage: (message, stateData?) => Promise<void | string | StateTransition | null>;
	onLeave?: (message, stateData?) => Promise<void>;
}
```

Возвращаемые значения обработчиков состояний:

- `null`: Продолжить обработку глобальными обработчиками
- `undefined`: Прекратить обработку
- `string`: Переход в указанное состояние
- `StateTransition`: Переход с данными

### Обработчики сообщений

Глобальные обработчики сообщений для определенных шаблонов:

```typescript
// Точное совпадение текста
bot.onText("help", async (message) => {
	await bot.sendText(message.chatId, "Сообщение помощи");
});

// Регулярное выражение
bot.onRegex(/^order:\s*(\d+)$/, async (message) => {
	const [, orderId] = message.text.match(/^order:\s*(\d+)$/);
	await bot.sendText(message.chatId, `Информация о заказе ${orderId}...`);
});

// Тип сообщения
bot.onType("image", async (message) => {
	await bot.sendText(message.chatId, "Изображение получено!");
});
```

### Хранилище

Встроенное хранилище в памяти с поддержкой пользовательских адаптеров:

```typescript
interface StorageAdapter<T = any> {
	/** Опциональный эмиттер событий для событий, связанных с сессиями, например, истечение срока жизни сессии */
	events?: StorageEventEmitter<T>;

	/** Получает данные сессии для чата */
	get(chatId: string): Promise<SessionData<T> | null>;

	/** Сохраняет данные сессии для чата */
	set(chatId: string, data: SessionData<T>): Promise<void>;

	/** Опциональный метод для получения значения таймаута сессии (для cleanup процессов) */
	setSessionTimeout?(timeoutMs: number): void;
}
```

Пример пользовательского хранилища:

```typescript
class DatabaseStorage implements StorageAdapter {
	public events = new StorageEventEmitter();

	constructor(timeoutSeconds: number) {
		setInterval(() => {
			// Поиск истекших сессий
			const expiredSessions = // ... ваша логика

			for (const session of expiredSessions) {
				this.events.emit('sessionExpired', session.chatId, session);
				// Удаление сессии
			}
		}, 10000);
	}

	async get(chatId: string): Promise<SessionData | null> {
		return await db.sessions.findOne({chatId});
	}

	async set(chatId: string, data: SessionData): Promise<void> {
		await db.sessions.updateOne(
			{chatId},
			{$set: data},
			{upsert: true}
		);
	}
}
```

# Система состояний

Бот использует архитектуру, основанную на состояниях, где каждое состояние представляет определенную точку в потоке
диалога.
Состояния могут иметь точки входа, обработчики сообщений и точки выхода.

## Функции состояний

### onEnter

Вызывается при входе бота в состояние. Полезно для отправки начальных сообщений или настройки данных состояния.

```typescript
const menuState: State = {
	name: "menu",
	async onEnter(message) {
		await bot.sendText(message.chatId, "Добро пожаловать в меню!");
	}
};
```

Возвращаемые значения onEnter:

- `void` - Остаться в текущем состоянии
- `string` - Имя состояния для перехода
- `StateTransition` - Переход с данными:
  ```typescript
  return {
      state: "next_state",
      data: { someData: "value" },
      skipOnEnter: false // Опционально: пропустить onEnter следующего состояния
  };
  ```

### onMessage

Обрабатывает сообщения, полученные в этом состоянии.

```typescript
const orderState: State<OrderData> = {
	name: "create_order",
	async onMessage(message, data = {items: []}) {
		if (message.text === "готово") {
			return "confirm_order";
		}

		// Добавить товар в заказ
		data.items.push(message.text);
		return {
			state: "create_order", // Остаться в том же состоянии
			data: data // Обновить данные состояния
		};
	}
};
```

Возвращаемые значения onMessage:

- `null` - Продолжить обработку глобальными обработчиками
- `undefined` - Прекратить обработку
- `string` - Имя состояния для перехода
- `StateTransition` - Переход с данными

### onLeave

Вызывается при выходе из состояния. Используется для очистки или финальной обработки.

```typescript
const paymentState: State = {
	name: "payment",
	async onLeave(message, data) {
		await savePaymentAttempt(data);
	}
};
```

## Управление сессиями

Сессии поддерживают состояние диалога и пользовательские данные между сообщениями.

### Структура данных сессии

```typescript
interface SessionData<T = any> {
	lastActivity: number;     // Временная метка последней активности
	currentState?: string;    // Имя текущего состояния
	stateData?: T;           // Пользовательские данные состояния
	navigationPath?: string[]; // История состояний
	previousState?: string;   // Последнее состояние (для навигации назад)
}
```

### Данные состояния

Пользовательские данные сохраняются между сообщениями в одном состоянии:

```typescript
interface OrderData {
	orderId: string;
	items: string[];
	total: number;
}

const bot = new WhatsAppBot<OrderData>();

const orderState: State<OrderData> = {
	name: "order",
	async onMessage(message, data = {items: [], total: 0}) {
		// data типизирована как OrderData
		data.items.push(message.text);
		return {state: "order", data};
	}
};
```

### Таймаут сессии

Сессии истекают после периода неактивности (по умолчанию 300 секунд / 5 минут). Вы можете настроить как
продолжительность таймаута, так и сообщение, отправляемое при истечении срока жизни сессии:

```typescript
const bot = new WhatsAppBot({
	// Установить таймаут на 30 секунд
	sessionTimeout: 30,

	// Пользовательское сообщение о таймауте
	getSessionTimeoutMessage: (session) => {
		// Вы можете получить доступ к данным сессии для настройки сообщения
		const userName = session.stateData?.userName || "Пользователь";
		return `Здравствуйте, ${userName}, ваша сессия истекла. Начинаем новый диалог.`;
	}
});
```

Встроенное хранилище (MemoryStorage) проверяет истекшие сессии каждые 10 секунд и автоматически удаляет их. Если вы
реализуете
свой собственный адаптер хранилища, вам нужно будет реализовать свой механизм очистки.

### События при таймауте сессии

Адаптеры хранилища могут опционально отправлять события при истечении срока жизни сессий. Эта функция позволяет боту
отправлять
уведомления о таймауте:

```typescript
import { EventEmitter } from 'events';

class DatabaseStorage implements StorageAdapter {
	public events = new StorageEventEmitter();

	constructor(timeoutSeconds: number) {
		// Настройка очистки, которая отправляет события
		setInterval(() => {
			// Найти истекшие сессии
			const expiredSessions = // ... ваша логика

			for (const session of expiredSessions) {
				this.events.emit('sessionExpired', session.chatId, session);
				// Удалить сессию
			}
		}, 10000);
	}
}
```

Поле events является опциональным - если вам не нужны уведомления о таймауте, вы можете опустить его в вашей реализации
хранилища. Сообщение о таймауте определяется в функции getSessionTimeoutMessage.

## Процесс обработки сообщений

Бот предлагает два процесса обработки сообщений, управляемых опцией конфигурации `handlersFirst`:

#### Стандартный процесс (handlersFirst: false)

1. Бот получает сообщение
2. Обработчик `onMessage` текущего состояния обрабатывает сообщение
3. В зависимости от возвращаемого значения:
    - Если `null`: Глобальные обработчики обрабатывают сообщение (onText, onType, onRegex)
    - Если `undefined`: Прекратить обработку
    - Если имя состояния/переход: Войти в новое состояние

#### Процесс "handlersFirst" (handlersFirst: true)

1. Бот получает сообщение
2. Глобальные обработчики (onText, onRegex, onType) обрабатывают сообщение
    - Если обработчик возвращает `true`, продолжить обработку состоянием
    - Если обработчик возвращает что-то другое, прекратить обработку
3. Если глобальный обработчик вернул `true`, обработчик `onMessage` текущего состояния
   обрабатывает его

### Возвращаемые значения обработчиков

При использовании подхода "Обработчики Сначала" (`handlersFirst: true`), глобальные обработчики сообщений поддерживают
дополнительное возвращаемое значение:

- undefined: Сообщение обработано, прекратить обработку (по умолчанию)
- true: Сообщение частично обработано, передать сообщение в обработчик состояния (onMessage)
- что-либо другое: Обрабатывается как undefined (прекратить обработку)

## Приоритет обработки сообщений (если handlersFirst: false)

Сообщения обрабатываются в определенном порядке приоритета:

1. **Обработчик состояния (Первый)**
    - Обработчик `onMessage` текущего состояния получает первую возможность обработать каждое сообщение
    - В зависимости от возвращаемого значения:
        - `null`: Продолжить обработку глобальными обработчиками
        - `undefined`: Прекратить обработку
        - `string`: Перейти в указанное состояние и прекратить обработку
        - `StateTransition`: Перейти с данными и прекратить обработку

2. **Глобальные обработчики (Только если обработчик состояния вернул null)**
   Сообщения, которые не были полностью обработаны состоянием (вернулось `null`), продолжают обрабатываться глобальными
   обработчиками в следующем порядке:

   a. **Текстовые обработчики**
    - Точные совпадения текста (без учета регистра)
    - Первый совпавший обработчик обрабатывает сообщение и прекращает дальнейшую обработку

   b. **Обработчики регулярных выражений**
    - Совпадения с шаблонами регулярных выражений
    - Первый совпавший шаблон обрабатывает сообщение и прекращает дальнейшую обработку

   c. **Обработчики типов**
    - Сначала выполняются обработчики конкретных типов
    - Общие обработчики ("*") выполняются последними как резервные
    - Первый совпавший обработчик обрабатывает сообщение и прекращает дальнейшую обработку

Это означает, что если обработчик `onMessage` вашего состояния возвращает `undefined` (значение по умолчанию),
глобальные обработчики никогда не будут выполнены. Убедитесь, что вы возвращаете `null`, если хотите разрешить
глобальным обработчикам обработать сообщение.

### Примеры использования handlersFirst

#### Настройка порядка обработки

```typescript
const bot = new WhatsAppBot({
	idInstance: "your-instance-id",
	apiTokenInstance: "your-token",
	defaultState: "menu",
	handlersFirst: true // Обрабатывать глобальные обработчики перед обработчиками состояний
});
```

#### Обработчики с разными возвращаемыми значениями

```typescript
// Обработчик, полностью обрабатывающий сообщение (останавливает дальнейшую обработку)
bot.onText("/help", async (message) => {
	await bot.sendText(message.chatId, "Вот информация по помощи...");
	// Без явного возврата - по умолчанию undefined (прекратить обработку)
});

// Обработчик, частично обрабатывающий сообщение и продолжающий обработку состоянием
bot.onType("location", async (message) => {
	await bot.sendText(message.chatId, "Я получил вашу локацию...");
	return true; // Продолжить обработку состоянием для дополнительной обработки
});
```

## Глобальные обработчики

### Текстовые обработчики

Точное совпадение текста (без учета регистра):

```typescript
bot.onText("меню", async (message) => {
	await bot.sendText(message.chatId, "Главное меню");
});
```

### Обработчики регулярных выражений

Совпадение текстовых шаблонов (regex):

```typescript
bot.onRegex(/заказ:\s*(\d+)/, async (message) => {
	const [, orderId] = message.text.match(/заказ:\s*(\d+)/);
	await bot.sendText(message.chatId, `Детали заказа ${orderId}...`);
});
```

### Обработчики типов

Обработка определенных типов сообщений:

```typescript
// Обработка всех изображений
bot.onType("image", async (message) => {
	const url = message.media?.url;
	await processImage(url);
});

// Обработка всех сообщений (fallback)
bot.onType("*", async (message) => {
	console.log("Необработанное сообщение:", message);
});
```

## Пользовательское хранилище

Хранилище по умолчанию находится в памяти (in-memory), но вы можете реализовать пользовательское хранилище:

```typescript
class DatabaseStorage implements StorageAdapter {
	async get(chatId: string): Promise<SessionData | null> {
		return await db.sessions.findOne({chatId});
	}

	async set(chatId: string, data: SessionData): Promise<void> {
		await db.sessions.updateOne(
			{chatId},
			{$set: data},
			{upsert: true}
		);
	}
}

const bot = new WhatsAppBot({
	storage: new DatabaseStorage()
});
```

## Примеры переходов между состояниями

### Простая цепочка состояний

```typescript
const steps: State[] = [
	{
		name: "step1",
		async onMessage(message) {
			if (message.text) return "step2";
			return undefined;
		}
	},
	{
		name: "step2",
		async onMessage(message) {
			if (message.text) return "step3";
			return undefined;
		}
	}
];
```

### Переходы по условиям (switch/case)

```typescript
const menuState: State = {
	name: "menu",
	async onMessage(message) {
		switch (message.text) {
			case "1":
				return "orders";
			case "2":
				return "settings";
			default:
				return null;
		}
	}
};
```

### Передача данных между состояниями

```typescript
interface UserData {
	name?: string;
	age?: number;
}

const nameState: State<UserData> = {
	name: "get_name",
	async onMessage(message, data = {}) {
		return {
			state: "get_age",
			data: {...data, name: message.text}
		};
	}
};

const ageState: State<UserData> = {
	name: "get_age",
	async onMessage(message, data = {}) {
		const age = parseInt(message.text);
		return {
			state: "confirm",
			data: {...data, age}
		};
	}
};
```

## Продвинутые функции

### Пользовательские данные состояния

Типизуйте данные ваших состояний:

```typescript
interface OrderData {
	orderId?: string;
	items: string[];
	total: number;
}

const bot = new WhatsAppBot<OrderData>({...});

const orderState: State<OrderData> = {
	name: "create_order",
	async onMessage(message, data = {items: [], total: 0}) {
		// Типобезопасный доступ к пользовательским данным
		data.items.push(message.text);
		return {
			state: "confirm_order",
			data: data
		};
	}
};
```

### Работа с файлами

Отправка различных типов файлов:

```typescript
await bot.sendFile(chatId, {
	url: "https://example.com/image.jpg",
	type: "image",
	caption: "Посмотрите на это!"
});
```

## Лучшие практики

1. **Организация состояний**
    - Сохраняйте состояния сфокусированными и однозначными
    - Используйте понятные соглашения об именовании
    - Обрабатывайте граничные случаи и ошибки

2. **Обработка ошибок**
    - Реализуйте глобальные обработчики ошибок
    - Ведите соответствующее логирование ошибок
    - Предоставляйте понятные пользователю сообщения об ошибках

3. **Управление сессиями**
    - Регулярно очищайте старые сессии
    - Реализуйте правильную обработку таймаутов

## Примеры

### Бот службы поддержки

Смотрите `examples/tickets.ts` для полного примера системы тикетов поддержки, демонстрирующего
управление состояниями, обработку файлов и сложные потоки диалогов.

### Реализация пользовательского хранилища

Проверьте `examples/custom-storage/` для примера реализации пользовательского провайдера
хранилища с простой реализацией бота.

### Демонстрационный чат-бот

Ознакомьтесь с [нашим демонстрационным чат-ботом](https://github.com/green-api/whatsapp-demo-chatbot-js-v2), чтобы
увидеть реализацию, основанную на GREEN-API.

## Лицензия

MIT
