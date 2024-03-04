import PropTypes from 'prop-types'

import s from './style.module.css'

const aboutInput = {
	type: ['email', 'password', 'password'],
	name: ['email', 'password', 'confirmPassword'],
	text: ['Электронная почта', 'Пароль', 'Подтвердите пароль'],
}

export const Input = ({ register, errorsForm, watch, setFocus }) => {
	const Focus = () => {
		const { email, password, confirmPassword } = errorsForm

		if (
			email === undefined &&
			password === undefined &&
			confirmPassword === undefined &&
			watch('confirmPassword') === watch('password') &&
			watch('password').length !== 0
		) {
			setFocus('submit')
		}
	}

	return (
		<>
			{aboutInput.type.map((type, index) => (
				<div className={s.input_content} key={index}>
					<input
						type={type}
						name={aboutInput.name[index]}
						className={
							s.input +
							' ' +
							(watch(aboutInput.name[index]).length !== 0 ? s.isEmpty : '') +
							' ' +
							(errorsForm[aboutInput.name[index]] !== undefined ? s.error : '')
						}
						autoComplete='off'
						{...register(aboutInput.name[index])}
						{...Focus()}
					/>
					<label className={s.label}>{aboutInput.text[index]}</label>
					{errorsForm[aboutInput.name[index]] && (
						<div className={s.loginError}>{errorsForm[aboutInput.name[index]]}</div>
					)}
				</div>
			))}
		</>
	)
}

Input.propTypes = {
	register: PropTypes.func,
	errorsForm: PropTypes.object,
	watch: PropTypes.func,
	setFocus: PropTypes.func,
}
