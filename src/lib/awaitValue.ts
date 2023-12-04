import type { Readable } from 'svelte/store';

export function awaitValue<T>(store: Readable<T>, value: T, timeout?: number): Promise<void> {
	return new Promise<void>((done, err) => {
		const unsub = store.subscribe((v) => {
			if (v === value) {
				cleanup();
				done();
			}
		});

		let t = !timeout
			? null
			: setTimeout(() => {
					t = null;
					cleanup();
					err(new Error('timeout'));
			  }, timeout);

		function cleanup() {
			unsub();
			if (t) {
				clearTimeout(t);
			}
		}
	});
}
