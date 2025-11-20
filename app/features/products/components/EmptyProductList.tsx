import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from "@/components/ui/empty";

export default function EmptyProductList() {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyTitle>No Products Found</EmptyTitle>
				<EmptyDescription>Try adjusting your search</EmptyDescription>
			</EmptyHeader>
		</Empty>
	);
}
