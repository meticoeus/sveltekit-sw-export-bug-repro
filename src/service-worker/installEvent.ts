declare let self: ServiceWorkerGlobalScope;

export const installEvent = (event: ExtendableEvent) => {
	event.waitUntil(self.skipWaiting());
};
