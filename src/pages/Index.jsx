import React, { useState } from "react";
import { Box, Button, Center, Grid, Heading, Text } from "@chakra-ui/react";

const Index = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("X");

  const handleClick = (index) => {
    if (board[index] === null && !calculateWinner(board)) {
      const newBoard = [...board];
      newBoard[index] = player;
      setBoard(newBoard);
      setPlayer(player === "X" ? "O" : "X");
    }
  };

  const calculateWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const isBoardFull = board.every((cell) => cell !== null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setPlayer("X");
  };

  return (
    <Center h="100vh">
      <Box maxW="sm" mx="auto" p={6} borderWidth={1} borderRadius="lg">
        <Heading as="h1" size="xl" textAlign="center" mb={6}>
          Tic Tac Toe
        </Heading>
        <Grid templateColumns="repeat(3, 1fr)" gap={2}>
          {board.map((cell, index) => (
            <Button key={index} onClick={() => handleClick(index)} variant="outline" size="lg" fontSize="4xl" fontWeight="bold" h="100px" disabled={cell !== null || winner !== null}>
              {cell}
            </Button>
          ))}
        </Grid>
        {winner && (
          <Text textAlign="center" fontSize="2xl" mt={4}>
            {winner} wins!
          </Text>
        )}
        {!winner && isBoardFull && (
          <Text textAlign="center" fontSize="2xl" mt={4}>
            It's a draw!
          </Text>
        )}
        {(winner || isBoardFull) && (
          <Center mt={4}>
            <Button onClick={resetGame} colorScheme="blue">
              Play Again
            </Button>
          </Center>
        )}
      </Box>
    </Center>
  );
};

export default Index;
