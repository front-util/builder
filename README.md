# @front-utils/builder

A utility library for generating Rspack configurations for front-end projects.

## Description

This package provides pre-configured Rspack configurations and utilities for building front-end applications with support for TypeScript, React, CSS modules, and more. It includes configurations for development and production environments, module federation, and asset handling.

## Installation

```bash
npm install @front-utils/builder
```

## TypeScript Support

This package includes TypeScript type definitions. When using TypeScript, you'll get full type checking and IntelliSense support for all exported functions and interfaces.

```typescript
import { baseConfig, ConfigOptions } from '@front-utils/builder';

const options: ConfigOptions = {
  rootDir: process.cwd(),
  env: { production: true },
  appDirName: 'my-app',
};

const config = baseConfig(options); // Fully typed
```

## Usage

### Basic Configuration

```javascript
import { baseConfig } from '@front-utils/builder';

export default baseConfig({
  rootDir: process.cwd(),
  env: { production: process.env.NODE_ENV === 'production' },
  appDirName: 'my-app',
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
  rootDir: process.cwd(),
  env: { production: process.env.NODE_ENV === 'production' },
  appDirName: 'my-app',
}, {
  devServer: {
    port: 3000,
    hot: true,
  },
  plugins: [
    // Additional custom plugins
  ],
});
```

### Module Federation

```javascript
import { createMFConfig } from '@front-utils/builder';

const mfConfig = createMFConfig(
  {
    exposes: {
      './Button': './src/components/Button',
    },
    shared: ['react', 'react-dom'],
  },
  {
    name: 'my-app',
  }
);
```

### Custom Rules and Plugins

```javascript
import { getRules, getPlugins, generateFileName } from '@front-utils/builder';

const env = { production: false };
const rules = getRules(env, 'my-app');
const plugins = getPlugins(env);

// Generate asset filename
const filename = generateFileName({
  folder: 'images',
  appName: 'my-app',
  hashed: true,
});
```

### Browser Targets

You can specify browser targets for SWC and CSS transpilation:

```javascript
const browserTargets = {
  chrome: 83,
  safari: 14,
  firefox: 78,
};
```

## API Reference

### baseConfig(options)

Generates a complete Rspack configuration.

- `options.rootDir` (string): Root directory of the project.
- `options.env` (object): Environment settings with `production` boolean.
- `options.appDirName` (string): Application directory name.
- `options.browserTargets` (object, optional): Browser compatibility targets.
- `options.aliases` (object, optional): Module resolution aliases.
- `options.buildPath` (string, optional): Output build path.

### createConfig(params, config)

Creates a merged Rspack configuration by combining base config with custom config.

- `params` (ConfigOptions): The base configuration parameters.
- `config` (object): Additional configuration to merge with the base config.
- Returns: Merged Rspack configuration object.

### createMFConfig(config, options)

Creates a module federation configuration.

- `config` (object): Module federation options.
- `options.name` (string): Name of the federation module.

### getRules(env, appName, browserTargets)

Returns an array of Rspack rules.

- `env` (object): Environment with `production` boolean.
- `appName` (string): Application name.
- `browserTargets` (object, optional): Browser targets.

### getPlugins(env)

Returns an array of Rspack plugins.

- `env` (object): Environment with `production` boolean.

### generateFileName(options)

Generates asset filenames.

- `options.folder` (string): Asset folder.
- `options.ext` (string, optional): File extension.
- `options.hashed` (boolean, optional): Include hash (default: true).
- `options.appName` (string): Application name.

### getModuleGenerator()

Returns generator options for CSS modules.

### convertBrowserTargetsToSwcTargets(browserTargets)

Converts browser targets object to SWC target strings.

- `browserTargets` (object, optional): Object with browser names as keys and versions as values.
- Returns: Array of strings like `['chrome >= 83', 'safari >= 14']`.

## Peer Dependencies

- `@rspack/core`: ^1.5.x
- `@rspack/cli`: ^1.5.x
- `@rspack/plugin-react-refresh`: ^1.5.1

## License

ISC
