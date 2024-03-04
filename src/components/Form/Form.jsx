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
					
					<button className={s.button} {...register('submit')} type='submit'>
						Зарегистрироваться
					</button>
				</form>
			</div>
		</>
	)
}

export default Form
