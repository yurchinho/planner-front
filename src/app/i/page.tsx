import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Dash',
	...NO_INDEX_PAGE
}
export default function Page() {
	return <div>Dashboard</div>
}
