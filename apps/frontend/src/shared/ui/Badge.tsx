export const Badge = ({
	status,
	children,
}: {
	status: string
	children: React.ReactNode
}) => {
	const colors: Record<string, string> = {
		NEW: 'bg-blue-50 text-blue-700 ring-blue-600/20',
		CONTACTED: 'bg-yellow-50 text-yellow-800 ring-yellow-600/20',
		IN_PROGRESS: 'bg-indigo-50 text-indigo-700 ring-indigo-600/20',
		WON: 'bg-green-50 text-green-700 ring-green-600/20',
		LOST: 'bg-red-50 text-red-700 ring-red-600/10',
	}

	return (
		<span
			className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${colors[status] || 'bg-gray-50 text-gray-600'}`}
		>
			{children}
		</span>
	)
}
