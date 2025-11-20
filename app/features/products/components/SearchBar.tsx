import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchBarProps {
	value: string;
	onChange: (query: string) => void;
	onSearch: () => void;
	className?: string;
}
export default function SearchBar({
	value,
	onChange,
	onSearch,
	className,
}: SearchBarProps) {
	return (
		<div className={cn("flex gap-2 w-full max-w-sm", className)}>
			<Input
				placeholder="Search Products..."
				className="w-full"
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
			<Button type="button" onClick={onSearch}>
				Search
			</Button>
		</div>
	);
}
