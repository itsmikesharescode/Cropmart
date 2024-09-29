export interface Result<T> {
	status: number;
	type: string;
	data: T;
}
