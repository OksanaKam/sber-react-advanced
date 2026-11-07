import esbuild, { type BuildOptions } from 'esbuild';

const isDev = process.argv.includes('--dev');

const options: BuildOptions = {
  entryPoints: { app: 'app/index.ts' },
  outdir: 'dist',
  format: 'esm',
  splitting: true,
  bundle: true,
  minify: !isDev,
  treeShaking: true,
  sourcemap: true,
};

async function buildApp() {
  if (isDev) {
    const context = await esbuild.context(options);
    await context.watch();
  } else {
    await esbuild.build(options);
  }
}

buildApp().catch(() => {
  process.exitCode = 1;
});