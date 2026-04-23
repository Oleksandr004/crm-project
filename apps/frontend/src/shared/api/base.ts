// Серверный URL (без NEXT_PUBLIC_ — не попадает в бандл)
const SERVER_API_URL = process.env.API_URL || 'http://localhost:5000/api'

// Клиентский URL
const CLIENT_API_URL =
	process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

const API_URL = typeof window === 'undefined' ? SERVER_API_URL : CLIENT_API_URL

export const apiClient = async <T>(
	endpoint: string,
	options: RequestInit = {},
): Promise<T> => {
	const response = await fetch(`${API_URL}${endpoint}`, {
		...options,
		headers: {
			'Content-Type': 'application/json',
			...options.headers,
		},
	})

	if (!response.ok) {
		const error = await response.json().catch(() => ({}))
		throw new Error(error.message || 'Помилка запиту до API')
	}

	return response.json()
}
