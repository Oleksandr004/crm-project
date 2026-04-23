'use client'

import { useState, useEffect, useCallback } from 'react'
import { apiClient } from '@/src/shared/api/base'

interface Comment {
	id: string
	text: string
	createdAt: string
}

export const CommentsSectionWidget = ({ leadId }: { leadId: string }) => {
	const [commentText, setCommentText] = useState('')
	const [comments, setComments] = useState<Comment[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [isSubmitting, setIsSubmitting] = useState(false)

	const fetchComments = useCallback(
		async (signal?: AbortSignal) => {
			try {
				const data = await apiClient<Comment[]>(`/leads/${leadId}/comments`, {
					signal,
				})

				const sortedComments = [...data].sort(
					(a, b) =>
						new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
				)

				setComments(sortedComments)
			} catch (error: any) {
				if (error.name === 'AbortError') return
				console.error('Помилка завантаження коментарів:', error)
			} finally {
				setIsLoading(false)
			}
		},
		[leadId],
	)

	useEffect(() => {
		const controller = new AbortController()

		setIsLoading(true)
		setComments([])

		fetchComments(controller.signal)

		return () => controller.abort()
	}, [leadId, fetchComments])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const text = commentText.trim()

		if (text.length > 0 && text.length <= 500) {
			try {
				setIsSubmitting(true)
				await apiClient(`/leads/${leadId}/comments`, {
					method: 'POST',
					body: JSON.stringify({ text }),
				})

				setCommentText('')
				await fetchComments()
			} catch (error) {
				alert('Не вдалося відправити коментар')
			} finally {
				setIsSubmitting(false)
			}
		}
	}

	return (
		<div className='space-y-6'>
			<h3 className='text-lg font-medium text-gray-900'>Коментарі</h3>

			<form onSubmit={handleSubmit} className='relative'>
				<div className='overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600'>
					<textarea
						rows={3}
						disabled={isSubmitting}
						className='block w-full resize-none border-0 bg-transparent py-3 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 disabled:bg-gray-50'
						placeholder='Напишіть коментар...'
						value={commentText}
						maxLength={500}
						onChange={(e) => setCommentText(e.target.value)}
					/>

					<div className='flex justify-between items-center py-2 px-3 bg-gray-50 border-t border-gray-200'>
						<span
							className={`text-xs ${commentText.length >= 500 ? 'text-red-500' : 'text-gray-500'}`}
						>
							{commentText.length}/500
						</span>
						<button
							type='submit'
							disabled={!commentText.trim() || isSubmitting}
							className='inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:bg-gray-300 cursor-pointer'
						>
							{isSubmitting ? '...' : 'Надіслати'}
						</button>
					</div>
				</div>
			</form>

			<div className='flow-root'>
				{isLoading ? (
					<p className='text-sm text-gray-500 text-center py-4'>
						Завантаження...
					</p>
				) : comments.length === 0 ? (
					<p className='text-sm text-gray-400 text-center py-4'>
						Коментарів ще немає
					</p>
				) : (
					<ul role='list' className='-mb-8'>
						{comments.map((comment, idx) => (
							<li key={comment.id}>
								<div className='relative pb-8'>
									{idx !== comments.length - 1 && (
										<span
											className='absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200'
											aria-hidden='true'
										/>
									)}
									<div className='relative flex items-start space-x-3'>
										<div className='flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 ring-8 ring-white text-indigo-600'>
											<span className='text-xs font-bold'>CRM</span>
										</div>
										<div className='min-w-0 flex-1'>
											<div>
												<div className='text-sm font-medium text-gray-900'>
													Менеджер
												</div>
												<p className='mt-0.5 text-xs text-gray-500'>
													{new Date(comment.createdAt).toLocaleString('uk-UA')}
												</p>
											</div>
											<div className='mt-2 text-sm text-gray-700 wrap-break-word'>
												<p>{comment.text}</p>
											</div>
										</div>
									</div>
								</div>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	)
}
