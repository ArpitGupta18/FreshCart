import React, { useState } from "react";
import groceriesData from "./data/groceriesData";
import Header from "./components/Header";
import GroceryList from "./components/GroceryList";
import CartModal from "./components/CartModal";
import WishlistModal from "./components/WishlistModal";
import RecipeSearch from "./components/RecipeSearch";
import Orders from "./components/Orders";
import "./App.css";
import Pagination from "./components/Pagination";
import GroceryFilter from "./components/GroceryFilter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const [cart, setCart] = useState([]);
	const [wishlist, setWishlist] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [showCart, setShowCart] = useState(false);
	const [showWishlist, setShowWishlist] = useState(false);
	const [showRecipeSearch, setShowRecipeSearch] = useState(false);
	const [orders, setOrders] = useState([]);

	const [totalSpendings, setTotalSpendings] = useState([]);
	const [orderId, setOrderId] = useState(1);

	// * Filter based on category and vendor
	const [categories, setCategories] = useState([]);
	const [vendors, setVendors] = useState([]);

	// * Setting up state for pagination
	const [currentPage, setCurrentPage] = useState(1);

	const itemsPerPage = 8;

	const handleCategoryChange = (category) => {
		setCurrentPage(1);
		setCategories((prev) =>
			prev.includes(category)
				? prev.filter((c) => c !== category)
				: [...prev, category]
		);
	};

	const handleVendorChange = (vendor) => {
		setCurrentPage(1);
		setVendors((prev) =>
			prev.includes(vendor)
				? prev.filter((v) => v !== vendor)
				: [...prev, vendor]
		);
	};

	const clearCategoryFilter = () => {
		setCategories([]);
	};

	const clearVendorFilter = () => {
		setVendors([]);
	};

	const filteredGroceries = groceriesData.filter((grocery) => {
		const matchesSearchTerm = grocery.name
			.toLowerCase()
			.includes(searchTerm.toLowerCase().trim());
		const matchesCategory =
			categories.length === 0 || categories.includes(grocery.category);
		const matchesVendor =
			vendors.length === 0 || vendors.includes(grocery.vendor);

		return matchesSearchTerm && matchesCategory && matchesVendor;
	});

	// * Determining items for pagination
	const indexOfLastGrocery = currentPage * itemsPerPage;
	const indexOfFirstGrocery = indexOfLastGrocery - itemsPerPage;
	const currentGroceries = filteredGroceries.slice(
		indexOfFirstGrocery,
		indexOfLastGrocery
	);

	const addToCart = (item) => {
		setCart((prevCart) => {
			const itemInCart = prevCart.find(
				(element) => element.id === item.id
			);

			if (itemInCart) {
				toast.info(`${item.name} quantity increased in the cart!`);
				return prevCart.map((cartItem) =>
					cartItem.id === item.id
						? { ...cartItem, quantity: cartItem.quantity + 1 }
						: cartItem
				);
			} else {
				toast.success(`${item.name} added to the cart!`);
				return [...prevCart, { ...item, quantity: 1 }];
			}
		});
	};

	const reOrder = (orderedItems, orderId) => {
		toast.success(
			`Order #${orderId} has be re-ordered. Complete checkout in cart`
		);
		setCart([...orderedItems]);
	};

	const addToWishlist = (item) => {
		setWishlist((prevWish) => {
			const itemInWishlist = prevWish.find(
				(element) => element.id === item.id
			);

			if (!itemInWishlist) {
				toast.success(`${item.name} added to the wishlist!`);
				return [...prevWish, item];
			} else {
				toast.warn(`${item.name} already in the wishlist!`);
				return prevWish;
			}
		});
	};

	const removeFromCart = (value) => {
		if (value === "all") {
			toast.info("Cart cleared!");
			setCart([]);
		} else {
			const itemName = cart.find(
				(cartItem) => cartItem.id === value
			).name;
			toast.error(`${itemName} removed from the cart!`);
			setCart(cart.filter((cartItem) => cartItem.id !== value));
		}
	};

	const removeFromWishlist = (value) => {
		if (value === "all") {
			toast.info("Wishlist cleared");
			setWishlist([]);
		} else {
			const itemName = wishlist.find((item) => item.id === value.id).name;
			toast.error(`${itemName} removed from the wishlist!`);
			setWishlist(
				wishlist.filter((wishlistItem) => wishlistItem.id !== value.id)
			);
		}
	};

	const checkoutCart = () => {
		const currentDate = new Date();
		const day = currentDate.getDate();
		const month = months[currentDate.getMonth()];
		const year = currentDate.getFullYear();

		let hours = currentDate.getHours();
		const minutes = currentDate.getMinutes().toString().padStart(2, "0");
		const ampm = hours >= 12 ? "PM" : "AM";
		hours = hours % 12 || 12;

		const orderDate = `${day} ${month}, ${year}`;
		const orderTime = `${hours}:${minutes} ${ampm}`;

		const total = cart.reduce(
			(acc, item) => acc + item.price * item.quantity,
			0
		);
		setOrderId(orderId + 1);
		setOrders([
			...orders,
			{
				orderId: orderId,
				orderDate: orderDate,
				orderTime: orderTime,
				status: "pending",
				items: [...cart],
			},
		]);

		toast.success("Checkout successful! Thank you for your order.");
		setTotalSpendings((prev) => [...prev, total]);
		setCart([]);
	};

	// console.log("Orders: ", orders);

	const openCart = () => setShowCart(true);
	const closeCart = () => setShowCart(false);

	const openWishlist = () => setShowWishlist(true);
	const closeWishlist = () => setShowWishlist(false);
	const toggleRecipeSearch = () => setShowRecipeSearch(!showRecipeSearch);

	return (
		<div>
			<Header
				openCart={openCart}
				openWishlist={openWishlist}
				toggleRecipeSearch={toggleRecipeSearch}
				cart={cart}
			/>
			<section className="grocery-section p-120">
				<GroceryFilter
					handleCategoryChange={handleCategoryChange}
					handleVendorChange={handleVendorChange}
					groceries={groceriesData}
					clearCategoryFilter={clearCategoryFilter}
					clearVendorFilter={clearVendorFilter}
					categories={categories}
					vendors={vendors}
				/>
				<div className="main-grocery-container">
					<GroceryList
						groceries={currentGroceries}
						addToCart={addToCart}
						searchTerm={searchTerm}
						setSearchTerm={setSearchTerm}
						addToWishlist={addToWishlist}
					/>
					<Pagination
						totalItems={filteredGroceries.length}
						itemsPerPage={itemsPerPage}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
					/>
				</div>
			</section>
			{showCart && (
				<CartModal
					isOpen={showCart}
					closeCart={closeCart}
					cart={cart}
					removeFromCart={removeFromCart}
					setCart={setCart}
					checkoutCart={checkoutCart}
				/>
			)}
			{showWishlist && (
				<WishlistModal
					wishlist={wishlist}
					setWishlist={setWishlist}
					isOpen={showWishlist}
					closeWishlist={closeWishlist}
					addToCart={addToCart}
					removeFromWishlist={removeFromWishlist}
				/>
			)}
			{showRecipeSearch && (
				<RecipeSearch wishlist={wishlist} setWishlist={setWishlist} />
			)}
			<Orders
				orders={orders}
				reOrder={reOrder}
				totalSpendings={totalSpendings}
				setTotalSpendings={setTotalSpendings}
			/>
			<ToastContainer
				position="top-right"
				autoClose={700}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				draggable
				pauseOnHover
				theme="light"
			/>
		</div>
	);
};

export default App;
