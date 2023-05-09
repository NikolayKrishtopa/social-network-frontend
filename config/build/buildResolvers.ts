import type webpack from 'webpack';

export default function buildResolvers (): webpack.ResolveOptions {
  return {
    extensions: ['.tsx', '.ts', '.js', '.css', '.scss']
  };
}
