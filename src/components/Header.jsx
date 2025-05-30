import React, { useState } from "react";
import { FaShoppingCart, FaHeart, FaSearch } from "react-icons/fa";
import styles from "./Header.module.css";

const Header = ({ openCart, openWishlist, toggleRecipeSearch, cart }) => {
	const [label, setLabel] = useState("");
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	const displayIconLabel = (value, event) => {
		setLabel(value);
		setMousePosition({ x: event.clientX, y: event.clientY });
	};

	const clearLabel = () => {
		setLabel("");
	};

	return (
		<header className={`${styles.header} p-120`}>
			<h1 className={styles.headerH1}>Fresh Cart</h1>
			<div className={styles.headerIcons}>
				<div>
					<FaSearch
						onClick={toggleRecipeSearch}
						className={styles.headerIcon}
						onMouseEnter={(event) =>
							displayIconLabel("Search Recipe", event)
						}
						onMouseLeave={clearLabel}
					/>
				</div>
				<div>
					<FaHeart
						onClick={openWishlist}
						className={styles.headerIcon}
						onMouseEnter={(event) =>
							displayIconLabel("Wishlist", event)
						}
						onMouseLeave={clearLabel}
					/>
				</div>
				<div className={styles.cart}>
					<FaShoppingCart
						onClick={openCart}
						className={styles.headerIcon}
						onMouseEnter={(event) =>
							displayIconLabel("Cart", event)
						}
						onMouseLeave={clearLabel}
					/>
					<p className={styles.cartLength}> {cart.length}</p>
				</div>
			</div>
			{label && (
				<div
					className={styles.label}
					style={{
						left: mousePosition.x,
						top: mousePosition.y,
					}}
				>
					{label}
				</div>
			)}
		</header>
	);
};

export default Header;
