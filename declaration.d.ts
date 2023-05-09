declare module '*.scss';

declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.svg' {
  const value: any;
  export default value;
}
