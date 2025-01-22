import React, { useEffect, useState } from 'react'

export default function Timer({ timeout, onTimeout, isSelected }) {
	const [remainigTime, setRemainingTime] = useState(timeout)

	useEffect(() => {
		const timer = setTimeout(onTimeout, timeout)

		return () => {
			clearTimeout(timer)
		}
	}, [timeout, onTimeout])

	useEffect(() => {
		const interval = setInterval(() => {
			setRemainingTime(prevTime => prevTime - 100)
		}, 100)

		return () => {
			clearInterval(interval)
		}
	}, [])

	if (!isSelected) {
		return <progress id="question-time" max={timeout} value={remainigTime}></progress>
	}
}
