import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

function apkMimeTypePlugin() {
	return {
		name: 'set-apk-mime-type',
		configureServer(server: any) {
		server.middlewares.use((req: any, res: any, next: any) => {
			if (req.url?.endsWith('.apk')) {
			res.setHeader('Content-Type', 'application/vnd.android.package-archive');
			}
			next();
		});
		}
	};
}

export default defineConfig({
	plugins: [
		react(),
		apkMimeTypePlugin()
	],
	resolve: {
		alias: {
		'@': path.resolve(__dirname, 'src'),
		},
	},
	build: {
		outDir: 'dist',
	},
	base: './',
});
