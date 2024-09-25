import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

export interface Data {
    id: string;
}
export type DB = Record<string, Data[] | undefined>;

export default class Database {
    private static instance: Database;
    private rootDir = process.cwd();
    private folderPath = path.resolve(this.rootDir, 'data');
    private dbPath = path.resolve(this.folderPath, 'db.json');
    private constructor() {}

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }

    private async writeDB(db: DB) {
        await fs.stat(this.folderPath).catch(() => fs.mkdir(this.folderPath));
        await fs.writeFile(this.dbPath, JSON.stringify(db, null, 2));
    }

    private async readDB(): Promise<DB> {
        try {
            const data = await fs.readFile(this.dbPath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            const initialDB: DB = {};
            await this.writeDB(initialDB);
            return initialDB;
        }
    }

    public async create<T extends Omit<Data, 'id'>>(module: string, data: T): Promise<string> {
        const db = await this.readDB();
        const id = crypto.randomUUID();
        if (!Array.isArray(db[module])) db[module] = [];
        db[module].push({ ...data, id });
        await this.writeDB(db);
        return id;
    }

    public async read<T extends Data>(module: string): Promise<T[]> {
        try {
            const db = await this.readDB();
            if (!Array.isArray(db[module])) return [];
            return db[module] as T[];
        } catch (error) {
            return [];
        }
    }

    public async update<T extends Omit<Data, 'id'>>(module: string, id: string, data: T) {
        const db = await this.readDB();
        const index = (db[module] ?? []).findIndex((row) => row.id === id);
        if (!db[module] || index === -1) throw new Error('Data not found');
        db[module][index] = { ...db[module][index], ...data, id };
        await this.writeDB(db);
    }

    public async delete(module: string, id: string) {
        const db = await this.readDB();
        const index = (db[module] ?? []).findIndex((row) => row.id === id);
        if (!db[module] || index === -1) throw new Error('Data not found');
        db[module].splice(index, 1);
        if (db[module].length === 0) delete db[module];
        await this.writeDB(db);
    }
}
