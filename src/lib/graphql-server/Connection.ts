import type { DBSchema, IDBPDatabase } from 'idb';
import { openDB } from 'idb';
import type { OpenDBCallbacks } from 'idb/build/esm/entry';

export interface ConnectionOptions<Schema extends DBSchema> extends OpenDBCallbacks<Schema> {
	version: number;
}

export class Connection<Schema extends DBSchema> {
	protected db: IDBPDatabase<Schema> | undefined;
	protected connection: Promise<IDBPDatabase<Schema>> | undefined;

	constructor(
		public readonly name: string,
		protected opts: ConnectionOptions<Schema> = {
			version: 1,
		},
	) {}

	protected async client() {
		return this.open();
	}

	async open(): Promise<IDBPDatabase<Schema>> {
		if (this.db) {
			return this.db;
		}

		if (!this.connection) {
			const { version, ...cbs } = this.opts;
			this.connection = openDB(this.name, version, cbs);
			this.db = await this.connection;
		}
		return this.connection;
	}

	async close() {
		if (!this.connection) return;
		const db = await this.client();
		db.close();
		this.connection = undefined;
		this.db = undefined;
	}
}
