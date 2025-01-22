import React from 'react'
import QuizImg from '../img/quiz1.png'

export default function Header() {
	return (
		<>
			<header className="header">
				<h1 className="header__title"> Welcome in React Quiz!</h1>
				<img className="header__img" src={QuizImg} alt="Logo App" />
			</header>
		</>
	)
}
