import { assert } from "https://deno.land/std@0.97.0/testing/asserts.ts";
import envPaths from './index.js';

Deno.test('default', function () {
	const name = 'unicorn';
	const paths = envPaths(name);

	for (const [key, value] of Object.entries(paths)) {
		console.log(`  ${key}: ${value}`);
		assert(value.endsWith(`${name}-deno`));
	}
});

Deno.test('custom suffix', function () {
	const name = 'unicorn';
	const opts = {suffix: 'horn'};
	const paths = envPaths(name, opts);
	assert(paths.data.endsWith(`${name}-${opts.suffix}`));
});

Deno.test('no suffix', function () {
	const name = 'unicorn';
	const opts = {suffix: false};
	const paths = envPaths(name, opts);
	assert(paths.data.endsWith(name));
});

const platform = Deno.build.os === "windows" ? "win32" : Deno.build.os;

// Linux-specific tests
if (platform === 'linux') {
	Deno.test('correct paths with XDG_*_HOME set', function () {
		const envVars = {
			data: 'XDG_DATA_HOME',
			config: 'XDG_CONFIG_HOME',
			cache: 'XDG_CACHE_HOME',
			log: 'XDG_STATE_HOME'
		};

		for (const env of Object.values(envVars)) {
			process.env[env] = `/tmp/${env}`;
		}

		const name = 'unicorn';
		const paths = envPaths(name);

		for (const env of Object.keys(envVars)) {
			const expectedPath = process.env[envVars[env]];
			assert(paths[env].startsWith(expectedPath) && paths[env].endsWith(`${name}-deno`));
		}
	});
}
