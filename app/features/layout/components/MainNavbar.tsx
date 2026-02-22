"use client";

import Link from "next/link";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";

export function MainNavbar() {
	return (
		<header className="border-b bg-background">
			<div className=" mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
				{/* LOGO */}
				<Link href="/" className="text-xl font-bold">
					MyStore
				</Link>

				{/* NAV LINKS */}
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuLink href="/">
								Commercial Case Study
							</NavigationMenuLink>
						</NavigationMenuItem>

						<NavigationMenuItem>
							<NavigationMenuLink href="/techang">Technical Details</NavigationMenuLink>
						</NavigationMenuItem>

						<NavigationMenuItem>
							<NavigationMenuLink href="/products">Products</NavigationMenuLink>
						</NavigationMenuItem>

						<NavigationMenuItem>
							<NavigationMenuLink href="/cart">Cart</NavigationMenuLink>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
			</div>
		</header>
	);
}
