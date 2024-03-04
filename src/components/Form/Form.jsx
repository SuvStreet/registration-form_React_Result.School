import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import fieldScheme from '../../utils/yup.js'

import { Input } from '../Input/Input.jsx'
import { SwitchTheme } from '../SwitchTheme/SwitchTheme.jsx'

import s from './style.module.css'

function Form() {
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
			<div className={s.container}>
				<div className={s.header}>
					<h1 className={s.title}>Создайте аккаунт</h1>

					<SwitchTheme />

					<div className='text'>
						<p>или используйте электронную почту для регистрации</p>
					</div>
				</div>

				<form className={s.form} onSubmit={handleSubmit(onSubmit)} noValidate>
					<Input {...{ register, errorsForm, watch, setFocus }} />

					{/* <div className={s.input_content}>
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
							watch('confirmPassword') === watch('password') &&
							watch('password').length !== 0
								? setFocus('submit')
								: '')}
						/>
						<label className={s.label}>Повторите пароль</label>
						{errorsForm.confirmPassword && (
							<div className={s.loginError}>{errorsForm.confirmPassword}</div>
						)}
					</div> */}

					<button className={s.button} {...register('submit')} type='submit'>
						Зарегистрироваться
					</button>
				</form>
			</div>
		</>
	)
}

export default Form
