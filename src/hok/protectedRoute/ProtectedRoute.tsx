import React from 'react';
import { type ProtectedRouteProps } from './ProtectedRoute.props';
import Layout from '../Layout/Layout';
import { useEffect } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';

export default function ProtectedRoute (props: ProtectedRouteProps) {
  const { isLogged } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) navigate('/auth');
  }, [isLogged]);
  return <Layout {...props}>{isLogged && props.children}</Layout>;
}
