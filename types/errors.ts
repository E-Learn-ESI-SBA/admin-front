export class IError extends Error {
	public message: string;
	public status?: number = 500;
	stack?: string;
	constructor(e: unknown) {
		super();
		if (e instanceof Error) {
			this.message = e.message;
			this.stack = e.stack;
		} else {
			this.message = e?.hasOwnProperty('message')
				? (e as { message: string }).message
				: e?.hasOwnProperty('error')
					? (e as { error: string }).error
					: 'An error occurred';
		}
	}
	get stackTrace() {
		return this.stack;
	}
	set stackTrace(value) {
		this.stack = value;
	}
	set setStatus(value: number) {
		this.status = value;
	}
	get getStatus() {
		return this.status;
	}
	get getMessage() {
		return this.message;
	}
	set setMessage(value: string) {
		this.message = value;
	}
}
