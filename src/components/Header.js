import React from 'react';
import { Typography, AppBar } from '@mui/material';
import { makeStyles } from '@mui/styles';
const useStyle = makeStyles({
  hdr: {
    height: '8vh',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '100',
  },
});
function Header() {
  const classes = useStyle();
  return (
    <AppBar>
      <Typography variant="h4" component="div" className={classes.hdr}>
        Wordle
      </Typography>
    </AppBar>
  );
}

export default Header;
