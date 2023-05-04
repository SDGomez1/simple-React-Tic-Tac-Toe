import styles from "@/styles/Home.module.css";
import { useState, useEffect } from "react";
import { Cell } from "../components/Cell";

export default function Home() {
	// State for the actual game
	//Rows
	const [rowOne, setRowOne] = useState([null, null, null]);
	const [rowtwo, setRowtwo] = useState([null, null, null]);
	const [rowThree, setRowThree] = useState([null, null, null]);
	//Columns
	const [columnOne, setColumnOne] = useState([null, null, null]);
	const [columnTwo, setColumnTwo] = useState([null, null, null]);
	const [columnThree, setColumnThree] = useState([null, null, null]);
	//Diagonals
	const [diagonalOne, setDiagonalOne] = useState([null, null, null]);
	const [diagonalTwo, setDiagonalTwo] = useState([null, null, null]);

	//Control States of the game
	const [gameFinished, setGameFinished] = useState(false);
	const [playerTurn, setPlayerTurn] = useState("X");
	const [turnCount, setTurnCount] = useState(0);
	const [winner, setWinner] = useState(null);
	const [reset, setReset] = useState(false);

	// Function to get the Board Updated
	const updateGame = (index) => {
		//Rows
		let rowOneNextState = rowOne;
		let rowTwoNextState = rowtwo;
		let rowThreeNextState = rowThree;
		//Columns
		let columnOneNextState = columnOne;
		let columnTwoNextState = columnTwo;
		let columnThreeNextState = columnThree;
		//Diagonals
		let diagonalOneNextState = diagonalOne;
		let diagonalTwoNextState = diagonalTwo;

		//Update board Logic
		switch (index) {
			case 0:
				//Next state logic
				rowOneNextState[0] = playerTurn;
				columnOneNextState[0] = playerTurn;
				diagonalOneNextState[0] = playerTurn;
				// Actual change of state
				setRowOne(rowOneNextState);
				setColumnOne(columnOneNextState);
				setDiagonalOne(diagonalOneNextState);
				break;
			case 1:
				//Next state logic
				rowOneNextState[1] = playerTurn;
				columnTwoNextState[0] = playerTurn;
				// Actual change of state
				setRowOne(rowOneNextState);
				setColumnTwo(columnTwoNextState);
				break;

			case 2:
				//Next state logic
				rowOneNextState[2] = playerTurn;
				columnThreeNextState[0] = playerTurn;
				diagonalTwoNextState[0] = playerTurn;
				// Actual change of state
				setRowOne(rowOneNextState);
				setColumnThree(columnThreeNextState);
				setDiagonalTwo(diagonalTwoNextState);
				break;
			case 3:
				//Next state logic
				rowTwoNextState[0] = playerTurn;
				columnOneNextState[1] = playerTurn;
				// Actual change of state
				setRowtwo(rowTwoNextState);
				setColumnOne(columnOneNextState);
				break;
			case 4:
				//Next state logic
				rowTwoNextState[1] = playerTurn;
				columnTwoNextState[1] = playerTurn;
				diagonalOneNextState[1] = playerTurn;
				diagonalTwoNextState[1] = playerTurn;

				// Actual change of state
				setRowtwo(rowTwoNextState);
				setColumnTwo(columnTwoNextState);
				setDiagonalOne(diagonalOneNextState);
				setDiagonalTwo(diagonalTwoNextState);
				break;
			case 5:
				//Next state logic
				rowTwoNextState[2] = playerTurn;
				columnThreeNextState[1] = playerTurn;
				// Actual change of state
				setRowtwo(rowTwoNextState);
				setColumnThree(columnThreeNextState);
				break;
			case 6:
				//Next state logic
				rowThreeNextState[0] = playerTurn;
				columnOneNextState[2] = playerTurn;
				diagonalTwoNextState[2] = playerTurn;
				// Actual change of state
				setRowThree(rowThreeNextState);
				setColumnOne(columnOneNextState);
				setDiagonalTwo(diagonalTwoNextState);
				break;
			case 7:
				//Next state logic
				rowThreeNextState[1] = playerTurn;
				columnTwoNextState[2] = playerTurn;
				// Actual change of state
				setRowThree(rowThreeNextState);
				setColumnTwo(columnTwoNextState);
				break;
			case 8:
				//Next state logic
				rowThreeNextState[2] = playerTurn;
				columnThreeNextState[2] = playerTurn;
				diagonalOneNextState[2] = playerTurn;
				// Actual change of state
				setRowThree(rowThreeNextState);
				setColumnThree(columnThreeNextState);
				setDiagonalOne(diagonalOneNextState);
				break;
			default:
				break;
		}
	};

	// Function For determining the winner
	const winnerPlayer = () => {
		if (
			rowOne.every((value) => value === "X") ||
			rowtwo.every((value) => value === "X") ||
			rowThree.every((value) => value === "X") ||
			columnOne.every((value) => value === "X") ||
			columnTwo.every((value) => value === "X") ||
			columnThree.every((value) => value === "X") ||
			diagonalOne.every((value) => value === "X") ||
			diagonalTwo.every((value) => value === "X")
		) {
			setWinner("X");
		}
		if (
			rowOne.every((value) => value === "O") ||
			rowtwo.every((value) => value === "O") ||
			rowThree.every((value) => value === "O") ||
			columnOne.every((value) => value === "O") ||
			columnTwo.every((value) => value === "O") ||
			columnThree.every((value) => value === "O") ||
			diagonalOne.every((value) => value === "O") ||
			diagonalTwo.every((value) => value === "O")
		) {
			setWinner("O");
		}
	};

	// Function That handles the click of a single square of the board
	const handleSquareClick = () => {
		setReset(false);
		let nextCount = turnCount + 1;
		setTurnCount(nextCount);
		playerTurn === "X" ? setPlayerTurn("O") : setPlayerTurn("X");
		nextCount === 9 ? setGameFinished(true) : setGameFinished(false);
	};
	// Creation the squares dynamically
	const createCells = Array.apply(null, Array(9)).map((item, index) => {
		return (
			<Cell
				key={index}
				clickFunction={handleSquareClick}
				playerTurn={playerTurn}
				boardUpdate={() => updateGame(index)}
				reset={reset}
				gameFinished={gameFinished}
			/>
		);
	});

	// Function for creating the message when the game is finished
	const winnerMessage = () => {
		if (winner) {
			return `Winner: ${winner}`;
		} else {
			return "Tie";
		}
	};

	//Function for handling the reset button
	const handleReset = () => {
		// Control states to default
		setReset(true);
		setGameFinished(false);
		setPlayerTurn("X");
		setTurnCount(0);
		setWinner(null);

		//Board State to default
		setRowOne([null, null, null]);
		setRowtwo([null, null, null]);
		setRowThree([null, null, null]);
		setColumnOne([null, null, null]);
		setColumnTwo([null, null, null]);
		setColumnThree([null, null, null]);
		setDiagonalOne([null, null, null]);
		setDiagonalTwo([null, null, null]);
	};

	// Effect for checking the winner each click on the board
	useEffect(() => {
		winnerPlayer();
		if (winner) setGameFinished(true);
	}, [winnerPlayer, winner]);

	//Return of the React Component
	return (
		<section>
			<div className='Board'>{createCells}</div>
			<div>
				<div className='status'>
					{gameFinished ? winnerMessage() : `Next player: ${playerTurn}`}
				</div>
				<button
					className='reset'
					onClick={handleReset}
				>
					Reset{" "}
				</button>
			</div>
		</section>
	);
}
