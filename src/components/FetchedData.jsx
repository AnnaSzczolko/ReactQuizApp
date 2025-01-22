import React, { useEffect, useState } from 'react'
import Question from './Question'
import ErrorMessage from './ErrorMessage'

export default function FetchedData() {
	const [isFetching, setIsFetching] = useState(false)

	const [loadedQuestion, setLoadedQuestion] = useState([])
	const [error, setError] = useState()

	const API_KEY = 'r37SjcGphFmBk7FJucN5Sza19AcktA6ws8KCKDtU'
	const difficulty = 'easy'
	const limit = '4'

	useEffect(() => {
		async function fetchData() {
			setIsFetching(true)

			try {
				const response = await fetch(
	
					`https://quizapi.io/api/v1/questions?apiKey=${API_KEY}&category=react&difficulty=${difficulty}&limit=${limit}`
				)
				if (!response.ok) {
					const error = new Error('Failed to fetch data, please try again later')
					throw error
				}
				const resData = await response.json()

				setLoadedQuestion(resData)
			} catch (error) {
				setError(error)
			}

			setIsFetching(false)
		}

		fetchData()
	}, [])

	if (error) {
		return <ErrorMessage title={'Some problems'} message={error.message}></ErrorMessage>
	}

	return (
		<div className="entrance">
			{isFetching && <p className="entrance__text"> Please wait, we are preparing questions for you! </p>}

			{!error && <Question data={loadedQuestion} isLoading={isFetching}></Question>}
		</div>
	)
}
