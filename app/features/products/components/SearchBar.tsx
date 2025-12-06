import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchBarProps {
	value: string;
	onChange: (query: string) => void;
	onSearch: () => void;
	placeholder?: string;
	className?: string;
}
export default function SearchBar({
	value,
	onChange,
	onSearch,
	className,
	placeholder,
}: SearchBarProps) {
	return (
		<div
			className={cn(
				"flex w-full max-w-2xl items-center gap-3 rounded-full border border-border bg-card px-3 py-2 shadow-sm",
				className,
			)}
		>
			<Input
				placeholder={placeholder}
				className="w-full border-none bg-transparent text-base focus-visible:ring-0 focus-visible:ring-offset-0"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === "Enter") onSearch();
				}}
			/>
			<Button
				type="button"
				onClick={onSearch}
				className="rounded-full px-5 text-sm font-semibold"
			>
				Search
			</Button>
		</div>
	);
}
