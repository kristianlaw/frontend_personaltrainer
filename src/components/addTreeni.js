import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Snackbar from '@material-ui/core/Snackbar';
import AddTreeni from './addTreeni';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';



export default function Addtreeni(props) {
    const [treeni, setTreeni] = useState({activity:'', date:'', duration:''});
    const [open, setOpen] = useState(false);


    const handleCancel = () => {
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
            <button style={{margin: 10}} color="primary" onClick={handleCancel}>New Training</button>

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
                <button onClick={handleCancel} color="primary">
                    Cancel action
                </button>
                <button onClick={handleClose} color="primary">
                    Save
                </button>
            </DialogActions>
            </Dialog>
        </div>
    )
}
