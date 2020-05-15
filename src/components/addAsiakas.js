import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AddAsiakas(props) {
  const [open, setOpen] = React.useState(false);
  const [asiakas, setAsiakas] = useState({firstname:'', lastname:'', email:'', phone:'', streetaddress:'', city:''});

  const handleClick = () => {
    setOpen(true);
  }

  const handleClose = () => {
    props.addAsiakas(asiakas); //Lisää asiakkaan
    setOpen(false);
  }

  const handleCancel = () => {
    setOpen(false);
  }

  const inputChanged = (event) => {
    setAsiakas({...asiakas, [event.target.name]: event.target.value});
  }

  return(
    <div>
        <Button style={{margin: 10}} variant="outlined" color="primary" onClick={handleClick}>
          Add a customer
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">New customer</DialogTitle>
          <DialogContent>

          <TextField
            autoFocus
            margin="dense"
            id="firstname"
            name="firstname"
            value={asiakas.firstname}
            onChange={inputChanged}
            label="First name"
            fullWidth
          />

          <TextField
            margin="dense"
            id="lastname"
            name="lastname"
            value={asiakas.lastname}
            onChange={inputChanged}
            label="Last name"

            fullWidth
          />

          <TextField
            margin="dense"
            id="email"
            name="email"
            value={asiakas.email}
            onChange={inputChanged}
            label="Email"
            fullWidth
          />

          <TextField
            margin="dense"
            id="phone"
            name="phone"
            value={asiakas.phone}
            onChange={inputChanged}
            label="Phone"
            fullWidth
          />


          <TextField
            margin="dense"
            id="streetaddress"
            name="streetaddress"
            value={asiakas.streetaddress}
            onChange={inputChanged}
            label="Street address"
            fullWidth
          />

          <TextField
            margin="dense"
            id="city"
            name="city"
            value={asiakas.city}
            onChange={inputChanged}
            label="City"
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
