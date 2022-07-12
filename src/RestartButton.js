import Button from '@mui/material/Button';



function RestartButton({restartGame}) {
  const buttonStyle = {
      margin: "20px 0 0 0", 
      color: '#e4f317',
      borderColor: '#e4f317',
      "&:hover": {
        fontWeight: "bold",
        borderColor: '#e4f317',
        boxShadow: "0 5px 30px 20px #e4f310a8",
      }
  }

  return (
    <Button 
      variant="outlined" 
      sx={buttonStyle}
      onClick={restartGame}>
        RESTART
    </Button>
  );
}

export default RestartButton;