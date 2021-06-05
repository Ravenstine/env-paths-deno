declare namespace envPaths {
	export interface Options {
		/**
		__Don't use this option unless you really have to!__

		Suffix appended to the project name to avoid name conflicts with native apps. Pass an empty string to disable it.

		@default 'deno'
		*/
		readonly suffix?: string;
	}

	export interface Paths {
		/**
		Directory for data files.

		Example locations (with the default `deno` suffix):

		- macOS: `~/Library/Application Support/MyApp-deno`
		- Windows: `%LOCALAPPDATA%\MyApp-deno\Data` (for example, `C:\Users\USERNAME\AppData\Local\MyApp-deno\Data`)
		- Linux: `~/.local/share/MyApp-deno` (or `$XDG_DATA_HOME/MyApp-deno`)
		*/
		readonly data: string;

		/**
		Directory for data files.

		Example locations (with the default `deno` suffix):

		- macOS: `~/Library/Preferences/MyApp-deno`
		- Windows: `%APPDATA%\MyApp-deno\Config` (for example, `C:\Users\USERNAME\AppData\Roaming\MyApp-deno\Config`)
		- Linux: `~/.config/MyApp-deno` (or `$XDG_CONFIG_HOME/MyApp-deno`)
		*/
		readonly config: string;

		/**
		Directory for non-essential data files.

		Example locations (with the default `deno` suffix):

		- macOS: `~/Library/Caches/MyApp-deno`
		- Windows: `%LOCALAPPDATA%\MyApp-deno\Cache` (for example, `C:\Users\USERNAME\AppData\Local\MyApp-deno\Cache`)
		- Linux: `~/.cache/MyApp-deno` (or `$XDG_CACHE_HOME/MyApp-deno`)
		*/
		readonly cache: string;

		/**
		Directory for log files.

		Example locations (with the default `deno` suffix):

		- macOS: `~/Library/Logs/MyApp-deno`
		- Windows: `%LOCALAPPDATA%\MyApp-deno\Log` (for example, `C:\Users\USERNAME\AppData\Local\MyApp-deno\Log`)
		- Linux: `~/.local/state/MyApp-deno` (or `$XDG_STATE_HOME/MyApp-deno`)
		*/
		readonly log: string;

		/**
		Directory for temporary files.

		Example locations (with the default `deno` suffix):

		- macOS: `/var/folders/jf/f2twvvvs5jl_m49tf034ffpw0000gn/T/MyApp-deno`
		- Windows: `%LOCALAPPDATA%\Temp\MyApp-deno` (for example, `C:\Users\USERNAME\AppData\Local\Temp\MyApp-deno`)
		- Linux: `/tmp/USERNAME/MyApp-deno`
		*/
		readonly temp: string;
	}
}

declare const envPaths: {
	/**
	Get paths for storing things like data, config, cache, etc.

	Note: It only generates the path strings. It doesn't create the directories for you. You could use [`make-dir`](https://github.com/sindresorhus/make-dir) to create the directories.

	@param name - Name of your project. Used to generate the paths.
	@returns The paths to use for your project on current OS.

	@example
	```
	import envPaths = require('env-paths');

	const paths = envPaths('MyApp');

	paths.data;
	//=> '/home/sindresorhus/.local/share/MyApp-deno'

	paths.config
	//=> '/home/sindresorhus/.config/MyApp-deno'
	```
	*/
	(name: string, options?: envPaths.Options): envPaths.Paths;

	// TODO: Remove this for the next major release, refactor the whole definition to:
	// declare function envPaths(name: string, options?: envPaths.Options): envPaths.Paths;
	// export = envPaths;
	default: typeof envPaths;
};

export = envPaths;
