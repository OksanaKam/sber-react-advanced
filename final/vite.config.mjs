import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), 'API_URL');
	return {
		plugins: [
			// Пустой список включает SWC-трансформацию также в production.
			react({ plugins: [] }),
			svgr({
				svgrOptions: { exportType: 'named', namedExport: 'ReactComponent' },
			}),
		],
		// public/index.html остаётся шаблоном Webpack.
		publicDir: false,
		define: { 'process.env.API_URL': JSON.stringify(env.API_URL || '') },
		build: { outDir: 'dist-vite', sourcemap: false },
	};
});
