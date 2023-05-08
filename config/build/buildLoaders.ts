import miniCssExtractPlugin from 'mini-css-extract-plugin';
import type webpack from 'webpack';
import { type BuildMode } from './types/config';

export default function buildLoaders (mode: BuildMode): webpack.RuleSetRule[] {
  const typescriptLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/
  };

  const sassLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      mode === 'production' ? miniCssExtractPlugin.loader : 'style-loader',
      {
        loader: 'css-loader',
        options: { modules: true }
      },
      'sass-loader'
    ]
  };

  return [
    typescriptLoader,
    sassLoader
  ];
}
