import Database, { Data } from '../../database';

export interface IData extends Data {}

export default abstract class AbstractBaseModel<T extends IData> {
    abstract collection: string;
    private db: Database;
    constructor() {
        this.db = Database.getInstance();
    }

    async getAll() {
        return this.db.read<T>(this.collection);
    }

    async getById(id: string) {
        const tasks = await this.db.read<T>(this.collection);
        return tasks.find((task) => task.id === id) || null;
    }

    async create(data: T) {
        return this.db.create<T>(this.collection, data);
    }

    async update(id: string, data: T) {
        return this.db.update<T>(this.collection, id, data);
    }

    async delete(id: string) {
        return this.db.delete(this.collection, id);
    }
}
