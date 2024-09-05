import { IAuthForm, IAuthResponse } from '@/types/auth.types'

import { axiosClassic } from '@/api/interceptors'

import { removeFromStorage, saveTokenStorage } from './auth-token.service'

export const authService = {
	async main(type: 'login' | 'register', data: IAuthForm) {
		console.log('Auth Service')
		const response = await axiosClassic.post<IAuthResponse>(
			`/auth/${type}`,
			data
		)
		debugger
		console.log('Auth Service 2', response)

		if (response.data.accessToken) saveTokenStorage(response.data.accessToken)
		return response
	},

	async getNewTokens() {
		const response = await axiosClassic.post<IAuthResponse>(
			'/auth/login/access-token'
		)
		if (response.data.accessToken) saveTokenStorage(response.data.accessToken)

		return response
	},
	async logout() {
		const response = await axiosClassic.post<boolean>('/auth/logout')
		if (response.data) removeFromStorage()

		return response
	}
}
