export const minLengthErrorMessage = (type: string, number: number) =>
	`${type} must be at least ${number} characters long.`;
export const maxLengthErrorMessage = (type: string, number: number) =>
	`${type} cannot be longer than ${number} characters.`;
