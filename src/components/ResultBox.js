import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
function ResultBox({ gameStatus, handleClose, solution }) {
  return (
    <box>
      <box>
        <Dialog open={gameStatus === 'win'}>
          <DialogTitle>You Won!!</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You've successfully completed today's word.<br></br> Come back
              tomorrow for more.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>close</Button>
          </DialogActions>
        </Dialog>
      </box>
      <box>
        <Dialog open={gameStatus === 'lose'}>
          <DialogTitle>You Lost!!</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Oh you're out of guesses. Today's word was:
              <Typography
                variant={'h6'}
                style={{ textTransform: 'capitalize' }}
                align={'center'}
                color={'black'}
              >
                '{solution.join('')}'
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>close</Button>
          </DialogActions>
        </Dialog>
      </box>
    </box>
  );
}

export default ResultBox;
