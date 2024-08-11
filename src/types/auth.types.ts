export interface IAuthForm {
	email: string
	password: string
}

export interface IUser {
	id: number
	email: string
	name?: string

	workInterval?: number
	breakInterval?: number
	intervalsCount?: number
}

export interface IAuthResponse {
	accessToken: string
	user: IUser
}
