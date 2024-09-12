import { Business, Celebration, Groups, Money, PartyMode, School, Square, Stadium, Tv } from '@mui/icons-material';
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid2, InputLabel, Menu, MenuItem, Modal, OutlinedInput, Paper, Select, TextField, Typography, useAutocomplete } from '@mui/material';
import * as React from 'react';
import * as Zipcodes from 'zipcodes'
import MySlider from '../Inputs/MySlider';
import { ARCHETYPES } from '../Definitions/Archetypes';

export default function TeamEditor({ open, handleClose, teamInfo, onSubmit, index }) {
    const [editValues, setEditValues] = React.useState({});
    const [teamArchtype, setArchtype] = React.useState('');
    const [fanbaseType, setFanbaseType] = React.useState('');
    const [attendance, setAttendance] = React.useState(0)
    const [locationError, setLocationError] = React.useState(false);

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 48 * 4.5 + 8,
                width: 250,
            }
        }
    }

    const attributes = [
        {
            label: "Stadium",
            value: 'stadium',
            icon: <Stadium />,
            min: 1,
            max: 10,
            step: 1,
        },
        {
            label: "Facilities",
            value: 'facilities',
            icon: <Business />,
            min: 1,
            max: 10,
            step: 1,
        },
        {
            label: "College Life",
            value: 'collegeLife',
            icon: <Celebration />,
            min: 1,
            max: 10,
            step: 1,
        },
        {
            label: "Academics",
            value: 'academics',
            icon: <School />,
            min: 1,
            max: 10,
            step: 1,
        },
        {
            label: "Marketing",
            value: 'marketing',
            icon: <Tv />,
            min: 1,
            max: 10,
            step: 1,
        },
    ]

    React.useEffect(() => {
        setEditValues(teamInfo);
        setArchtype(teamInfo.archetype);
        setAttendance(teamInfo.attributes ? teamInfo.attributes.attendance : 0)
    }, [teamInfo]);

    React.useEffect(() => {
        setEditValues({
            ...editValues,
            "fanbaseType": fanbaseType,
            "archetype": teamArchtype,
            "attributes": {
                ...editValues.attributes,
                "attendance": attendance,
            }
        })
    }, [fanbaseType, teamArchtype, attendance])

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

    const changeAttribute = (attribute, newValue) => {
        setEditValues({
            ...editValues,
            "attributes": {
                ...editValues.attributes,
                [attribute]: newValue
            }
        })
    }

    function getLocationName(zipcode) {
        var output = '';
        if (zipcode.length < 5)
            return ""
        else if (zipcode.length > 5) {
            return "Invalid Zipcode"
        }
        var locationObject = Zipcodes.lookup(zipcode);
        if (locationObject)
            output = locationObject.city + ", " + locationObject.state;
        else
            return "Not Found"
        return output
    }

    const handleBlur = (attribute) => {
        if (editValues.attributes[attribute] < 0) {
            changeAttribute(attribute, 0)
        } else if (editValues.attributes[attribute] > 10) {
            changeAttribute(attribute, 0)
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth='md'
        >
            <DialogTitle>Edit {teamInfo.name || 'Add New Team'}</DialogTitle>
            <DialogContent sx={{ marginTop: '5px', overflowY: 'scroll' }}>
                <Grid2 container spacing={3} component={Paper} padding={'10px'}>
                    <Grid2 item size={12}>
                        <Typography variant='h5' style={{ backgroundColor: 'lightblue', padding: '10px' }}>General Team Info</Typography>
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
                        <Square style={{ color: editValues.primaryColor, backgroundColor: 'black', height: '30px', width: '30px', marginTop: '15px' }} />
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
                        <Square style={{ color: editValues.secondaryColor, backgroundColor: 'black', height: '30px', width: '30px', marginTop: '15px' }} />
                    </Grid2>
                    <Grid2 item size={3}>
                        <TextField
                            label="Prestige (1-10)"
                            name='prestige'
                            value={editValues.attributes ? editValues.attributes.prestige : ''}
                            onChange={(event) => handleAttributeChange(event)}
                            fullWidth
                            required
                            error={editValues.attributes ? (editValues.attributes.prestige < 1 || editValues.attributes.prestige > 10) : false}
                            helperText={editValues.atributes && (editValues.attributes.prestige < 1 || editValues.attributes.prestige > 10) ? 'Value must be between 1 and 10' : ''}
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
                    <Grid2 item size={4}>
                        <FormControl fullWidth>
                            <InputLabel id='attendance-label'>Attendance</InputLabel>
                            <Select
                                label='attendance'
                                name='attendance'
                                value={attendance}
                                onChange={(event) => setAttendance(event.target.value)}
                                fullWidth
                                MenuProps={MenuProps}
                            >
                                {[...Array(80)].map((_, i) => (
                                    <MenuItem key={(i + 1) * 1000} value={(i + 1) * 1000}>
                                        {(i + 1) * 1000}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid2>
                </Grid2>
                <Paper style={{ width: '98%', padding: '10px', marginTop: '10px' }}>
                    <Typography variant='h5' marginBottom={'10px'} style={{ backgroundColor: 'lightblue', padding: '10px' }}>Team Attributes</Typography>
                    <Box style={{ width: '90%', padding: '10px' }}>
                            <Grid2 container spacing={2}>
                                <Grid2 item size={6}>
                                <FormControl fullWidth>
                                    <InputLabel id='archetype'>Archetype</InputLabel>
                                    <Select
                                        labelId='archetype'
                                        id='archetype'
                                        label='Archetype '
                                        value={teamArchtype || ''}
                                        onChange={(event) => {
                                            setArchtype(event.target.value);
                                        }}
                                        fullWidth
                                        MenuProps={MenuProps}
                                    >
                                        {ARCHETYPES.map((arc) => (
                                            <MenuItem key={arc.id} value={arc.id}>
                                                {arc.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    </FormControl>
                                </Grid2>
                                {attributes.map((i) => (
                                    <Grid2 item size={6}>
                                        <MySlider
                                            value={editValues.attributes ? editValues.attributes[i.value] : 0}
                                            label={i.label}
                                            icon={i.icon}
                                            min={i.min}
                                            max={i.max}
                                            stepBy={i.step}
                                            name={i.value}
                                            handleChange={(event) => handleAttributeChange(event)}
                                            handleBlur={() => handleBlur(i.value)}
                                            modifier={(teamArchtype && teamArchtype !== '') ? ARCHETYPES[ARCHETYPES.findIndex(x => x.id === teamArchtype)][i.value] : 0}
                                        />
                                    </Grid2>
                                ))}
                                <Grid2 item size={6}>
                                    Fanbase Rating
                                </Grid2>
                                <Grid2 item size={6}>
                                    <FormControl fullWidth>
                                    <InputLabel id='fanbaseType-id'>Fanbase Type</InputLabel>
                                    <Select
                                        labelId='fanbaseType-id'
                                        id='fanbaseType'
                                        label='Fanbase Type'
                                        value={teamArchtype || ''}
                                        onChange={(event) => {
                                            setArchtype(event.target.value);
                                        }}
                                        fullWidth
                                        MenuProps={MenuProps}
                                    >
                                        {ARCHETYPES.map((arc) => (
                                            <MenuItem key={arc.id} value={arc.id}>
                                                {arc.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    </FormControl>
                                </Grid2>
                            </Grid2>
                    </Box>
                </Paper>
            </DialogContent>
            <DialogActions>
                <Button
                    variant='contained'
                    type='submit'
                    onClick={onSubmit ? () => {
                        onSubmit(index, editValues)
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