import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import iconGoogle from '../src/assets/icon-google.svg'

import s from './App.module.css'

const fieldScheme = yup.object().shape({
	email: yup
		.string()
		.required('Это поле не может быть пустым!')
		.matches(/[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/, 'Некорректный email'),
	password: yup
		.string()
		.required('Это поле не может быть пустым!')
		.matches(/^\d+$/, 'Пароль должен содержать только цифры!')
		.matches(/^\d{5,}$/, 'Пароль должен содержать не менее 5 цифр!')
		.matches(/^\d{0,8}$/, 'Пароль должен содержать не более 8 цифр!'),
	confirmPassword: yup
		.string()
		.required('Это поле не может быть пустым!')
		.oneOf([yup.ref('password'), null], 'Пароли не совпадают!'),
})

function App() {
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
		setFocus,
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
		resolver: yupResolver(fieldScheme),
		mode: 'onTouched',
	})

	const errorsForm = {
		email: errors.email?.message,
		password: errors.password?.message,
		confirmPassword: errors.confirmPassword?.message,
	}

	const onSubmit = (formData) => {
		console.log('formData', formData)
		reset()
	}

	return (
		<>
			<div className={s.container1}>
				<div className={s.header}>
					<h1 className={s.title}>Создайте аккаунт</h1>

					<div className={s.icons}>
						<div className={s.icon}>
							<img src={iconGoogle} alt='iconGoogle' />
						</div>
					</div>
					<div className='text'>
						<p>или используйте электронную почту для регистрации</p>
					</div>
				</div>

				<form className={s.form} onSubmit={handleSubmit(onSubmit)} noValidate>
					<div className={s.input_content}>
						<input
							type='email'
							name='email'
							className={
								s.input +
								' ' +
								(watch('email').length !== 0 ? s.isEmpty : '') +
								' ' +
								(errorsForm.email !== undefined ? s.error : '')
							}
							autoComplete='off'
							{...register('email')}
						/>
						<label className={s.label}>Электронная почта</label>
						{errorsForm.email && <div className={s.loginError}>{errorsForm.email}</div>}
					</div>

					<div className={s.input_content}>
						<input
							type='password'
							name='password'
							className={
								s.input +
								' ' +
								(watch('password').length !== 0 ? s.isEmpty : '') +
								' ' +
								(errorsForm.password !== undefined ? s.error : '')
							}
							autoComplete='off'
							{...register('password')}
						/>
						<label className={s.label}>Пороль</label>
						{errorsForm.password && (
							<div className={s.loginError}>{errorsForm.password}</div>
						)}
					</div>

					<div className={s.input_content}>
						<input
							type='password'
							name='confirmPassword'
							className={
								s.input +
								' ' +
								(watch('confirmPassword').length !== 0 ? s.isEmpty : '') +
								' ' +
								(errorsForm.confirmPassword !== undefined ? s.error : '')
							}
							autoComplete='off'
							{...register('confirmPassword')}
							{...errorsForm.confirmPassword === undefined ? setFocus('submit') : ''}
						/>
						<label className={s.label}>Повторите пароль</label>
						{errorsForm.confirmPassword && (
							<div className={s.loginError}>{errorsForm.confirmPassword}</div>
						)}
					</div>

					<button className={s.button} {...register('submit')} type='submit'>
						Зарегистрироваться
					</button>
				</form>
			</div>
		</>
	)
}

export default App
