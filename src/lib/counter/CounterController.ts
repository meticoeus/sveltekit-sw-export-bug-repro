import { gql, rawRequest } from 'graphql-request';
import { writable } from 'svelte/store';
import { waitUntilSWAvailable } from '$lib/waitUntilSWAvailable';

const counterDocument = gql`
	{
		counter
	}
`;

const incrementDocument = gql`
	mutation {
		increment
	}
`;

const decrementDocument = gql`
	mutation {
		decrement
	}
`;

export class CounterController {
	public count = writable<number>(0);

	async load() {
		await waitUntilSWAvailable();
		const resp = await rawRequest('/api/graphql', counterDocument);
		if (typeof resp?.data?.counter === 'number') {
			this.count.set(resp.data.counter);
		}
	}

	async increment() {
		await waitUntilSWAvailable();
		const resp = await rawRequest('/api/graphql', incrementDocument);
		if (typeof resp?.data?.increment === 'number') {
			this.count.set(resp.data.increment);
		}
	}

	async decrement() {
		await waitUntilSWAvailable();
		const resp = await rawRequest('/api/graphql', decrementDocument);
		if (typeof resp?.data?.decrement === 'number') {
			this.count.set(resp.data.decrement);
		}
	}
}
