import { animalWords, foodWords, nounWords, verbWords } from '@/data/words';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getInitials = (name: string | null | undefined): string => {
	if (!name) return 'AI';
	return name
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase())
		.join('');
};

export function getBaseUrl() {
	if (typeof window !== 'undefined') return window.location.origin;
	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
	return `http://localhost:${process.env.PORT ?? 3000}`;
}

export function getRandomInt(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function shuffleArray(array: string[]) {
	return array
		.map((a) => ({ sort: Math.random(), value: a }))
		.sort((a, b) => a.sort - b.sort)
		.map((a) => a.value);
}

export function generateRandom4WordString(): string {
	const selectedWords: string[] = [];

	const randomFoodIndex = getRandomInt(0, foodWords.length - 1);
	selectedWords.push(foodWords[randomFoodIndex] as string);

	const randomAnimalIndex = getRandomInt(0, animalWords.length - 1);
	selectedWords.push(animalWords[randomAnimalIndex] as string);

	const randomVerbIndex = getRandomInt(0, verbWords.length - 1);
	selectedWords.push(verbWords[randomVerbIndex] as string);

	const randomNounIndex = getRandomInt(0, nounWords.length - 1);
	selectedWords.push(nounWords[randomNounIndex] as string);

	const shuffledArray = shuffleArray(selectedWords);

	return shuffledArray.join(' ');
}

export function generateAIResponse(): Promise<string> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve('This is a response from the AI!');
		}, 2500);
	});
}
