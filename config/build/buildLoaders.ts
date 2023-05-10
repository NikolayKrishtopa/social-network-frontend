import miniCssExtractPlugin from 'mini-css-extract-plugin';
import type webpack from 'webpack';
import { type BuildMode } from './types/config';

export default function buildLoaders(mode: BuildMode): webpack.RuleSetRule[] {
  const typescriptLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  };

  const sassLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      mode === 'production' ? miniCssExtractPlugin.loader : 'style-loader',
      {
        loader: 'css-loader',
        options: { 
          importLoaders: 1,
          modules: true, 
          sourceMap: true 
        },
      },
      'sass-loader',
    ],
  };

  const imgLoader = {
    test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
    type: 'asset/resource',
  };

  return [typescriptLoader, sassLoader, imgLoader];
}
