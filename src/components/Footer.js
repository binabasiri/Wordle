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
        position: 'absolute',
        buttom: '8vh',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        width: '100vw',
      }}
    >
      {'Copyright © '}
      <Link
        color="inherit"
        href="https://binabasiri.github.io/binabasiri/"
        sx={{ margin: '2px' }}
      >
        Bina Basiri
      </Link>
      {'   '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Footer;
