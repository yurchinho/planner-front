import { IBase } from './root.types'

export interface ITimeBlockResponse extends IBase {
	name: string
	color?: string
	duration: number
	order: string
}
export type TypeTimeBlockFormState = Partial<
	Omit<ITimeBlockResponse, 'createdAt' | 'updatedAt'>
>
