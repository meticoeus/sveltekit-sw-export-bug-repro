<script lang="ts">
	import { onMount } from 'svelte';
	import { serviceWorkerActive } from '$lib/serviceWorkerActive';

	let message = '...';

	onMount(() => {
		let int: ReturnType<typeof setInterval> | null = setInterval(check, 1000);

		async function check() {
			if (window.navigator.serviceWorker.controller) {
				clearInterval(int);
				int = null;
				message = 'ok';
				serviceWorkerActive.set(true);
			} else {
				message = 'waiting';
			}
		}

		return () => {
			if (int !== null) {
				clearInterval(int);
			}
		};
	});
</script>

<p>Service worker status = {message}</p>
