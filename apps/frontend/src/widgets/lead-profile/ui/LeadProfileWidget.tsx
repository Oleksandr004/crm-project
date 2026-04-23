'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { apiClient } from '@/src/shared/api/base'

interface Lead {
	id: string
	name: string
	email?: string
	company?: string
	status: 'NEW' | 'CONTACTED' | 'IN_PROGRESS' | 'WON' | 'LOST'
	value?: number
	notes?: string
}

interface LeadProfileWidgetProps {
	leadId: string
	initialData: Lead | null
}

export const LeadProfileWidget = ({
	leadId,
	initialData,
}: LeadProfileWidgetProps) => {
	const router = useRouter()
	const [isEditing, setIsEditing] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [isDeleting, setIsDeleting] = useState(false)

	const [formData, setFormData] = useState<Partial<Lead>>(initialData || {})

	const handleSave = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)

		try {
			await apiClient(`/leads/${leadId}`, {
				method: 'PATCH',
				body: JSON.stringify(formData),
			})

			setIsEditing(false)
			router.refresh()
		} catch (error) {
			alert('Помилка при збереженні: ' + (error as Error).message)
		} finally {
			setIsLoading(false)
		}
	}

	const handleDelete = async () => {
		if (!confirm('Ви впевнені, що хочете видалити цього ліда?')) return

		setIsDeleting(true)
		try {
			await apiClient(`/leads/${leadId}`, {
				method: 'DELETE',
			})

			router.push('/leads')
			router.refresh()
		} catch (error) {
			alert('Помилка при видаленні: ' + (error as Error).message)
			setIsDeleting(false)
		}
	}

	if (!initialData) return null

	return (
		<div className='bg-white shadow sm:rounded-lg border border-gray-200'>
			<div className='px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200'>
				<div>
					<h3 className='text-base font-semibold leading-6 text-gray-900'>
						Основна інформація
					</h3>
					<p className='mt-1 text-sm text-gray-500'>
						Деталі клієнта та поточний статус угоди.
					</p>
				</div>

				<div className='flex gap-4'>
					{!isEditing && (
						<button
							onClick={handleDelete}
							disabled={isDeleting}
							className='text-sm font-semibold text-red-600 hover:text-red-500 disabled:opacity-50 cursor-pointer'
						>
							{isDeleting ? 'Видалення...' : 'Видалити'}
						</button>
					)}

					<button
						onClick={() => setIsEditing(!isEditing)}
						className='text-sm font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer'
					>
						{isEditing ? 'Скасувати' : 'Редагувати'}
					</button>
				</div>
			</div>

			<div className='px-4 py-5 sm:p-6'>
				<form
					onSubmit={handleSave}
					className='grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'
				>
					<div className='sm:col-span-3'>
						<label className='block text-sm font-medium text-gray-700'>
							Ім&apos;я *
						</label>
						<input
							type='text'
							required
							disabled={!isEditing || isLoading}
							value={formData.name || ''}
							onChange={(e) =>
								setFormData({ ...formData, name: e.target.value })
							}
							className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-50'
						/>
					</div>

					<div className='sm:col-span-3'>
						<label className='block text-sm font-medium text-gray-700'>
							Email
						</label>
						<input
							type='email'
							disabled={!isEditing || isLoading}
							value={formData.email || ''}
							onChange={(e) =>
								setFormData({ ...formData, email: e.target.value })
							}
							className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-50'
						/>
					</div>

					<div className='sm:col-span-2'>
						<label className='block text-sm font-medium text-gray-700'>
							Компанія
						</label>
						<input
							type='text'
							disabled={!isEditing || isLoading}
							value={formData.company || ''}
							onChange={(e) =>
								setFormData({ ...formData, company: e.target.value })
							}
							className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-50'
						/>
					</div>

					<div className='sm:col-span-2'>
						<label className='block text-sm font-medium text-gray-700'>
							Цінність (USD)
						</label>
						<input
							type='number'
							disabled={!isEditing || isLoading}
							value={formData.value || ''}
							onChange={(e) =>
								setFormData({ ...formData, value: Number(e.target.value) })
							}
							className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-50'
						/>
					</div>

					<div className='sm:col-span-2'>
						<label className='block text-sm font-medium text-gray-700'>
							Статус
						</label>
						<select
							disabled={!isEditing || isLoading}
							value={formData.status}
							onChange={(e) =>
								setFormData({
									...formData,
									status: e.target.value as Lead['status'],
								})
							}
							className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-50'
						>
							<option value='NEW'>New</option>
							<option value='CONTACTED'>Contacted</option>
							<option value='IN_PROGRESS'>In Progress</option>
							<option value='WON'>Won</option>
							<option value='LOST'>Lost</option>
						</select>
					</div>

					<div className='sm:col-span-6'>
						<label className='block text-sm font-medium text-gray-700'>
							Нотатки
						</label>
						<textarea
							rows={3}
							disabled={!isEditing || isLoading}
							value={formData.notes || ''}
							onChange={(e) =>
								setFormData({ ...formData, notes: e.target.value })
							}
							className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-50'
						/>
					</div>

					{isEditing && (
						<div className='sm:col-span-6 flex justify-end gap-3'>
							<button
								type='submit'
								disabled={isLoading}
								className='inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 cursor-pointer'
							>
								{isLoading ? 'Збереження...' : 'Зберегти зміни'}
							</button>
						</div>
					)}
				</form>
			</div>
		</div>
	)
}
