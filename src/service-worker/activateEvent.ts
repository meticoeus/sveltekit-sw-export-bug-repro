import orderBy from 'lodash-es/orderBy.js'; // Causes issue on its own
import map from 'lodash-es/map.js';
// import DataLoader from 'dataloader';
// import { openDB } from 'idb';
// import { buildSchema, graphql } from 'graphql';
// import { gql } from 'graphql-request';
// import { Relay } from 'nostr';

declare let self: ServiceWorkerGlobalScope;

export const activateEvent = (event: ExtendableEvent) => {
	// causes issue
	const t = orderBy([], ['a']);

	// causes issue
	const r = map(['A', 'B'], (it) => it.toLowerCase());

	// none of these caused the issue on their own or tested together
	// const dl = new DataLoader(async () => []);
	// const str = gql`
	// 	type Query {
	// 		hello: String
	// 	}
	// `;
	// const rootValue = { hello: () => 'world' };
	// const resp = graphql({ schema: buildSchema(str), source: '{ hello }', rootValue });
	// const db = openDB('keyval', 1, {
	// 	upgrade(database) {
	// 		if (!database.objectStoreNames.contains('keyval')) {
	// 			database.createObjectStore('keyval', {
	// 				autoIncrement: false,
	// 			});
	// 		}
	// 	},
	// });
	// const rp = new Relay('https://localhost');

	event.waitUntil(claimAll());
};

/**
 * For debugging, log the claimed clients.
 */
async function claimAll() {
	const clientList = await self.clients.matchAll({ includeUncontrolled: true });
	const urls = clientList.map((client) => client.url);
	console.debug(`[ServiceWorker] Matching clients:
${urls.join('\n')}
`);
	await self.clients.claim();
}
