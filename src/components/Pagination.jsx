import React from "react";
import styles from "./Pagination.module.css";
const Pagination = ({
	totalItems,
	itemsPerPage,
	currentPage,
	setCurrentPage,
}) => {
	const pageNumbers = [];
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	for (let i = 1; i <= totalPages; i++) {
		pageNumbers.push(i);
	}

	return (
		<div>
			<nav className={styles.pageNumbers}>
				{pageNumbers.map((number) => (
					<button
						key={number}
						onClick={() => setCurrentPage(number)}
						className={`${styles.pageButton} ${
							number === currentPage ? styles.active : ""
						}`}
					>
						{number}
					</button>
				))}
			</nav>
		</div>
	);
};

export default Pagination;
