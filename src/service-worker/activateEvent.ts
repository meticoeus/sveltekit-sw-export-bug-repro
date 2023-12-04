declare let self: ServiceWorkerGlobalScope;

export const activateEvent = (event: ExtendableEvent) => {
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
