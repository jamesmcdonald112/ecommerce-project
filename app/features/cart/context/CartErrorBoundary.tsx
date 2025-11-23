"use client";

import { Component, type ReactNode } from "react";

interface Props {
	children: ReactNode;
}

interface State {
	hasError: boolean;
	error: Error | null;
}

export class CartErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error) {
		console.error("CartProvider Error:", error);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div role="alert" style={{ padding: "1rem", color: "red" }}>
					<h2>Cart Error</h2>
					<p>
						{this.state.error?.message ||
							"An error occurred in the shopping cart."}
					</p>
				</div>
			);
		}

		return this.props.children;
	}
}
