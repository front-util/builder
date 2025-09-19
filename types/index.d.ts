import type { Configuration, RuleSetRule, Plugin, GeneratorOptionsByModuleType, ModuleFederationPluginOptions, DevServer } from '@rspack/core';

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
}

export interface MFConfigOptions {
  name: string;
  deps?: Record<string, string>;
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
export function createMFConfig(config: Partial<ModuleFederationPluginOptions>, options: MFConfigOptions): ModuleFederationPluginOptions;
export function getRules(env: Env, appName: string, browserTargets?: Record<string, number>): RuleSetRule[];
export function getPlugins(env: Env): Plugin[];
export function generateFileName(options: GenerateFileNameOptions): string | undefined;
export function getModuleGenerator(): GeneratorOptionsByModuleType;
export function convertBrowserTargetsToSwcTargets(browserTargets?: Record<string, number>): string[];

// Additional types that might be useful
export interface DevServerOptions extends Partial<DevServer> {}

export function createDevServer(port: number, config?: DevServerOptions): DevServer;
