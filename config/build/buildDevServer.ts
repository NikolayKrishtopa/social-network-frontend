import path from 'path';
import { type BuildOptions } from './types/config';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

export default function buildDevServer (
  options: BuildOptions
): DevServerConfiguration {
  return {
    static: options.paths.build,
    open: true,
    compress: true,
    port: options.port,
    historyApiFallback: true
  };
}
