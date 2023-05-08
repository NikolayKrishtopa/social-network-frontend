import { type DetailedHTMLProps, type HTMLAttributes, type ReactNode } from 'react';

export interface LayoutProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode
  metaKeyWords: string
  title: string
  withForm: boolean
}
