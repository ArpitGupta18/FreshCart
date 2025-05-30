import React from "react";
import { FaSearch } from "react-icons/fa";
import GroceryItem from "./GroceryItem";
import styles from "./GroceryList.module.css";

const GroceryList = ({
	groceries,
	addToCart,
	searchTerm,
	setSearchTerm,
	addToWishlist,
}) => {
	return (
		<div className={styles.mainContainer}>
			<div className={styles.searchContainer}>
				<div className={styles.searchBar}>
					<FaSearch className={styles.searchIcon} />
					<input
						type="text"
						placeholder="Search groceries..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className={styles.searchInput}
					/>
				</div>
			</div>
			<div className={styles.itemContainer}>
				{groceries.map((grocery) => (
					<GroceryItem
						key={grocery.id}
						grocery={grocery}
						addToCart={addToCart}
						addToWishlist={addToWishlist}
						trash={false}
						removeFromWishlist=""
					/>
				))}
			</div>
		</div>
	);
};

export default GroceryList;
