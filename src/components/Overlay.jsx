import React, { useEffect } from "react";

const Overlay = ({ isOpen }) => {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}

		return () => {
			document.body.style.overflow = "auto";
		};
	}, [isOpen]);
	return <div className="overlay"></div>;
};

export default Overlay;
