import Database, { Data } from '../database';

export default abstract class AbstractBaseModel<T extends Data> {
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

    async create(data: Omit<T, 'id'>) {
        return this.db.create<Omit<T, 'id'>>(this.collection, data);
    }

    async update(id: string, data: Omit<T, 'id'>) {
        return this.db.update<Omit<T, 'id'>>(this.collection, id, data);
    }

    async delete(id: string) {
        return this.db.delete(this.collection, id);
    }
}
