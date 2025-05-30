import React from "react";
import Overlay from "./Overlay";
import styles from "./WishlistModal.module.css";
import { FaWindowClose } from "react-icons/fa";
import GroceryItem from "./GroceryItem";
const WishlistModal = ({
	wishlist,
	setWishlist,
	isOpen,
	closeWishlist,
	addToCart,
	removeFromWishlist,
}) => {
	return (
		<>
			<Overlay isOpen={isOpen} />
			<div className={styles.wishlistModal}>
				<header>
					<div className={styles.wishlistHeader}>
						<h2 className={styles.wishlistTitle}>Wishlist</h2>
						<p className={styles.wishlistQuantity}>
							Quantity: {wishlist.length}
						</p>
					</div>
					<div
						className={styles.wishlistCloseContainer}
						onClick={closeWishlist}
					>
						<FaWindowClose className={styles.wishlistCloseBtn} />
					</div>
				</header>
				{wishlist.length > 0 ? (
					<p className={styles.removeItems}>
						<span onClick={() => removeFromWishlist("all")}>
							empty wishlist
						</span>
					</p>
				) : (
					<p className={styles.emptyWishlist}>
						No Items added to WishList
					</p>
				)}

				<div className={styles.wishlistContainer}>
					{wishlist.map((wishlistItem) => (
						<GroceryItem
							addToCart={addToCart}
							grocery={wishlistItem}
							removeFromWishlist={removeFromWishlist}
							trash={true}
						/>
					))}
				</div>
			</div>
		</>
	);
};

export default WishlistModal;
