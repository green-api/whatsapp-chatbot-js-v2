import mysql from 'mysql2/promise';
import { StorageAdapter, SessionData } from "../../src";

export class MySQLStorage<T = any> implements StorageAdapter<T> {
    private pool: mysql.Pool;

    constructor(config: {
        host: string;
        port: number;
        database: string;
        user: string;
        password: string;
    }) {
        this.pool = mysql.createPool({
            ...config,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
        this.initializeDatabase();
    }

    private async initializeDatabase() {
        try {
            await this.pool.query(`
                CREATE TABLE IF NOT EXISTS sessions (
                    chat_id VARCHAR(255) PRIMARY KEY,
                    data JSON NOT NULL,
                    last_activity TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    INDEX idx_last_activity (last_activity)
                )
            `);
        } catch (error) {
            console.error('Error initializing database:', error);
            throw error;
        }
    }

    async get(chatId: string): Promise<SessionData<T> | null> {
        try {
            const [rows] = await this.pool.query<mysql.RowDataPacket[]>(
                'SELECT data FROM sessions WHERE chat_id = ?',
                [chatId]
            );

            if (rows.length === 0) {
                return null;
            }

            const data = JSON.parse(rows[0].data.toString());
            return {
                ...data,
                lastActivity: new Date(data.lastActivity).getTime()
            };
        } catch (error) {
            console.error('Error getting session:', error);
            throw error;
        }
    }

    async set(chatId: string, data: SessionData<T>): Promise<void> {
        try {
            await this.pool.query(
                `
                INSERT INTO sessions (chat_id, data, last_activity)
                VALUES (?, ?, CURRENT_TIMESTAMP)
                ON DUPLICATE KEY UPDATE
                    data = VALUES(data),
                    last_activity = CURRENT_TIMESTAMP
                `,
                [chatId, JSON.stringify(data)]
            );
        } catch (error) {
            console.error('Error setting session:', error);
            throw error;
        }
    }

    async cleanup(timeoutMinutes: number): Promise<void> {
        try {
            await this.pool.query(
                'DELETE FROM sessions WHERE last_activity < DATE_SUB(NOW(), INTERVAL ? MINUTE)',
                [timeoutMinutes]
            );
        } catch (error) {
            console.error('Error cleaning up sessions:', error);
            throw error;
        }
    }

    async close(): Promise<void> {
        await this.pool.end();
    }

    startCleanupTask(intervalMinutes: number, timeoutMinutes: number): void {
        setInterval(() => {
            this.cleanup(timeoutMinutes).catch(error => {
                console.error('Error in cleanup task:', error);
            });
        }, intervalMinutes * 60 * 1000);
    }
}
