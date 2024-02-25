import { useRef, useState } from 'react'

import iconGoogle from '../src/assets/icon-google.svg'

import s from './App.module.css'

const initialState = {
	email: '',
	password: '',
	confirmPassword: '',
}

const initialError = {
	email: null,
	password: null,
	confirmPassword: null,
}

const useStore = () => {
	const [state, setState] = useState(initialState)
	const [error, setError] = useState(initialError)

	return {
		getState: () => state,
		updateState: (field, newField) => setState({ ...state, [field]: newField }),
		resetForm: () => setState(initialState),
		getError: () => error,
		updateError: (field, newField) => setError({ ...error, [field]: newField }),
	}
}

const sendFormData = (formData) => {
	console.log(formData)
}

// =============================

function App() {
	const { getError, updateError, getState, updateState, resetForm } = useStore()

	const { email, password, confirmPassword } = getState()

	const submitButtonFocusRef = useRef(null)

	const onSubmit = (event) => {
		event.preventDefault()

		if (
			getState().email !== '' &&
			getState().password !== '' &&
			getState().confirmPassword !== '' &&
			getError().email === null &&
			getError().password === null &&
			getError().confirmPassword === null
		) {
			sendFormData(getState())
			resetForm()
		}
	}

	const onChange = ({ target }) => {
		let error = null

		if (target.value === '' && target.name === 'email') {
			error = 'Поле не может быть пустым!'
		} else if (
			!/[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/.test(target.value) &&
			target.name === 'email'
		) {
			error = 'Введите корректную почту!'
		}

		if (target.value === '' && target.name === 'password') {
			error = 'Поле не может быть пустым!'
		} else if (!/^\d+$/.test(target.value) && target.name === 'password') {
			error = 'Пороль должен быть из цифр!'
		} else if (!/^\d{5,}$/.test(target.value) && target.name === 'password') {
			error = 'Пароль должен содержать не менее 5 цифр!'
		} else if (!/^\d{0,8}$/.test(target.value) && target.name === 'password') {
			error = 'Пароль должен содержать не более 8 цифр!'
		}
		
		if (
			target.name === 'confirmPassword' &&
			target.value !== password &&
			getError().password === null
		) {
			error = 'Пароли не совпадают!'
		}

		if (
			target.name === 'confirmPassword' &&
			target.value === password &&
			target.value !== ''
		) {
			submitButtonFocusRef.current.focus()
		}

		updateError(target.name, error)

		return updateState(target.name, target.value)
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

				<form className={s.form} onSubmit={onSubmit}>
					<div className={s.input_content}>
						<input
							type='email'
							name='email'
							className={
								s.input +
								' ' +
								(getState().email.length !== 0 ? s.isEmpty : '') +
								' ' +
								(getError().email !== null ? s.error : '')
							}
							value={email}
							onChange={onChange}
							autoComplete='off'
						/>
						<label className={s.label}>Электронная почта</label>
						{getError().email && <div className={s.loginError}>{getError().email}</div>}
					</div>

					<div className={s.input_content}>
						<input
							type='password'
							name='password'
							className={
								s.input +
								' ' +
								(getState().password.length !== 0 ? s.isEmpty : '') +
								' ' +
								(getError().password !== null ? s.error : '')
							}
							value={password}
							onChange={onChange}
							autoComplete='off'
						/>
						<label className={s.label}>Пороль</label>
						{getError().password && (
							<div className={s.loginError}>{getError().password}</div>
						)}
					</div>

					<div className={s.input_content}>
						<input
							type='password'
							name='confirmPassword'
							className={
								s.input +
								' ' +
								(getState().confirmPassword.length !== 0 ? s.isEmpty : '') +
								' ' +
								(getError().confirmPassword !== null ? s.error : '')
							}
							value={confirmPassword}
							onChange={onChange}
							autoComplete='off'
						/>
						<label className={s.label}>Повторите пароль</label>
						{getError().confirmPassword && (
							<div className={s.loginError}>{getError().confirmPassword}</div>
						)}
					</div>

					<button className={s.button} type='submit' ref={submitButtonFocusRef}>
						Зарегистрироваться
					</button>
				</form>
			</div>
		</>
	)
}

export default App
