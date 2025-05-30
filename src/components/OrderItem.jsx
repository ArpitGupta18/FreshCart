import React from "react";
import styles from "./OrderItem.module.css";

const OrderItem = ({ orderItem, index }) => {
	return (
		<div className={styles.orderItem}>
			<p className={styles.orderIndex}>
				<span className={styles.label}>#</span> {index + 1}
			</p>
			<p className={styles.orderName}>
				<span className={styles.label}>Item:</span> {orderItem.name}
			</p>
			<p className={styles.orderQuantity}>
				<span className={styles.label}>Qty:</span> {orderItem.quantity}
			</p>
			<p className={styles.orderPrice}>
				<span className={styles.label}>Price:</span> $
				{orderItem.price.toFixed(2)}
			</p>
			<p className={styles.orderTotal}>
				<span className={styles.label}>Total:</span> $
				{(orderItem.price * orderItem.quantity).toFixed(2)}
			</p>
		</div>
	);
};

export default OrderItem;
