import { awaitValue } from '$lib/awaitValue';
import { serviceWorkerActive } from '$lib/serviceWorkerActive';

export async function waitUntilSWAvailable(): Promise<void> {
	if (!navigator.serviceWorker) {
		return;
	}
	if (navigator.serviceWorker.controller) {
		return;
	}

	await navigator.serviceWorker?.ready;

	if (!navigator.serviceWorker.controller) {
		try {
			await awaitValue(serviceWorkerActive, true, 5000);
		} catch (e) {
			console.warn('Please refresh the page to see data');
		}
	}
}
