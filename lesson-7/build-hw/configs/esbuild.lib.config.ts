import esbuild, { type BuildOptions } from 'esbuild';

const isDev = process.argv.includes('--dev');

const commonOptions: BuildOptions = {
  entryPoints: ['lib/index.ts', 'lib/math.ts', 'lib/string.ts'],
  bundle: true,
  external: ['react', 'lodash'],
  minify: !isDev,
  sourcemap: true,
  treeShaking: true,
};

async function buildFormat(options: BuildOptions) {
  if (isDev) {
    const context = await esbuild.context(options);
    await context.watch();
  } else {
    await esbuild.build(options);
  }
}

async function buildLibrary() {
  await buildFormat({
    ...commonOptions,
    format: 'esm',
    outdir: 'dist/lib/esm',
    outExtension: { '.js': '.mjs' },
  });

  await buildFormat({
    ...commonOptions,
    format: 'cjs',
    outdir: 'dist/lib/cjs',
    outExtension: { '.js': '.cjs' },
  });
}

buildLibrary().catch(() => {
  process.exitCode = 1;
});
