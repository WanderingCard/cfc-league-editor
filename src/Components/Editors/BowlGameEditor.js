import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Grid2, InputLabel, MenuItem, Modal, OutlinedInput, Select, TextField, useAutocomplete } from '@mui/material';
import * as React from 'react';

export default function BowlGameEditor({ open, handleClose, gameInfo, onSubmit, conferenceNames, index }) {
    const [editValues, setEditValues] = React.useState(gameInfo);
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
        setEditValues(gameInfo);
        setName(gameInfo.name);
        setZipCode(gameInfo.zipcode);
        if (gameInfo.tieIn) {
            if (gameInfo.tieIn.first) {
                if (gameInfo.tieIn.first.constructor !== Array) {
                    var array = [gameInfo.tieIn.first]
                    setTieInOne(array);
                } else {
                    setTieInOne(gameInfo.tieIn.first);
                }
            } else {
                setTieInOne([]);
            }
            if (gameInfo.tieIn.second) {
                if (gameInfo.tieIn.second.constructor !== Array) {
                    var array = [gameInfo.tieIn.second]
                    setTieInTwo(array);
                } else {
                    setTieInTwo(gameInfo.tieIn.second);
                }
            } else {
                setTieInTwo([]);
            }
            console.log(tieInOne, tieInTwo);
        } else {
            setTieInOne([]);
            setTieInTwo([]);
        }
    }, [gameInfo]);

    const handleChange = (e) => {
        setEditValues({
            ...editValues,
            [e.target.name]: e.target.value,
        });
    };

    React.useEffect(() => {
        var tieInObject = {
            "first": tieInOne,
            "second": tieInTwo,
        }
        setEditValues({
            ...editValues,
            "tieIn": tieInObject
        });
    }, [tieInOne, tieInTwo])

    React.useEffect(() => {
        setEditValues({
            ...editValues,
            "name": gameName,
            "zipcode": gameZipCode
        });
    }, [gameName, gameZipCode])

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>Edit Bowl Game</DialogTitle>
            <DialogContent sx={{ marginTop: '5px', overflow: 'initial' }}>
                <Grid2 container spacing={2}>
                    <Grid2 item size={8}>
                        <TextField
                            label="Bowl Game Name"
                            name="name"
                            value={gameName ? gameName : ''}
                            onChange={(event) => setName(event.target.value)}
                            fullWidth
                            required
                        />
                    </Grid2>
                    <Grid2 item size={4}>
                        <TextField
                            label="Zip Code"
                            name="zipcode"
                            value={gameZipCode ? gameZipCode : ''}
                            onChange={(event) => setZipCode(event.target.value)}
                            fullWidth
                            required
                        />
                    </Grid2>
                    <Grid2 item size={6}>
                        <InputLabel id='tieInOne'>First Conference Tie-In</InputLabel>
                        <Select
                            labelId='tieInOne'
                            id='tieInOne'
                            multiple
                            value={tieInOne}
                            onChange={(event) => {
                                setTieInOne(event.target.value);
                            }}
                            fullWidth
                            MenuProps={MenuProps}
                            input={<OutlinedInput id='select-multiple-chip' label='chip' />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {tieInOne.map((name) => (
                                        <Chip key={name} label={name} />
                                    ))}
                                </Box>
                            )}
                        >
                            {conferenceNames.map((conference) => (
                                <MenuItem key={conference} value={conference}>
                                    {conference}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid2>
                    <Grid2 item size={6}>
                        <InputLabel id='tieInTwo'>Second Conference Tie-In</InputLabel>
                        <Select
                            labelId='tieIntwo'
                            id='tieInTwo'
                            multiple
                            value={tieInTwo}
                            onChange={(event) => {
                                setTieInTwo(event.target.value);
                            }}
                            fullWidth
                            MenuProps={MenuProps}
                            input={<OutlinedInput id='select-multiple-chip' label='chip' />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {tieInTwo.map((name) => (
                                        <Chip key={name} label={name} />
                                    ))}
                                </Box>
                            )}
                        >
                            {conferenceNames.map((conference) => (
                                <MenuItem key={conference} value={conference}>
                                    {conference}
                                </MenuItem>
                            ))}
                        </Select>
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
                    Submit
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