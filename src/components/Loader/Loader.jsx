// Loader.js
import React from 'react';
// import CircularProgress from '@mui/material/CircularProgress';
// import spinner from "../assets/img/spinner1.gif";
import spinner from "../../assets/img/spinner.gif";
import Box from '@mui/material/Box';

const Loader = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="fixed"
      top={0}
      left={0}
      width="100%"
      height="100%"
      zIndex={2000}
      // bgcolor="rgba(0, 0, 0, 0.5);" 
      bgcolor="#1c682c7d"
    >
      <img src={spinner} alt="Loading..." />
    </Box>
  );
}

export default Loader;