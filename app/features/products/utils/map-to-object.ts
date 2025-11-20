export function mapToObject<T>(
	value: Map<string, T> | Record<string, T> | null | undefined,
): Record<string, T> {
	if (!value) return {};
	return value instanceof Map ? Object.fromEntries(value) : value;
}
