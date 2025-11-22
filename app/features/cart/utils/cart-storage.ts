interface addToLocalStorageProps<T> {
	key: string;
	value: T;
}

export function addToLocalStorage<T>({
	key,
	value,
}: addToLocalStorageProps<T>): void {
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch (error: unknown) {
		console.log("Error adding to local storage: ", error);
	}
}

export function getFromLocalStorage<T>(key: string): T | null {
	try {
		const item = localStorage.getItem(key);
		return item ? (JSON.parse(item) as T) : null;
	} catch (error: unknown) {
		console.log("Error reading from local storage: ", error);
		return null;
	}
}
