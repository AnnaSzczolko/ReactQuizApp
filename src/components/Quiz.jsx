import React from 'react'

export default function Quiz({ question, answers }) {
	const { answer_a, answer_b, answer_c, answer_d } = answers
	return (
		<div className="quizItem">
			<h3>{question}</h3>
			<ul>
				<li>{answer_a}</li>
				<li>{answer_b}</li>
				<li>{answer_c}</li>
				<li>{answer_d}</li>

				{Object.entries(answers).map(([key, value]) => (
					<li key={Math.random()}>{value}</li>
				))}
			</ul>
		</div>
	)
}
