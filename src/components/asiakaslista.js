import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Snackbar from '@material-ui/core/Snackbar';
import AddAsiakas from './addAsiakas';
import EditAsiakas from './editAsiakas';
import AddTreeni from './addTreeni';
import Button from '@material-ui/core/Button';

export default function Asiakaslista() {
  const [asiakas, setAsiakas] = useState([]);
  const [käyttäjä, setKäyttäjä] = useState('');
  const [treeni, setTreeni] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getAsiakas();
  },
    []);

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


  const getTreeni = () => {
    fetch (käyttäjä)
            .then(response => response.json())
            .then(data => setTreeni(data.content))
            .catch(err => console.error(err))
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
      .then(_ => {
          setOpen(true);
        })
      .catch(err => console.error(err))
  }

  const addTreeni = (treeni) => {
       fetch(käyttäjä,
           {
               method: 'POST',
               headers: {
                   'Content-Type':'application/json'
               },
               body: JSON.stringify(treeni)
           }
       )
       .then(_ => getTreeni())
       .then(_ => {
           setOpen(true);
       })
       .catch(err => console.error(err))
   }



  const kolumnit = [
    {
      Header: 'First name',
      accessor: 'firstname'
    },
    {
      Header: 'Last name',
      accessor: 'lastname'
    },
    {
      Header: 'Email',
      accessor: 'email'
    },
    {
      Header: 'Phone',
      accessor: 'phone'
    },
    {
      Header: 'Address',
      accessor: 'streetaddress'
    },
    {
      Header: 'City',
      accessor: 'city'
    },
    {
      filterable: false,
      sortable: false,
      width: 100,
      Cell: row => (<EditAsiakas updateAsiakas={updateAsiakas} asiakas={row.original} />)
    },
    {
      sortable: false,
      filterable: false,
      Cell: row => (<Button onClick={() => setKäyttäjä(row.original.links[2].href)}>
      <AddTreeni addTreeni={addTreeni} />

      </Button>)
    },
    {
      filterable: false,
      sortable: false,
      width: 100,
      Cell: row => (<Button color="secondary" onClick={() => deleteAsiakas(row.original.links[0].href)}>Delete</Button>)
    }
  ]

  return (
    <div>
      <AddAsiakas addAsiakas={addAsiakas}/>
      <ReactTable defaultPageSize={14} filterable={true} data={asiakas} columns={kolumnit} />
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
