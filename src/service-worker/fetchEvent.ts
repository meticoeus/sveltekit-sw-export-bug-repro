/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />
// This file is in a folder for the above directive tag to give type resolution

import { resolveRequest } from '../lib/graphql-server';

declare let self: ServiceWorkerGlobalScope;

export function fetchEvent(event: FetchEvent) {
	const url = new URL(event.request.url);

	if (url.pathname === '/api/graphql' && event.request.method.toLowerCase() === 'post') {
		console.debug('[ServiceWorker] Fetch Graphql');

		return event.respondWith(handleGraphqlRequest(event));
	}
}

export async function handleGraphqlRequest(event: FetchEvent): Promise<Response> {
	const { query, variables } = await event.request.json();

	const result = await resolveRequest(query, variables);

	return new Response(JSON.stringify(result), {
		headers: new Headers({
			'Content-Type': 'application/json',
		}),
	});
}
