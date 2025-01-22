import React from 'react'
import { useState } from 'react'

export default function Summary({ score, questions }) {

	return (
		<div className="summary">
			<h2 className='summary__title'> Congratulations!</h2>
			<p className='summary__text'>You ended the quiz!</p>
			<p className='summary__text'>
				Your results is {score}/{questions}
			</p>

		</div>
	)
}
