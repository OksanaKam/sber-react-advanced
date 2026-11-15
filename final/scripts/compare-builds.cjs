const { spawnSync } = require('node:child_process');
const { readdirSync, readFileSync, writeFileSync } = require('node:fs');
const path = require('node:path');
const { gzipSync } = require('node:zlib');
const { performance } = require('node:perf_hooks');

const root = path.resolve(__dirname, '..');
const runs = 3;
const builds = [
	{ name: 'Webpack', script: 'build', directory: 'dist', times: [] },
	{
		name: 'Vite + SWC',
		script: 'build:vite',
		directory: 'dist-vite',
		times: [],
	},
];
function files(directory) {
	return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
		const file = path.join(directory, entry.name);
		return entry.isDirectory() ? files(file) : [file];
	});
}
for (let run = 0; run < runs; run++) {
	for (const build of builds) {
		console.log(`${build.name}: запуск ${run + 1}/${runs}`);
		const start = performance.now();
		const result = spawnSync('npm', ['run', build.script], {
			cwd: root,
			encoding: 'utf8',
			maxBuffer: 10 * 1024 * 1024,
		});
		if (result.status !== 0) {
			console.error(result.stdout, result.stderr, result.error || '');
			process.exit(1);
		}
		build.times.push(Number(((performance.now() - start) / 1000).toFixed(3)));
	}
}
const results = builds.map((build) => {
	const output = files(path.join(root, build.directory));
	const sum = (list, compressed = false) =>
		list.reduce((total, file) => {
			const content = readFileSync(file);
			return total + (compressed ? gzipSync(content).length : content.length);
		}, 0);
	const js = output.filter((file) => file.endsWith('.js'));
	const css = output.filter((file) => file.endsWith('.css'));
	return {
		name: build.name,
		seconds: build.times,
		medianSeconds: [...build.times].sort((a, b) => a - b)[1],
		totalBytes: sum(output),
		jsBytes: sum(js),
		cssBytes: sum(css),
		jsGzipBytes: sum(js, true),
	};
});
const report = {
	node: process.version,
	platform: `${process.platform}/${process.arch}`,
	runs,
	results,
};
writeFileSync(
	path.join(root, 'build-comparison.json'),
	JSON.stringify(report, null, 2) + '\n'
);
console.table(results);
