# @front-utils/builder

A utility library for generating Rspack configurations for front-end projects.

## Description

This package provides pre-configured Rspack configurations and utilities for building front-end applications with support for TypeScript, React, CSS modules, Module Federation 2.0, and asset handling.

## Installation

```bash
npm install @front-utils/builder
```

Peer dependencies (install separately):
- `@rspack/core` ^2.1.0
- `@rspack/cli` ^2.1.0
- `@rspack/plugin-react-refresh` ^2.0.0
- `@rspack/dev-server` ^2.1.0

## Usage

### Basic Configuration

```javascript
import { baseConfig } from '@front-utils/builder';

export default baseConfig({
  rootDir    : process.cwd(),
  env        : { production: process.env.NODE_ENV === 'production' },
  appDirName : 'my-app',
  browserTargets: {
    chrome: 83,
    safari: 14,
  },
  aliases: {
    '@': './src',
  },
});
```

### Custom Configuration with Merging

```javascript
import { createConfig } from '@front-utils/builder';

export default createConfig({
  rootDir   : process.cwd(),
  env       : { production: process.env.NODE_ENV === 'production' },
  appDirName: 'my-app',
}, {
  devServer: { port: 3000, hot: true },
  plugins: [
    // Additional custom plugins
  ],
});
```

### Module Federation 2.0

```javascript
import { createMFConfig, createDevServer } from '@front-utils/builder';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';

const mfOptions = createMFConfig(
  {
    exposes: {
      './Button': './src/components/Button',
    },
  },
  {
    name: 'my-app',
    retry: true,
    shared: {
      react    : { singleton: true },
      'react-dom': { singleton: true },
    },
  }
);

export default createConfig({ rootDir, env, appDirName }, {
  devServer: createDevServer(3000),
  plugins: [new ModuleFederationPlugin(mfOptions)],
});
```

### Dev Server

```javascript
import { createDevServer } from '@front-utils/builder';

createDevServer(3000);
// { port: 3000, client: { progress: true, logging: 'verbose', overlay: false },
//   headers: { 'Access-Control-Allow-Origin': '*', ... },
//   historyApiFallback: true }

createDevServer(3000, { allowedHosts: 'all' }); // with overrides
```

### Split Chunks

```javascript
import { getSplitChunksSettings } from '@front-utils/builder';

// Configured for async chunks to avoid pulling modules from
// Module Federation remote entries into shared vendor chunks.
getSplitChunksSettings('my-app');
```

### CSS Modules

CSS modules are handled via `type: 'css/module'` and `type: 'css'` rules. Import syntax:

```javascript
import * as styles from './component.module.css';

// In JSX:
<div className={styles.root} />
```

### Rsdoctor Analysis

Set the `RSDOCTOR` environment variable to enable the Rsdoctor analysis plugin:

```bash
RSDOCTOR=true npm run build
```

## API Reference

### baseConfig(options)

Generates a complete Rspack configuration.

- `options.rootDir` (string): Root directory of the project.
- `options.env` (object): Environment settings with `production` boolean.
- `options.appDirName` (string): Application directory name.
- `options.browserTargets` (object, optional): Browser compatibility targets.
- `options.aliases` (object, optional): Module resolution aliases.
- `options.buildPath` (string, optional): Output build path (default: `{rootDir}/dist`).
- `options.useSplitChunks` (boolean, optional): Whether to enable split chunks optimization (default: `true`).

### createConfig(params, config)

Creates a merged Rspack configuration by combining base config with custom config.

- `params` (ConfigOptions): The base configuration parameters.
- `config` (object): Additional configuration to merge with the base config.
- Returns: Merged Rspack configuration object.

### createMFConfig(config, options)

Creates a module federation configuration (uses `@module-federation/enhanced`).

- `config` (object): Module federation options (exposes, remotes, shared, etc.).
- `options.name` (string): Name of the federation module.
- `options.shared` (Record<string, SharedConfig>, optional): Shared dependency configuration.
- `options.retry` (boolean, optional): Whether to enable retry plugin for module federation (default: false).
- Returns: Module federation configuration object ready for `new ModuleFederationPlugin(...)`.

### createDevServer(port, config?)

Creates a dev server configuration with CORS headers and history API fallback.

- `port` (number): Dev server port.
- `config` (DevServerOptions, optional): Additional dev server overrides.
- Returns: Dev server configuration object.

### getSplitChunksSettings(appDirName)

Returns split chunks optimization settings optimized for Module Federation.

- `appDirName` (string): Application name used in chunk filenames.
- Returns: `OptimizationSplitChunksOptions` with async mode, vendor/monorepo cache groups.

### getRules(env, appName, browserTargets?)

Returns an array of Rspack rules for TS/TSX (SWC), images, SVG (svgr), CSS modules, CSS, and fonts.

- `env` (object): Environment with `production` boolean.
- `appName` (string): Application name.
- `browserTargets` (object, optional): Browser targets.

### getPlugins(env)

Returns an array of Rspack plugins: DefinePlugin, HtmlRspackPlugin, CircularDependencyRspackPlugin, and optionally Rsdoctor, CompressionPlugin (gzip), ReactRefresh, HMR.

- `env` (object): Environment with `production` boolean.

### generateFileName(options)

Generates asset filenames with content hashing in production.

- `options.folder` (string): Asset folder (e.g. 'js', 'css', 'images').
- `options.ext` (string, optional): File extension.
- `options.hashed` (boolean, optional): Include hash (default: true).
- `options.appName` (string): Application name.

### getModuleGenerator()

Returns generator options for CSS modules (`css/module`, `css/auto`) with `exportsOnly: false`, `exportsConvention: 'as-is'`, and `localIdentName` in production.

### convertBrowserTargetsToSwcTargets(browserTargets?)

Converts browser targets object to SWC target strings.

- `browserTargets` (object, optional): Object with browser names as keys and versions as values.
- Returns: Array of strings like `['chrome >= 83', 'safari >= 14']`.

### Constants

- `ASSET_DIR_NAME` (string): `'assets'` — asset directory name used in filename generation.
- `LIBS_PATH` (string): `'node_modules'` — libraries path constant.

## TypeScript Support

Type definitions are included. Import types directly:

```typescript
import { baseConfig, ConfigOptions } from '@front-utils/builder';

const options: ConfigOptions = {
  rootDir   : process.cwd(),
  env       : { production: true },
  appDirName: 'my-app',
};

const config = baseConfig(options); // Fully typed
```

## License

ISC
