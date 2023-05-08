import path from 'path';
import type webpack from 'webpack';
import buildWebpackConfig from './config/build/buildWebpackConfig';
import { type EnvObj, type BuildMode, type BuildPaths } from './config/build/types/config';

export default (env: EnvObj) => {
  const mode: BuildMode = env.mode || 'development';
  const PORT = env.port || 3000;
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    build: path.resolve(__dirname, 'dist'),
    htmlTemplate: path.resolve(__dirname, 'public', 'index.html')
  };

  const config: webpack.Configuration = buildWebpackConfig({
    mode,
    paths,
    port: PORT
  });

  return config;
};
