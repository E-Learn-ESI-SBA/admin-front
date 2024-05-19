import { GET_GROUPS, GET_TEACHERS } from '@/config/urls/staff/queries';
import { cookies } from 'next/headers';
import { IResponse } from '@/types/http';
import { IError } from '@/types/errors';

type Users = {
	id: string;
	email: string;
};
export const getUsers = async (): Promise<IResponse<Users[]>> => {
	try {
		const response = await fetch(GET_TEACHERS, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
			},
		});
		const res = (await response.json()) as Users[];
		return {
			status: response.status,
			data: res,
			error: null,
		};
	} catch (e) {
		return {
			status: 500,
			error: new IError(e),
			data: [],
		};
	}
};

export const getGroups = async (): Promise<IResponse<string[]>> => {
	try {
		const response = await fetch(GET_GROUPS, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
			},
		});
		const res = (await response.json()) as string[];
		return {
			status: response.status,
			data: res,
			error: null,
		};
	} catch (e) {
		return {
			status: 500,
			error: new IError(e),
			data: [],
		};
	}
};
