export class MemoryStorage<T extends { id: string }> {
    private data: T[];

    constructor(data?: T[]) {
        this.data = data ?? [];
    }

    add(item: T) {
        this.data.push(item);
    }

    getBy(key: keyof T, value: T[keyof T]): T | undefined {
        return this.data.find(item => item[key] === value);
    }

    getAll(): T[] {
        return this.data;
    }

    update(id: string, updatedItem: Partial<T>): T | undefined {
        const index = this.data.findIndex(item => item.id === id);
        if (index === -1) {
            return undefined;
        }
        this.data[index] = { ...this.data[index], ...updatedItem };
        return this.data[index];
    }
}