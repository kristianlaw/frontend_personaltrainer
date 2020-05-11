import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function EditAsiakas(props) {
  const [open, setOpen] = React.useState(false);
  const [asiakas, setAsiakas] = useState({firstname:'', lastname:'', email:'', phone:'', streetaddress:'', city:''});

  const handleClickOpen = () => {
    setAsiakas({firstname: props.asiakas.firstname, lastname: props.asiakas.lastname, email: props.asiakas.email,
        phone: props.asiakas.phone, streetaddress: props.asiakas.streetaddress, city: props.asiakas.city });
    setOpen(true);
  }

  const handleClose = () => {
    props.updateAsiakas(props.asiakas.links[0].href, asiakas);
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
      <Button color="primary" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} disableBackdropClick={true} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit customer</DialogTitle>
        <DialogContent>

          <TextField
            autoFocus
            margin="dense"
            id="firstname"
            name="firstname"
            value={asiakas.firstname}
            onChange={inputChanged}
            label="Firstname"
            fullWidth
          />

          <TextField
            margin="dense"
            id="lastname"
            name="lastname"
            value={asiakas.lastname}
            onChange={inputChanged}
            label="Lastname"

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
            label="Streetaddress"
            fullWidth
          />

          <TextField
            margin="dense"
            id="city"
            name="city"
            value={asiakas.city}
            onChange={inputChanged}
            label="city"
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
