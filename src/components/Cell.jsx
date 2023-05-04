import React from "react";
import { useState, useEffect } from "react";

const Cell = ({
	clickFunction,
	playerTurn,
	boardUpdate,
	reset,
	gameFinished,
}) => {
	//Internal States
	const [clicked, setClicked] = useState(false);
	const [textContent, setTextContent] = useState("");
	// Function for handling the Click of this square
	const handleClick = () => {
		if (!gameFinished) {
			setClicked(true);
			setTextContent(playerTurn);
			clickFunction();
			boardUpdate();
		}
	};

	// Effect for checking when reset is clicked, set states to default
	useEffect(() => {
		if (reset) {
			setClicked(false);
			setTextContent("");
		}
	}, [reset]);

	//Return of the React Component
	return (
		<div
			className='square'
			onClick={clicked ? null : handleClick}
		>
			{textContent}
		</div>
	);
};

export { Cell };
