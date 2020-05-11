import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import AddAsiakas from './addAsiakas';
import EditAsiakas from './editAsiakas';
import AddTreeni from './addTreeni';
import TextField from '@material-ui/core/TextField';

export default function Asiakaslista() {
  const [asiakas, setAsiakas] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getAsiakas();
  }
   , []);

  const getAsiakas = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(response => response.json())
    .then(data => setAsiakas(data.content))
    .catch(err => console.error(err))
  }


  const deleteAsiakas = (link) => {
      if (window.confirm('Do you want to delete a customer?')) {
        fetch(link, {method: 'DELETE'})
            .then(_ => getAsiakas())
            .then(_ => {
             setOpen(true);

            })
            .catch(err => console.error(err))
      }
  }

  const addAsiakas = (asiakas) => {
    fetch ('https://customerrest.herokuapp.com/api/customers',
    {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(asiakas)
    }
  )
    .then(_ => getAsiakas())
    .catch(err => console.error(err))
  }


  const getTreenini = () => {

  }


  const handleClose = () => {
    setOpen(false);
  }

  const updateAsiakas = (asiakas, link) => {
    fetch(link, {
      method: 'PUT',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(asiakas)
      })
      .then(_ => getAsiakas())
      .catch(err => console.error(err))
  }


  const kolumnit = [
    {
      title: 'Firstname',
      field: 'firstname'
    },
    {
      title: 'Lastname',
      field: 'lastname'
    },
    {
      title: 'Email',
      field: 'email'
    },
    {
      title: 'Phone',
      field: 'phone'
    },
    {
      title: 'Address',
      field: 'streetaddress'
    },
    {
      title: 'City',
      field: 'city'
    },
    {
      filterable: false,
      sortable: false,
      width: 100,
      Cell: row => (<EditAsiakas updateAsiakas={updateAsiakas} asiakas={row.original} />)
    },
    {
      filterable: false,
      sortable: false,
      width: 100,
      Cell: row => (<button onClick={() => deleteAsiakas(row.original.links[0].href)}>Delete</button>)
    }
  ]

  return (
    <div>
      <AddAsiakas addAsiakas={addAsiakas}/>
      <ReactTable filterable={true} data={asiakas} columns={kolumnit} />
      <Snackbar
      open={open}
      autoHideDuration={2500}
      onClose={handleClose}
      message='Customer deleted!'
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      />
    
    </div>
  )
}
