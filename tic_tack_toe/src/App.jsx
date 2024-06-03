import React, { useState } from 'react';
import { Box, Button, Grid, Text, VStack, useToast } from '@chakra-ui/react';

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const toast = useToast();

  const handleClick = (index) => {
    const newBoard = [...board];
    if (calculateWinner(board) || board[index]) return;
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const renderSquare = (index) => {
    return (
      <Button
        w="100px"
        h="100px"
        fontSize="2xl"
        onClick={() => handleClick(index)}
        bgGradient="linear(to-r, purple.400, pink.400)"
        _hover={{
          bgGradient: "linear(to-r, purple.500, pink.500)",
        }}
        color="white"
      >
        {board[index]}
      </Button>
    );
  };

  const calculateWinner = (squares) => {
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
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : board.every((square) => square !== null)
    ? 'Draw'
    : `Next player: ${isXNext ? 'X' : 'O'}`;

  if (status === 'Draw' && !toast.isActive('draw-toast')) {
    toast({
      id: 'draw-toast',
      title: 'Game Over',
      description: "It's a draw!",
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  } else if (winner && !toast.isActive('winner-toast')) {
    toast({
      id: 'winner-toast',
      title: 'Game Over',
      description: `Winner is ${winner}`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-r, #ff7e5f, #feb47b)"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <VStack spacing={4} p={8} bg="whiteAlpha.900" rounded="md" boxShadow="lg">
        <Text fontSize="3xl" fontWeight="bold" bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text">
          Tic Tac Toe
        </Text>
        <Grid templateColumns="repeat(3, 1fr)" gap={2}>
          {board.map((_, index) => renderSquare(index))}
        </Grid>
        <Text fontSize="xl">{status}</Text>
        <Button colorScheme="teal" onClick={resetGame}>
          Reset Game
        </Button>
      </VStack>
    </Box>
  );
};

export default App;
