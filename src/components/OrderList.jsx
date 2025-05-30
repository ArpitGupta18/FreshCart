import React, { useState } from "react";
import OrderItem from "./OrderItem";
import styles from "./OrderList.module.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const OrderList = ({ order, setTotalSpendings, reOrder }) => {
	console.log(order);
	const [isExpanded, setIsExpanded] = useState(false);

	const total = order.items.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0
	);

	const toggleExpand = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<div className={styles.orderContainer}>
			<div className={styles.orderDetails}>
				<div className={styles.orderDetailItem}>
					<p className={styles.label}>Order ID</p>
					<p>{order.orderId}</p>
				</div>
				<div className={styles.orderDetailItem}>
					<p className={styles.label}>Order Date</p>
					<p>{order.orderDate}</p>
				</div>
				<div className={styles.orderDetailItem}>
					<p className={styles.label}>Status</p>
					<p>{order.status}</p>
				</div>
				<div className={styles.orderDetailItem}>
					<p className={styles.label}>Total</p>
					<p className={styles.totalAmount}>${total.toFixed(2)}</p>
				</div>
				<div className={styles.orderDetailItem}>
					<p className={styles.label}>Time</p>
					<p>{order.orderTime}</p>
				</div>
				<div className={styles.orderDetailItem}>
					<p className={styles.details} onClick={toggleExpand}>
						{isExpanded ? "Hide Details" : "View Details"}
						{isExpanded ? <FaChevronUp /> : <FaChevronDown />}
					</p>
				</div>
			</div>

			<div
				className={`${styles.orderItems} ${
					isExpanded ? styles.expanded : ""
				}`}
			>
				{order.items.map((item, index) => (
					<OrderItem key={index} orderItem={item} index={index} />
				))}
				<div className={styles.reOrderBtnContainer}>
					<button
						onClick={() => reOrder(order.items, order.orderId)}
						className={styles.reOrderBtn}
					>
						Re-order
					</button>
				</div>
			</div>
		</div>
	);
};

export default OrderList;
