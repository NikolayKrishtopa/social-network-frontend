import React from 'react';
import s from './Entry.module.scss';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { login } from '../../store/slices/authSlice';
import { useForm, SubmitHandler } from 'react-hook-form';
import { UserLoginType } from '../../models/models';
import validatePassword from '../../utils/validatePassword';
import cn from 'classnames';

export default function Login(){
  
  const dispatch = useAppDispatch();
  
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<UserLoginType>({ mode: 'onChange' });

  const onSubmitLogin: SubmitHandler<UserLoginType> = async (data) => {
    await dispatch(login(data));
    reset();
  };

  return(
    <section className={s.section}>
      <form className={s.form} onSubmit={handleSubmit(onSubmitLogin)}>
        <label className={s.label}>
          <input type="text" 
            placeholder="Адрес электронной почты" 
            {...register('email', {
              required: 'Обязательное поле',
              minLength: {
                value: 3,
                message: 'Минимальная длина 3 символа',
              },
              maxLength: {
                value: 30,
                message: 'Максимальная длина 30 символов',
              },
            })}className={s.input} />
          <p className={s.error}>{errors?.email?.message}</p>
        </label>
        <label className={s.label}>
          <input type="password" 
            placeholder="Пароль" 
            className={s.input} 
            {...register('password', {
              required: 'Обязательное поле',
              // validate: validatePassword,
            })}/>
          <p className={s.error}> 
            {errors.password && 
              (errors?.password?.message ||
                'от 8 до 20 символов, минимум две цифры, минимум одна заглавная латинская буква')}</p>
        </label>
        <button className={cn(s.button, { [s.inactiveBtn]: !isValid })}>
          Войти
        </button>
      </form>
    </section>
  );}