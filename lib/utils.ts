import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
export function capitalize(
	wd: string,
	separator: '_' | '-' | ' ' = '_',
	option?: {
		plural: {
			count: number;
		};
	}
) {
	// write function that capitalize the first letter of each word
	const arr = wd.split(separator);
	// make last one plural
	if (option && option.plural.count > 1) {
		arr[arr.length - 1] = pluralize(arr[arr.length - 1], option.plural.count);
	}
	return arr
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}

export function tableDisplayHeader<T>(
	headers: {
		title: string;
		accessorKey: keyof T;
	}[],
	key: keyof T
) {
	let header = headers.find((h) => h.accessorKey === key);
	return header ? header.title : key;
}

export const timeUnitHandler = (time: number, unit: 'Min' | 'Hour' | 'Day') => {
	return time + ' ' + unit + (time > 1 ? 's' : '');
};
export function pluralize(word: string, count: number): string {
	// If count is 1, return the word as is
	if (count === 1) {
		return word;
	}

	// Words ending in 's', 'x', 'z', 'ch', or 'sh' add 'es' in plural form
	if (
		word.endsWith('s') ||
		word.endsWith('x') ||
		word.endsWith('z') ||
		word.endsWith('ch') ||
		word.endsWith('sh')
	) {
		return word + 'es';
	}

	// Words ending in 'y' preceded by a consonant, replace 'y' with 'ies'
	if (word.endsWith('y') && !'aeiou'.includes(word[word.length - 2])) {
		return word.slice(0, -1) + 'ies';
	}

	// For other cases, simply add 's' to make it plural
	return word + 's';
}

export function numberToText(num: number): string {
	switch (num) {
		case 1:
			return 'Once';
		case 2:
			return 'Twice';
		case 3:
			return 'Thrice';
		default:
			return `${num} times`;
	}
}

//// start auth

function base64UrlDecode(str: string): string {
	let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
	while (base64.length % 4) {
		base64 += '=';
	}
	return atob(base64);
}

interface DecodedToken {
	header: object;
	payload: {
		email: string;
		user_id: number;
		exp: number;
		iat: number;
	};
	signature: string;
}

export function decodeJwt(token: string): DecodedToken {
	const [header, payload, signature] = token.split('.');

	const decodedHeader = JSON.parse(base64UrlDecode(header));
	const decodedPayload = JSON.parse(base64UrlDecode(payload));

	return {
		header: decodedHeader,
		payload: decodedPayload,
		signature,
	};
}

//// end auth
