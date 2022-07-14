import React, { useState } from 'react'
import { useQuery, useMutation } from "react-query"
import { apiContacts } from "../api"
import CircularProgress from '@mui/material/CircularProgress';
import { makeStyles } from '@mui/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';



const useStyles = makeStyles({
    content: {
        display: 'flex',
    },
    list: {
        width: '600px',
        padding: '30px 20px',
        marginLeft: '50px'
    },
    form: {
        width: '600px',
        display: 'flex',
        flexDirection: 'column',
    },
    itemForm: {
        display: 'block',
        marginBottom: '20px'
    }
});



export const Content = () => {
    const classes = useStyles()

    const [contacts, setContacts] = useState([])
    const [error, setError] = useState('')


    const { isLoading, data, isSuccess, refetch, status
    } = useQuery(
        'contacts_list',
        () => apiContacts.getContacts(),
        {
            onSuccess: ({ data }) => {
                console.log(data)
                setContacts(data)
            },
            onError: (error) => {
                console.log(error)
                setError(error.message)
            },
            // select: ({ data }) => data.map(el => ({ ...el, phone: '+7 ' + el.phone })),
            // enabled: false,
        })


    const [newContact, setNewContact] = useState({  
        name: '',
        organization: '',
        phone: ''
    })


    const { mutateAsync } = useMutation(
        'set_contact',
        (newContact) => apiContacts.setContact(newContact),
        {
            onSuccess: (data) => {
                refetch()
            },
            onError: (error) => {
                console.log(error)
                setError(error.message)
            },
        }
    )

    const handleSubmit = async e => {
        e.preventDefault();
        await mutateAsync(newContact)
    }



    return (
        <div className={classes.content}>
            {
                isLoading ?
                    <CircularProgress />
                    :
                    <Paper elevation={3} className={classes.list}>
                        <h1>Contacts</h1>
                        <List >
                            {
                                contacts?.length &&
                                contacts?.map(el =>
                                    <ListItem disablePadding key={el.id}>
                                        <ListItemButton>
                                            <ListItemText primary={el.name} />
                                            <ListItemText primary={el.organization} />
                                            <ListItemText primary={el.phone} />
                                        </ListItemButton>
                                    </ListItem>
                                )
                            }
                        </List>
                        <Button fullWidth onClick={() => refetch()} variant="contained">show</Button>
                        {
                            error &&
                            <Alert severity="error">{error} <Button onClick={() => refetch()} variant="outlined">refetch</Button></Alert>
                        }
                    </Paper>

            }
            <Paper elevation={3} className={classes.list}>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField style={{marginBottom: '15px'}} value={newContact.name} onChange={e => setNewContact({ ...newContact, name: e.target.value })} label="Name" variant="outlined" />
                    <TextField style={{marginBottom: '15px'}} value={newContact.organization} onChange={e => setNewContact({ ...newContact, organization: e.target.value })} label="Organization" variant="outlined" />
                    <TextField style={{marginBottom: '15px'}} value={newContact.phone} onChange={e => setNewContact({ ...newContact, phone: e.target.value })} label="phone" variant="outlined" />
                    <Button type={'submit'} fullWidth variant="contained">create</Button>
                </form>
            </Paper>
        </div>
    )
}