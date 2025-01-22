import React from 'react'
import QuestionItem from './QuestionItem'
import { useState } from 'react'


export default function Question({ data, isLoading }) {
	const [startQuiz, setStartQuiz] = useState(false)

	const handleStartQuiz = () => {
		setStartQuiz(true)
	}

	return (
		<div className='start wrapper'>
			{(!isLoading && !startQuiz) &&
			<div className='start__block' >
					<p className='start__text'> Questions are prepared, are you ready to start ? </p>
					<button className='start__btn'  onClick={handleStartQuiz}>START</button>
				</div>}


			{(!isLoading && data.length !== 0 && startQuiz) && <QuestionItem data={data}></QuestionItem>}
		</div>
	)
}
