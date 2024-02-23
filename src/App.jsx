import { useState } from 'react'

import iconGoogle from '../src/assets/icon-google.svg'

import s from './App.module.css'

const initialState = {
	email: '',
	password: '',
	confirmPassword: '',
}

const sendFormData = (formData) => {
	console.log(formData)
}

const useStore = () => {
	const [state, setState] = useState(initialState)

	return {
		getState: () => state,
		updateState: (field, newField) => setState({ ...state, [field]: newField }),
	}
}

function App() {
	const { getState, updateState } = useStore()

	const onSubmit = (event) => {
		event.preventDefault()
		sendFormData(getState())
	}

	const { email, password, confirmPassword } = getState()

	const onChange = ({ target }) => {
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
							className={s.input + ' ' + (getState().email.length !== 0 ? s.isEmpty : '')}
							value={email}
							onChange={onChange}
						/>
						<label className={s.label}>Электронная почта</label>
					</div>

					<div className={s.input_content}>
						<input
							type='password'
							name='password'
							className={
								s.input + ' ' + (getState().password.length !== 0 ? s.isEmpty : '')
							}
							value={password}
							onChange={onChange}
						/>
						<label className={s.label}>Пороль</label>
					</div>

					<div className={s.input_content}>
						<input
							type='password'
							name='confirmPassword'
							className={
								s.input + ' ' + (getState().confirmPassword.length !== 0 ? s.isEmpty : '')
							}
							value={confirmPassword}
							onChange={onChange}
						/>
						<label className={s.label}>Повторите пароль</label>
					</div>

					<button className={s.button} type='submit'>
						Зарегистрироваться
					</button>
				</form>
			</div>
		</>
	)
}

export default App
