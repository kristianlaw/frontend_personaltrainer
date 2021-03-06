import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Snackbar from '@material-ui/core/Snackbar';
import AddTreeni from './addTreeni';
import Button from '@material-ui/core/Button';



export default function Treenilista() {
    const [treeni, setTreeni] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
           getTreeni();
       },       [])

       //Fetchaa treenit API:sta
    const getTreeni = () => {
      fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => setTreeni(data.content))
        .catch(err => console.error(err))
    }

    const handleClose = () => {
        setOpen(false);
    }

    //Lisää treenin
    const addTreeni = (treeni) => {
      fetch ('https://customerrest.herokuapp.com/api/trainings',
      {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(treeni)
      }
    )
      .then(_ => getTreeni())
      .catch(err => console.error(err))
    }


    const deleteTreeni = (link) => {
        if (window.confirm('Do you want to delete this trainingsession?')) {
            fetch(link, {method: 'DELETE'})
            .then(_ => getTreeni())
            .then(_ => {
            setOpen(true);
            })
            .catch(err => console.error(err))
        }
    }


    const kolumnit = [
            {
                Header: "Training",
                accessor: "activity"
            },
            {
                Header: "Date",
                accessor: "date"
            },
            {
                Header: "Minutes",
                accessor: "duration"
            },
            {
                Header: "Name",
                accessor: "links[2].href" //Parempi kuin [0] imo, näytttää /customerin
            },
            {
                filterable: false,
                sortable: false,
                width: 100,
                Cell: row => (<Button color="secondary" onClick={() => deleteTreeni(row.original.links[0].href)}>Delete</Button>)
            }

        ]


        return(
        <div>
            <AddTreeni addTreeni={addTreeni} />
            <ReactTable defaultPageSize={14}  filterable={true} data={treeni} columns={kolumnit} />
            <Snackbar
                open={open}
                autoHideDuration={2500}
                onClose={handleClose}
                message='Trainingsession deleted!'
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
            />
        </div>
    )
}
