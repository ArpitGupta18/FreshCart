import React from "react";
import { FaHeart, FaTrash } from "react-icons/fa";
import styles from "./GroceryItem.module.css";

const GroceryItem = ({
	grocery,
	addToCart,
	addToWishlist,
	removeFromWishlist,
	trash,
}) => {
	return (
		<div className={styles.itemContainer}>
			<div className={styles.itemImageContainer}>
				<img
					src={grocery.image_url}
					alt=""
					className={styles.itemImage}
				/>
			</div>
			<div className={styles.itemDataContainer}>
				<p className={styles.itemName}>{grocery.name} </p>
				<p className={styles.itemPrice}>${grocery.price}</p>
				<div className={styles.itemButtons}>
					<button
						onClick={() => addToCart(grocery)}
						className={styles.addToCartBtn}
					>
						Add To Cart
					</button>
					{trash === true ? (
						<FaTrash
							className={styles.addToWishlist}
							onClick={() => removeFromWishlist(grocery)}
						/>
					) : (
						<FaHeart
							className={styles.addToWishlist}
							onClick={() => addToWishlist(grocery)}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default GroceryItem;
