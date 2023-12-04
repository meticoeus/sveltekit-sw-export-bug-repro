import type { IDBPDatabase } from 'idb';
import orderBy from 'lodash-es/orderBy.js';
import { Connection } from './Connection';

const KeyValTable = 'keyval';
let connection: Connection<any>;

export const rootValue = {
	hello: () => {
		const t = orderBy([], ['a']);
		return 'Hello world from Service Worker!';
	},
	counter: () => {
		return getCounter();
	},
	increment: () => {
		return updateCounter((value) => value + 1);
	},
	decrement: () => {
		return updateCounter((value) => value - 1);
	},
};

function getDb(): Connection<any> {
	if (!connection) {
		connection = new Connection<any>(KeyValTable, {
			version: 1,
			upgrade: (database, oldVersion, newVersion, transaction) => {
				if (!database.objectStoreNames.contains(KeyValTable)) {
					const listStore = database.createObjectStore(KeyValTable, {
						autoIncrement: false,
					});
				}
			},
		});
	}
	return connection;
}

async function getCounter(): Promise<number> {
	let db: IDBPDatabase | undefined;
	try {
		connection = getDb();
		db = await connection.open();
		const tx = db.transaction(KeyValTable);
		const store = tx.objectStore(KeyValTable);
		const value = (await store.get('counter')) || 0;
		await tx.done;
		return value;
	} finally {
		if (db) {
			await connection.close();
		}
	}
}

async function updateCounter(update: (value: number) => number): Promise<number> {
	let db: IDBPDatabase | undefined;
	try {
		connection = getDb();
		db = await connection.open();
		const tx = db.transaction(KeyValTable, 'readwrite');
		const store = tx.objectStore(KeyValTable);
		const value = (await store.get('counter')) || 0;
		const next = update(value);
		await store.put(next, 'counter');
		await tx.done;
		return next;
	} finally {
		if (db) {
			await connection.close();
		}
	}
}
