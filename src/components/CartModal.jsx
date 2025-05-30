import React, { useEffect, useState } from "react";
import styles from "./CartModal.module.css";
import Overlay from "./Overlay";
import { FaWindowClose } from "react-icons/fa";
import CartItem from "./CartItem";

const CartModal = ({
	isOpen,
	closeCart,
	cart,
	removeFromCart,
	setCart,
	checkoutCart,
}) => {
	const [total, setTotal] = useState(0);
	// console.log(cart);

	useEffect(() => {
		setTotal(
			cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
		);
	}, [cart]);

	const updateCartQuantity = (itemId, action) => {
		setCart((prevCart) =>
			prevCart.map((cartItem) =>
				cartItem.id === itemId
					? {
							...cartItem,
							quantity:
								action === "increase"
									? cartItem.quantity < cartItem.stock
										? cartItem.quantity + 1
										: cartItem.quantity
									: cartItem.quantity > 1
									? cartItem.quantity - 1
									: cartItem.quantity,
					  }
					: cartItem
			)
		);
	};

	return (
		<>
			<Overlay isOpen={isOpen} />
			<div className={styles.cartModal}>
				<header>
					<div className={styles.cartHeader}>
						<h2 className={styles.cartTitle}>Cart</h2>
						<p className={styles.cartTotal}>
							Total: ${total.toFixed(2)}
						</p>
					</div>
					<div
						className={styles.cartCloseContainer}
						onClick={closeCart}
					>
						<FaWindowClose className={styles.cartCloseBtn} />
					</div>
				</header>
				{cart.length > 0 ? (
					<p className={styles.removeItems}>
						<span onClick={() => removeFromCart("all")}>
							clear cart
						</span>
					</p>
				) : (
					<p className={styles.emptyCart}>No Items Added</p>
				)}

				<div className={styles.cartContainer}>
					{cart.map((cartItem) => (
						<CartItem
							key={cartItem.id}
							cartItem={cartItem}
							removeFromCart={removeFromCart}
							updateCartQuantity={updateCartQuantity}
						/>
					))}
					{cart.length > 0 ? (
						<div className={styles.checkout}>
							<button onClick={checkoutCart}>Checkout</button>
						</div>
					) : (
						""
					)}
				</div>
			</div>
		</>
	);
};

export default CartModal;
