import React, { useState } from "react";
import styles from "./Orders.module.css";
import OrderList from "./OrderList";

const Orders = ({ orders, reOrder, totalSpendings, setTotalSpendings }) => {
	// console.log("Huh ", orders);

	return (
		<div className={`p-120 ${styles.ordersContainer}`}>
			<div className={styles.ordersHeader}>
				<h2 className={styles.title}>Track Your Orders</h2>
				<p className={styles.totalSpendings}>
					Total Spendings: $
					{totalSpendings
						.reduce((acc, val) => acc + val, 0)
						.toFixed(2)}
				</p>
			</div>
			<div className={styles.orders}>
				{orders.length === 0 && (
					<p className={styles.ordersNotMade}>
						No orders have been made yet!!
					</p>
				)}
				{orders.map((order) => (
					<OrderList
						key={order.orderId}
						order={order}
						setTotalSpendings={setTotalSpendings}
						reOrder={reOrder}
					/>
				))}
			</div>
		</div>
	);
};

export default Orders;
