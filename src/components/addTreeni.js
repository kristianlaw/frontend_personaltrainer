import React, { useState } from 'react';
import 'react-table/react-table.css';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';



export default function Addtreeni(props) {
    const [treeni, setTreeni] = useState({activity:'', date:'', duration:''});
    const [open, setOpen] = useState(false);


    const handleCancel = () => {
    setOpen(false);
  }

  const handleClick = () => {
    setOpen(true);
  }

    const handleClose = () => {
        props.addTreeni(treeni);
        setOpen(false);
    }


  const inputChanged = (event) => {
      setTreeni({...treeni, [event.target.name]: event.target.value});
  }




  return(
        <div>
            <Button style={{margin: 10}} color="primary" onClick={handleClick}>
            New Training
            </Button>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New Training</DialogTitle>
            <DialogContent>

            <TextField
                autoFocus
                margin="dense"
                id="activity"
                name="activity"
                value={treeni.activity}
                onChange={inputChanged}
                label="Activity"
                fullWidth
            />
            <TextField
                margin="dense"
                id="date"
                name="date"
                value={treeni.date}
                onChange={inputChanged}
                label="Date"
                fullWidth
            />
            <TextField
                margin="dense"
                id="duration"
                name="duration"
                value={treeni.duration}
                onChange={inputChanged}
                label="Duration in minutes"
                fullWidth
            />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleClose} color="primary">
                    Save
                </Button>
            </DialogActions>
            </Dialog>
        </div>
    )
}
