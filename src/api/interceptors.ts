import axios, { type CreateAxiosDefaults } from 'axios'

import { errorRequestCatch } from './error-request'
import { authService } from '@/services/auth-service'
import {
	getAccessToken,
	removeFromStorage
} from '@/services/auth-token.service'

const options: CreateAxiosDefaults = {
	baseURL: 'http://localhost:4200/api',
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true
}

const axiosClassic = axios.create(options)
const axiosWithAuth = axios.create(options)
axiosWithAuth.interceptors.request.use(config => {
	const accessToken = getAccessToken()

	if (config?.headers && accessToken) {
		console.log(config)
		console.log(config.headers)
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	return config
})

axiosWithAuth.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config

		if (
			(error?.response?.status === 401 ||
				errorRequestCatch(error) === 'jwt expired' ||
				errorRequestCatch(error) === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				await authService.getNewTokens()
				return axiosWithAuth.request(originalRequest)
			} catch (error) {
				if (errorRequestCatch(error) === 'jwt expired') {
					removeFromStorage()
				}
			}
		}
		throw error
	}
)

export { axiosClassic, axiosWithAuth }
