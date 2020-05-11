import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Snackbar from '@material-ui/core/Snackbar';
import AddTreeni from './addTreeni';
import Moment from 'react-moment';


export default function Treenilista() {
    const [treeni, setTreeni] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
           getTreeni();
       },
       [])

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

    const deleteTreeni = (link) => {
        if (window.confirm('Do you want to delete a training?')) {
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
                Header: "Activity",
                accessor: "activity"
            },
            {
                Header: "Date",
                Cell: row => (<Moment format="YYYY MMM D" withTitle>{"date"}</Moment>)
            },
            {
                Header: "Min",
                accessor: "duration"
            },
            {
                Header: "Customer",
                accessor: "links[0].href"
            },
            {
                filterable: false,
                sortable: false,
                width: 100,
                Cell: row => (<button onClick={() => deleteTreeni(row.original.links[0].href)}>Delete</button>)
            }

        ]


        return(
        <div>
            <ReactTable defaultPageSize={10}  filterable={true} data={treeni} columns={kolumnit} />
            <Snackbar
                open={open}
                autoHideDuration={2500}
                onClose={handleClose}
                message='Training deleted!'
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
            />
        </div>
    )
}
