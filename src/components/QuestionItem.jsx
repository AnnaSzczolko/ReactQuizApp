import React, { useState, useCallback, useRef } from 'react'
import Timer from './Timer'
import Summary from './Summary'

export default function QuestionItem({ data }) {
	const correctAnswer = useRef()
	const [playersAnswers, setPlayersAnswers] = useState([])
	const [score, setScore] = useState(0)
	const [answerIsSelected, setAnswerIsSelected] = useState('')
	let showExplanation = false

	let time = 10000

	if (answerIsSelected === 'answered') {
		time = 1000
	}
	if (answerIsSelected === 'correct' || answerIsSelected === 'incorrect') {
		time = 4000
	}

	const activeQuestionIndex = answerIsSelected === '' ? playersAnswers.length : playersAnswers.length - 1
	const quizIsCompleted = activeQuestionIndex === data.length

	const handleCheckAnswer = useCallback(
		function handleCheckAnswer(selectedAnswer) {
			setAnswerIsSelected('answered')
			const isCorrect = checkAnswer(selectedAnswer)

			setPlayersAnswers(prevAnswers => {
				return [...prevAnswers, selectedAnswer]
			})

			setTimeout(() => {
				if (isCorrect === true) {
					setScore(prevValue => prevValue + 1)
					setAnswerIsSelected('correct')
				} else {
					correctAnswer.current = filteredAnswers[isCorrect][1]
					setAnswerIsSelected('incorrect')
				}

				setTimeout(() => {
					setAnswerIsSelected('')
				}, 4000)
			}, 1000)
		},
		[activeQuestionIndex]
	)

	function checkAnswer(selectedAnswer) {
		const answer = Object.entries(data[activeQuestionIndex].answers)
		const correctAnswer = Object.entries(data[activeQuestionIndex].correct_answers)
		const indexOfCorrectAnswer = Object.entries(data[activeQuestionIndex].correct_answers).findIndex(
			item => item[1] === 'true'
		)

		const indexOfSelectedAnswer = Object.entries(data[activeQuestionIndex].answers).findIndex(
			item => item[1] === selectedAnswer
		)
		if (indexOfCorrectAnswer === indexOfSelectedAnswer) {
			return true
		} else {
			return indexOfCorrectAnswer
		}
	}

	const handleSkipAnswer = useCallback(() => handleCheckAnswer(null), [handleCheckAnswer])

	if (quizIsCompleted) {
		return (
			<>
				<Summary score={score} questions={playersAnswers.length}></Summary>
			</>
		)
	}

	const filteredAnswers = Object.entries(data[activeQuestionIndex].answers).filter(item => item[1] !== null)

	return (
		<>
			<div className="quiz">
				<p className="quiz__count">
					Question <span> {activeQuestionIndex + 1}</span> /{data.length}
				</p>

				<h3 className="quiz__question">{data[activeQuestionIndex].question}</h3>
				<ul className="answer">
					{filteredAnswers.map(item => {
						const isSelected = playersAnswers[playersAnswers.length - 1] === item[1]

						let cssClass = ''
						if (answerIsSelected === 'answered' && isSelected) {
							cssClass = 'selected'
						} else if (answerIsSelected === 'correct' && isSelected) {
							cssClass = 'correct'
						} else if (answerIsSelected === 'incorrect' && isSelected) {
							cssClass = 'incorrect'
						}

						if (item[1] === correctAnswer.current) {
							cssClass = 'correct'
							showExplanation = true
						}

						return (
							<li className="quiz__answer" key={item[0]}>
								<button
									disabled={answerIsSelected !== '' && !isSelected}
									className={'quiz__btn ' + cssClass}
									onClick={() => handleCheckAnswer(item[1])}>
									{item[1]}
								</button>
							</li>
						)
					})}
				</ul>
				<div className="quiz__box">
					<Timer
						isSelected={answerIsSelected}
						timeout={time}
						onTimeout={answerIsSelected === '' ? handleSkipAnswer : null}
						key={time}></Timer>
				</div>
			</div>
			{showExplanation ? <p className="quiz__explanation">{data[activeQuestionIndex].explanation}</p> : null}
		</>
	)
}
