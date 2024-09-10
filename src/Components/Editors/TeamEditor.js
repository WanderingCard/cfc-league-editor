import { Square } from '@mui/icons-material';
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Grid2, InputLabel, MenuItem, Modal, OutlinedInput, Paper, Select, TextField, Typography, useAutocomplete } from '@mui/material';
import * as React from 'react';
import * as Zipcodes from 'zipcodes'

export default function TeamEditor({ open, handleClose, teamInfo, onSubmit, index }) {
    const [editValues, setEditValues] = React.useState({});
    const [tieInOne, setTieInOne] = React.useState([]);
    const [tieInTwo, setTieInTwo] = React.useState([]);

    const [gameName, setName] = React.useState('');
    const [gameZipCode, setZipCode] = React.useState('');

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 48 * 4.5 + 8,
                width: 250,
            }
        }
    }

    React.useEffect(() => {
        setEditValues(teamInfo);
    }, [teamInfo]);

    const handleChange = (e) => {
        setEditValues({
            ...editValues,
            [e.target.name]: e.target.value,
        });
    };

    const handleAttributeChange = (e) => {
        setEditValues({
            ...editValues,
            "attributes": {
                ...editValues.attributes,
                [e.target.name]: e.target.value
            }
        })
    }

    function getLocationName (zipcode) {
        var output = '';
        var locationObject = Zipcodes.lookup(zipcode);
        if(locationObject)
            output = locationObject.city + ", " + locationObject.state;
        else
            return "Pending"
        return output
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth='md'
        >
            <DialogTitle>Edit {teamInfo.name || 'Add New Team'}</DialogTitle>
            <DialogContent sx={{ marginTop: '5px', overflow: 'initial' }}>
                <Grid2 container spacing={3} component={Paper} padding={'10px'}>
                    <Grid2 item size={12}>
                        <Typography variant='h5'>General Team Info</Typography>
                    </Grid2>
                    <Grid2 item size={4}>
                       <TextField
                            label="Team Name"
                            name="name"
                            value={editValues.name || ''}
                            onChange={(event) => handleChange(event)}
                            fullWidth
                            required
                       />
                    </Grid2>
                    <Grid2 item size={4}>
                       <TextField
                            label="Team Mascot"
                            name='mascot'
                            value={editValues.mascot || ''}
                            onChange={(event) => handleChange(event)}
                            fullWidth
                            required
                       />
                    </Grid2>
                    <Grid2 item size={4}>
                       <TextField
                            label="Abbreviation"
                            name='abbreviation'
                            value={editValues.abbreviation || ''}
                            onChange={(event) => handleChange(event)}
                            fullWidth
                            required
                       />
                    </Grid2>
                    <Grid2 item size={3}> 
                       <TextField
                            label="Primary Color"
                            name='primaryColor'
                            value={editValues.primaryColor || ''}
                            onChange={(event) => handleChange(event)}
                            fullWidth
                            required
                       />
                    </Grid2>
                    <Grid2 item size={1}> 
                        <Square style={{color: editValues.primaryColor, backgroundColor: 'black', height: '30px', width: '30px', marginTop: '15px'}}/>
                    </Grid2>
                    <Grid2 item size={3}> 
                       <TextField
                            label="Secondary Color"
                            name='secondaryColor'
                            value={editValues.secondaryColor || ''}
                            onChange={(event) => handleChange(event)}
                            fullWidth
                            required
                       />
                    </Grid2>
                    <Grid2 item size={1}> 
                        <Square style={{color: editValues.secondaryColor, backgroundColor: 'black', height: '30px', width: '30px', marginTop: '15px'}}/>
                    </Grid2>
                    <Grid2 item size={3}>
                       <TextField
                            label="Prestige (1-10)"
                            name='prestige'
                            value={editValues.attributes.prestige || ''}
                            onChange={(event) => handleAttributeChange(event)}
                            fullWidth
                            required
                            error={(editValues.attributes.prestige < 1 || editValues.attributes.prestige > 10)}
                            helperText={(editValues.attributes.prestige < 1 || editValues.attributes.prestige > 10) ? 'Value must be between 1 and 10' : ''}
                       />
                    </Grid2>
                    <Grid2 item size={1} />
                    <Grid2 item size={3}>
                       <TextField
                            label="Zipcode"
                            name='zipcode'
                            value={editValues.zipcode || ''}
                            onChange={(event) => handleChange(event)}
                            fullWidth
                            required
                       />
                    </Grid2>
                    <Grid2 item size={4}>
                       <TextField
                            label="Location"
                            name='location'
                            value={editValues.zipcode ? getLocationName(editValues.zipcode) : 'N/A'}
                            onChange={(event) => handleChange(event)}
                            fullWidth
                       />
                    </Grid2>
                </Grid2>
                <Grid2 container spacing={3} component={Paper} padding={'10px'} marginTop={'10px'}>
                    <Grid2 item size={12}>
                        <Typography variant='h5'>Team Attributes</Typography>
                    </Grid2>
                </Grid2>
            </DialogContent>
            <DialogActions>
                <Button
                    variant='contained'
                    type='submit'

                    onClick={onSubmit ? () => {
                        onSubmit(index, editValues)
                        console.log(editValues)
                        handleClose()
                    } : console.log('click')
                    }
                >
                    Save
                </Button>
                <Button
                    variant='contained'

                    onClick={handleClose ? handleClose : console.log('click')}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}