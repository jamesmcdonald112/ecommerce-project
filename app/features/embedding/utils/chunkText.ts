export function chunkText(text: string, maxLength = 500): { text: string }[] {
	const chunks: { text: string }[] = [];

	if (!text) return chunks;

	let start: number = 0;

	while (start < text.length) {
		const end: number = start + maxLength;
		let chunk: string = text.slice(start, end);

		if (chunk.length === maxLength) {
			const lastSpaceIndex: number = chunk.lastIndexOf(" ");
			if (lastSpaceIndex > -1) {
				chunk = chunk.slice(0, lastSpaceIndex);
			}
		}
		chunks.push({ text: chunk });
		start += chunk.length;
	}
	return chunks;
}
