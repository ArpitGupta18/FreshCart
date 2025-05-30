import React from "react";
import styles from "./GroceryFilter.module.css";

const GroceryFilter = ({
	handleCategoryChange,
	handleVendorChange,
	groceries,
	clearVendorFilter,
	clearCategoryFilter,
	categories,
	vendors,
}) => {
	let uniqueCategories = [
		...new Set(groceries.map((grocery) => grocery.category)),
	];

	const uniqueVendors = [
		...new Set(groceries.map((grocery) => grocery.vendor)),
	];
	return (
		<div className={styles.filterSection}>
			<h2 className={styles.title}>Filters</h2>

			<div className={styles.filterOptions}>
				<div className={styles.eachTitle}>
					<h3>Categories</h3>
					<button onClick={clearCategoryFilter}>Clear</button>
				</div>
				<div className={styles.filterCheckbox}>
					{uniqueCategories.map((category) => (
						<label key={category} className={styles.checkboxLabel}>
							<input
								type="checkbox"
								checked={categories.includes(category)}
								onChange={() => handleCategoryChange(category)}
							/>
							<p>{category}</p>
						</label>
					))}
				</div>
			</div>
			<div className={styles.separator}></div>
			<div className={styles.filterOptions}>
				<div className={styles.eachTitle}>
					<h3>Vendors</h3>
					<button onClick={clearVendorFilter}>Clear</button>
				</div>
				<div className={styles.filterCheckbox}>
					{uniqueVendors.map((vendor) => (
						<label key={vendor} className={styles.checkboxLabel}>
							<input
								type="checkbox"
								checked={vendors.includes(vendor)}
								onChange={() => handleVendorChange(vendor)}
							/>
							<p>{vendor}</p>
						</label>
					))}
				</div>
			</div>
		</div>
	);
};

export default GroceryFilter;
