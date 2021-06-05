import * as path from 'path';
import os from 'os';

const homedir = os.homedir();
const tmpdir = os.tmpdir();

function macos (name) {
	const library = path.join(homedir, 'Library');

	return {
		data: path.join(library, 'Application Support', name),
		config: path.join(library, 'Preferences', name),
		cache: path.join(library, 'Caches', name),
		log: path.join(library, 'Logs', name),
		temp: path.join(tmpdir, name)
	};
}

function windows (name) {
	const appData = Deno.env.get('APPDATA') || path.join(homedir, 'AppData', 'Roaming');
	const localAppData = Deno.env.get('LOCALAPPDATA') || path.join(homedir, 'AppData', 'Local');

	return {
		// Data/config/cache/log are invented by me as Windows isn't opinionated about this
		data: path.join(localAppData, name, 'Data'),
		config: path.join(appData, name, 'Config'),
		cache: path.join(localAppData, name, 'Cache'),
		log: path.join(localAppData, name, 'Log'),
		temp: path.join(tmpdir, name)
	};
}

// https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html
function linux (name) {
	const username = path.basename(homedir);

	return {
		data: path.join(Deno.env.get('XDG_DATA_HOME') || path.join(homedir, '.local', 'share'), name),
		config: path.join(Deno.env.get('XDG_CONFIG_HOME') || path.join(homedir, '.config'), name),
		cache: path.join(Deno.env.get('XDG_CACHE_HOME') || path.join(homedir, '.cache'), name),
		// https://wiki.debian.org/XDGBaseDirectorySpecification#state
		log: path.join(Deno.env.get('XDG_STATE_HOME') || path.join(homedir, '.local', 'state'), name),
		temp: path.join(tmpdir, username, name)
	};
}

export default function envPaths (name, options) {
	if (typeof name !== 'string') {
		throw new TypeError(`Expected string, got ${typeof name}`);
	}

	options = Object.assign({suffix: 'deno'}, options);

  const platform = Deno.build.os === "windows" ? "win32" : Deno.build.os;

	if (options.suffix) {
		// Add suffix to prevent possible conflict with native apps
		name += `-${options.suffix}`;
	}

	if (platform === 'darwin') {
		return macos(name);
	}

	if (platform === 'win32') {
		return windows(name);
	}

	return linux(name);
}
