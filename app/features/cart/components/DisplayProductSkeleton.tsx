import { Skeleton } from "@/components/ui/skeleton";

export default function DisplayProductSkeleton() {
	return (
		<div className="flex items-center justify-between gap-4 p-4 border rounded-md">
			<div className="flex items-center gap-4">
				<Skeleton className="w-16 h-16 rounded" />
				<div className="space-y-2">
					<Skeleton className="h-4 w-32" />
					<Skeleton className="h-4 w-20" />
				</div>
			</div>
			<Skeleton className="h-4 w-16" />
		</div>
	);
}
