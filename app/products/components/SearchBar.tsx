import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchBarProps {
	className?: string;
}
export default function SearchBar({ className }: SearchBarProps) {
	return (
		<div className={cn("flex gap-2 w-full max-w-sm", className)}>
			<Input placeholder="Search Products..." className="w-full" />
			<Button type="button">Search</Button>
		</div>
	);
}
