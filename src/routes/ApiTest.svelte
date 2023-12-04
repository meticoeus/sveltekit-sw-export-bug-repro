<script lang="ts">
	let message = 'no message yet';

	async function makeRequest() {
		message = '...';
		try {
			const response = await fetch('/api/graphql', {
				method: 'post',
				body: JSON.stringify({
					query: '{ hello }',
				}),
			});

			if (response.ok) {
				const resp = await response.json();
				if (resp?.data?.hello) {
					message = resp?.data?.hello;
				} else {
					message = 'invalid response from server';
					console.warn('[Response Data]:', resp);
				}
			} else {
				message = 'fetch request was not ok';
			}
		} catch (e) {
			message = e.message;
		}
	}
</script>

<p>Test GQL response.</p>
<p>Message: {message}</p>
<button on:click={makeRequest}>Send Request</button>
