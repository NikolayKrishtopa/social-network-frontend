import HtmlWebpackPlugin from 'html-webpack-plugin';
import miniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import { type BuildPaths } from './types/config';

export default function buildPlugins (
  paths: BuildPaths
): webpack.WebpackPluginInstance[] {
  return [
    new HtmlWebpackPlugin({
      title: 'advanced frontend react project',
      template: paths.htmlTemplate,
      filename: 'index.html'
    }),
    new webpack.ProgressPlugin(),
    new miniCssExtractPlugin({ filename: '[name].[contenthash:8].css', chunkFilename: '[name].[contenthash:8].css' })
  ];
}
