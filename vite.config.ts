import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	// define: {
	// 	'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
	// },
	plugins: [sveltekit()],
});
