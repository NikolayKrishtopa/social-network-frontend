import { type ProtectedRouteProps } from './ProtectedRoute.props';
import Layout from '@/hok/Layout/Layout';
import { useEffect } from 'react';
import { useAppSelector } from '@/hooks/reduxHooks';
import Router from 'next/router';

export default function ProtectedRoute (props: ProtectedRouteProps) {
  const { isLogged } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isLogged) Router.push('/auth');
  }, [isLogged]);
  return <Layout {...props}>{isLogged && props.children}</Layout>;
}
