import React from 'react';
import { type ProtectedRouteProps } from './ProtectedRoute.props';
import { useEffect } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';

export default function ProtectedRoute(props: ProtectedRouteProps) {
  const { isLogged } = useAppSelector((state) => state.auth);
  const { protectFrom } = props;

  const navigate = useNavigate();

  // check if allowed to show content or must redirect
  const isBlocked =
    (!isLogged && protectFrom === 'unlogged') ||
    (isLogged && protectFrom === 'logged');

  useEffect(() => {
    if (!isLogged && protectFrom === 'unlogged') navigate('/login');
    if (isLogged && protectFrom === 'logged') navigate('/profile');
  }, [isLogged]);
  return <>{!isBlocked && props.children}</>;
}
