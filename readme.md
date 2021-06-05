# env-paths-deno

A port of [env-paths](https://github.com/sindresorhus/env-paths) for [Deno](https://deno.land).

> Get paths for storing things like data, config, cache, etc

Uses the correct OS-specific paths. Most developers get this wrong.


## Usage

```js
import envPaths from './index.js';

const paths = envPaths('MyApp');

paths.data;
//=> '/home/sindresorhus/.local/share/MyApp-deno'

paths.config
//=> '/home/sindresorhus/.config/MyApp-deno'
```


## API

### paths = envPaths(name, options?)

Note: It only generates the path strings. It doesn't create the directories for you. You could use [`make-dir`](https://github.com/sindresorhus/make-dir) to create the directories.

#### name

Type: `string`

Name of your project. Used to generate the paths.

#### options

Type: `object`

##### suffix

Type: `string`<br>
Default: `'deno'`

**Don't use this option unless you really have to!**<br>
Suffix appended to the project name to avoid name conflicts with native
apps. Pass an empty string to disable it.

### paths.data

Directory for data files.

Example locations (with the default `deno` [suffix](#suffix)):

- macOS: `~/Library/Application Support/MyApp-deno`
- Windows: `%LOCALAPPDATA%\MyApp-deno\Data` (for example, `C:\Users\USERNAME\AppData\Local\MyApp-deno\Data`)
- Linux: `~/.local/share/MyApp-deno` (or `$XDG_DATA_HOME/MyApp-deno`)

### paths.config

Directory for config files.

Example locations (with the default `deno` [suffix](#suffix)):

- macOS: `~/Library/Preferences/MyApp-deno`
- Windows: `%APPDATA%\MyApp-deno\Config` (for example, `C:\Users\USERNAME\AppData\Roaming\MyApp-deno\Config`)
- Linux: `~/.config/MyApp-deno` (or `$XDG_CONFIG_HOME/MyApp-deno`)

### paths.cache

Directory for non-essential data files.

Example locations (with the default `deno` [suffix](#suffix)):

- macOS: `~/Library/Caches/MyApp-deno`
- Windows: `%LOCALAPPDATA%\MyApp-deno\Cache` (for example, `C:\Users\USERNAME\AppData\Local\MyApp-deno\Cache`)
- Linux: `~/.cache/MyApp-deno` (or `$XDG_CACHE_HOME/MyApp-deno`)

### paths.log

Directory for log files.

Example locations (with the default `deno` [suffix](#suffix)):

- macOS: `~/Library/Logs/MyApp-deno`
- Windows: `%LOCALAPPDATA%\MyApp-deno\Log` (for example, `C:\Users\USERNAME\AppData\Local\MyApp-deno\Log`)
- Linux: `~/.local/state/MyApp-deno` (or `$XDG_STATE_HOME/MyApp-deno`)

### paths.temp

Directory for temporary files.

Example locations (with the default `deno` [suffix](#suffix)):

- macOS: `/var/folders/jf/f2twvvvs5jl_m49tf034ffpw0000gn/T/MyApp-deno`
- Windows: `%LOCALAPPDATA%\Temp\MyApp-deno` (for example, `C:\Users\USERNAME\AppData\Local\Temp\MyApp-deno`)
- Linux: `/tmp/USERNAME/MyApp-deno`

---

<div align="center">
	<b>
		<a href="https://tidelift.com/subscription/pkg/npm-env-paths?utm_source=npm-env-paths&utm_medium=referral&utm_campaign=readme">Get professional support for this package with a Tidelift subscription</a>
	</b>
	<br>
	<sub>
		Tidelift helps make open source sustainable for maintainers while giving companies<br>assurances about security, maintenance, and licensing for their dependencies.
	</sub>
</div>

## Development
### Tests

```sh
make test
```