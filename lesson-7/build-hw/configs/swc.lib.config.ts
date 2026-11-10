import { transformFile, type Options } from '@swc/core';
import { mkdir, writeFile } from 'node:fs/promises';

const commonOptions: Options = {
  jsc: {
    parser: { syntax: 'typescript' },
    target: 'es2022',
  },
  minify: true,
  sourceMaps: true,
};

async function buildFormat(format: 'esm' | 'cjs') {
  const outdir = `dist/swc/${format}`;
  await mkdir(outdir, { recursive: true });

  await writeFile(
    `${outdir}/package.json`,
    JSON.stringify({ type: format === 'esm' ? 'module' : 'commonjs' }, null, 2) + '\n',
  );

  for (const entry of ['index', 'math', 'string']) {
    const output = await transformFile(`lib/${entry}.ts`, {
      ...commonOptions,
      module: { type: format === 'esm' ? 'es6' : 'commonjs' },
      sourceFileName: `../../../lib/${entry}.ts`,
    });

    await writeFile(
      `${outdir}/${entry}.js`,
      `${output.code}\n//# sourceMappingURL=${entry}.js.map\n`,
    );
    if (output.map) {
      await writeFile(`${outdir}/${entry}.js.map`, output.map);
    }
  }
}

async function buildLibrary() {
  await buildFormat('esm');
  await buildFormat('cjs');
}

buildLibrary().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
