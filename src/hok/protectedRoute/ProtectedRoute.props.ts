import { ReactElement } from 'react';

export interface ProtectedRouteProps {
	protectFrom: 'logged' | 'unlogged'
	children: ReactElement
}
