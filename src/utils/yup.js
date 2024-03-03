import * as yup from 'yup'

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

export default fieldScheme 
