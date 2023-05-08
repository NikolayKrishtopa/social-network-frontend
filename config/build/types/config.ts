export type BuildMode = 'development' | 'production'
export interface BuildPaths {
  entry: string
  build: string
  htmlTemplate: string
}

export interface BuildOptions {
  mode: BuildMode
  paths: BuildPaths
  port: number
}

export interface EnvObj {
  mode: BuildMode
  port: number
}
