import React from 'react';
import s from './Entry.module.scss';
import validatePassword from '../../utils/validatePassword';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { UserType } from '../../models/models';
import cn from 'classnames';
import { regUser } from '../../store/slices/authSlice';

export default function Register() {
  const dispatch = useAppDispatch();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<UserType>({ mode: 'onChange' });

  const onSubmitRegister: SubmitHandler<UserType> = async (data) => {
    await dispatch(regUser(data));
    reset();
  };

  return (
    <section className={s.section}>
      <form
        className={s.form + ' ' + s.registerForm}
        onSubmit={handleSubmit(onSubmitRegister)}
      >
        <label className={s.label}>
          <input
            type='text'
            placeholder='Имя'
            className={s.input}
            {...register('name', {
              required: 'Обязательное поле',
              minLength: {
                value: 3,
                message: 'Минимальная длина 3 символа',
              },
              maxLength: {
                value: 30,
                message: 'Максимальная длина 30 символов',
              },
            })}
          />
          <p className={s.error}>{errors?.name?.message}</p>
        </label>
        <label className={s.label}>
          <input
            type='text'
            placeholder='Город'
            className={s.input}
            {...register('city', {
              required: 'Обязательное поле',
              minLength: {
                value: 3,
                message: 'Минимальная длина 3 символа',
              },
              maxLength: {
                value: 30,
                message: 'Максимальная длина 30 символов',
              },
            })}
          />
          <p className={s.error}>{errors?.city?.message}</p>
        </label>
        <label className={s.label}>
          <input
            type='text'
            placeholder='Учебное заведение'
            className={s.input}
            {...register('college', {
              required: 'Обязательное поле',
              minLength: {
                value: 3,
                message: 'Минимальная длина 3 символа',
              },
              maxLength: {
                value: 30,
                message: 'Максимальная длина 30 символов',
              },
            })}
          />
          <p className={s.error}>{errors?.college?.message}</p>
        </label>
        <label className={s.label}>
          <input
            type='text'
            placeholder='Ваш пол'
            className={s.input}
            {...register('gender', {
              required: 'Обязательное поле',
              minLength: {
                value: 3,
                message: 'Минимальная длина 3 символа',
              },
              maxLength: {
                value: 30,
                message: 'Максимальная длина 30 символов',
              },
            })}
          />
          <p className={s.error}>{errors?.gender?.message}</p>
        </label>
        <label className={s.label}>
          <input
            type='text'
            placeholder='Ссылка на аватар'
            className={s.input}
            {...register('avatar', {
              required: 'Обязательное поле',
              pattern: /[^a-z0-9_\-.]/,
            })}
          />
          <p className={s.error}>
            {errors.avatar &&
              (errors?.avatar?.message || 'Укажите корректный адрес URL')}
          </p>
        </label>
        <label className={s.label}>
          <input
            type='text'
            placeholder='Адрес электронной почты'
            className={s.input}
            {...register('email', {
              required: 'Обязательное поле',
              pattern:
                /^((([0-9A-Za-z]{1}[-0-9A-z.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я.]{0,30}[0-9А-Яа-я]?))@([-A-Za-z]{1,}\.){1,}[-A-Za-z]{2,})$/,
            })}
          />
          <p className={s.error}>
            {errors.email &&
              (errors?.email?.message ||
                'Укажите корректный адрес электронной почты')}
          </p>
        </label>
        <label className={s.label}>
          <input
            type='password'
            placeholder='Пароль'
            className={s.input}
            {...register('password', {
              required: 'Обязательное поле',
              validate: validatePassword,
            })}
          />
          <p className={s.error}>
            {errors.password &&
              (errors?.password?.message ||
                'от 8 до 20 символов, минимум две цифры, минимум одна заглавная латинская буква')}
          </p>
        </label>
        <button className={cn(s.button, { [s.inactiveBtn]: !isValid })}>
          Зарегистрироваться
        </button>
      </form>
    </section>
  );
}
