import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import s from './App.module.css'
import { useEffect, useState } from 'react'

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
	const [light, setLight] = useState(false)
	const [dark, setDark] = useState(true)

	useEffect(() => {
		const body = document.querySelector('body')
		body.classList.add(s.dark)
	}, [])

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

	const handleClickSwitchTheme = (e) => {
		const body = document.querySelector('body')

		const { id } = e.target
		if (id === 'light') {
			body.classList.remove(s.dark)
			body.classList.add(s.light)
			setLight(true)
			setDark(false)
		}
		if (id === 'dark') {
			body.classList.remove(s.light)
			body.classList.add(s.dark)
			setLight(false)
			setDark(true)
		}
	}

	const onSubmit = (formData) => {
		console.log('formData', formData)
		reset()
	}

	return (
		<>
			<div className={s.container}>
				<div className={s.header}>
					<h1 className={s.title}>Создайте аккаунт</h1>

					<div className={s.groupBtn} onClick={handleClickSwitchTheme}>
						<button
							className={
								s.button +
								' ' +
								s.switchBtn +
								' ' +
								(light ? s.active + ' ' + s.inset : '')
							}
							id='light'
						>
							Светлая тема
						</button>
						<button
							className={
								s.button +
								' ' +
								s.switchBtn +
								' ' +
								(dark ? s.active + ' ' + s.inset : '')
							}
							id='dark'
						>
							Тёмная тема
						</button>
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
							{...(errorsForm.confirmPassword === undefined &&
							watch('confirmPassword') !== ''
								? setFocus('submit')
								: '')}
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
