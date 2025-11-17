/**
 * Transforms an array of spec rows into a key-value object
 * Filters out any rows with missing keys or values
 */
export function convertSpecRowsToSpecs(
	specRows: Array<{ key: string; value: string }>,
): Record<string, string> {
	return specRows.reduce(
		(acc, row) => {
			if (row.key && row.value) {
				acc[row.key] = row.value;
			}
			return acc;
		},
		{} as Record<string, string>,
	);
}
