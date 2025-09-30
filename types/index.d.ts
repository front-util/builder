import type { Configuration, RuleSetRule, Plugin, GeneratorOptionsByModuleType, ModuleFederationPluginOptions, DevServer } from '@rspack/core';
import type { CommonRetryOptions } from '@module-federation/retry-plugin';

export interface Env {
  production?: boolean;
  development?: boolean;
}

export interface ConfigOptions {
  rootDir: string;
  env: Env;
  appDirName: string;
  browserTargets?: Record<string, number>;
  aliases?: Record<string, string>;
  buildPath?: string;
  overlay?: boolean;
}

export interface MFConfigOptions {
  name: string;
  deps?: Record<string, string>;
  retry?: boolean;
}

export interface GenerateFileNameOptions {
  folder: string;
  ext?: string;
  hashed?: boolean;
  appName: string;
}

export const ASSET_DIR_NAME: string;
export const LIBS_PATH: string;

export function baseConfig(options: ConfigOptions): Configuration;
export function createConfig(params: ConfigOptions, config: Partial<Configuration>): Configuration;
export function createMFConfig(config: Partial<ModuleFederationPluginOptions>, options: MFConfigOptions): ModuleFederationPluginOptions;
export function getRules(env: Env, appName: string, browserTargets?: Record<string, number>): RuleSetRule[];
export function getPlugins(env: Env, overlay?: boolean): Plugin[];
export function generateFileName(options: GenerateFileNameOptions): string | undefined;
export function getModuleGenerator(): GeneratorOptionsByModuleType;
export function convertBrowserTargetsToSwcTargets(browserTargets?: Record<string, number>): string[];

// Additional types that might be useful
export interface DevServerOptions extends Partial<DevServer> {}

export function createDevServer(port: number, config?: DevServerOptions): DevServer;
