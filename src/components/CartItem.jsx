import React from "react";
import styles from "./CartItem.module.css";
import { FaMinusCircle, FaPlus, FaMinus } from "react-icons/fa";

const CartItem = ({ cartItem, removeFromCart, updateCartQuantity }) => {
	return (
		<div className={styles.cartItem}>
			<div className={styles.itemImageContainer}>
				<img
					src={cartItem.image_url}
					alt=""
					className={styles.itemImage}
				/>
			</div>
			<div className={styles.itemDataContainer}>
				<p className={styles.itemName}>{cartItem.name}</p>
				<p className={styles.itemDescription}>{cartItem.description}</p>
				<div className={styles.itemQuantity}>
					<span>Quantity:</span>
					<div className={styles.itenQuantityUpdate}>
						<p>
							<FaMinus
								className={styles.icon}
								onClick={() =>
									updateCartQuantity(cartItem.id, "decrease")
								}
							/>
						</p>
						<p>|</p>
						<p
							className={styles.quantity}
							style={{ color: "#333333" }}
						>
							{cartItem.quantity}
						</p>
						<p>|</p>
						<p>
							<FaPlus
								className={styles.icon}
								onClick={() =>
									updateCartQuantity(cartItem.id, "increase")
								}
							/>
						</p>
					</div>
				</div>
				<p className={styles.itemPrice}>Price: ${cartItem.price}</p>
			</div>
			<div className={styles.removeItem}>
				<FaMinusCircle
					className={styles.removeItemIcon}
					onClick={() => removeFromCart(cartItem.id)}
				/>
			</div>
		</div>
	);
};

export default CartItem;
