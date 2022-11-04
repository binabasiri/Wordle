import React from 'react';
import { Typography, Link } from '@mui/material';

function Footer() {
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      align="center"
      sx={{
        backgroundColor: 'grey',
        height: '8vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
      }}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://binabasiri.github.io/binabasiri/">
        Bina Basiri
      </Link>
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Footer;
