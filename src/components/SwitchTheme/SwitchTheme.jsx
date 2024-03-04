import { useEffect, useState } from 'react'

import s from './style.module.css'

const aboutButton = {
	id: ['light', 'dark'],
	text: ['Светлая тема', 'Темная тема'],
}

export const SwitchTheme = () => {
	const [light, setLight] = useState(false)
	const [dark, setDark] = useState(true)

	const stateTheme = [light, dark]

	useEffect(() => {
		const body = document.querySelector('body')
		body.classList.add('dark')
	}, [])

	const handleClickSwitchTheme = (e) => {
		const body = document.querySelector('body')

		const { id } = e.target
		if (id === 'light') {
			body.classList.remove('dark')
			body.classList.add('light')
			setLight(true)
			setDark(false)
		}
		if (id === 'dark') {
			body.classList.remove('light')
			body.classList.add('dark')
			setLight(false)
			setDark(true)
		}
	}

	return (
		<>
			<div className={s.groupBtn} onClick={handleClickSwitchTheme}>
				{aboutButton.id.map((id, index) => (
					<button
						className={
							s.button +
							' ' +
							s.switchBtn +
							' ' +
							(stateTheme[index] ? s.active + ' ' + s.inset : '')
						}
						id={id}
						key={id}
					>
						{aboutButton.text[index]}
					</button>
				))}
			</div>
		</>
	)
}
