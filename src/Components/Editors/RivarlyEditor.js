import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Grid2, InputLabel, MenuItem, Modal, OutlinedInput, Select, TextField, useAutocomplete } from '@mui/material';
import * as React from 'react';

export default function RivarlyGameEditor({ open, handleClose, gameInfo, onSubmit, index }) {
    const MAX_CADENCE = 10;
    const [editValues, setEditValues] = React.useState(gameInfo);

    const [teamA, setTeamA] = React.useState('');
    const [teamB, setTeamB] = React.useState('');
    const [scheduleSlot, setScheduleSlot] = React.useState(0);
    const [cadence, setCadence] = React.useState(0);
    const [teams, setTeams] = React.useState([]);

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 48 * 4.5 + 8,
                width: 250,
            }
        }
    }

    React.useEffect(() => {
        setTeamA(gameInfo.teamA);
        setTeamB(gameInfo.teamB);
        setScheduleSlot(gameInfo.preferredSlot);
        setCadence(gameInfo.cadence);
        let teamList = JSON.parse(window.sessionStorage.getItem('Teams'));
        if (teamList !== null)
            setTeams(JSON.parse(window.sessionStorage.getItem('Teams')));
        else
            setTeams([]);
    }, [gameInfo]);

    React.useEffect(() => {
        console.log(teams);
    }, [teams])

    const handleChange = (e) => {
        setEditValues({
            ...editValues,
            [e.target.name]: e.target.value,
        });
    };

    React.useEffect(() => {
        setEditValues({
            ...editValues,
            "teamA": teamA,
            "teamB": teamB,
            "preferredSlot": scheduleSlot,
            "cadence": cadence
        });
    }, [teamA, teamB, scheduleSlot, cadence])

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>Edit Rivarly Game</DialogTitle>
            <DialogContent sx={{ marginTop: '5px', overflow: 'initial' }}>
                <Grid2 container spacing={2}>
                    <Grid2 item size={6}>
                        <InputLabel id='teamAId'>Team One</InputLabel>
                        <Select
                            labelId='teamAId'
                            id='teamA'
                            value={teamA}
                            onChange={(event) => {
                                setTeamA(event.target.value);
                            }}
                            fullWidth
                            MenuProps={MenuProps}
                        >
                            {(teams.length !== 0) && teams.map((team, i) => (
                                <MenuItem key={team.abbreviation} value={team.abbreviation}>
                                    {team.name + " " + team.mascot + "(" + team.abbreviation + ")"}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid2>
                    <Grid2 item size={6}>
                        <InputLabel id='teamBId'>Team Two</InputLabel>
                        <Select
                            labelId='teamBId'
                            id='teamB'
                            value={teamB}
                            onChange={(event) => {
                                setTeamB(event.target.value);
                            }}
                            fullWidth
                            MenuProps={MenuProps}
                        >
                            {teams.length !== 0 && teams.map((team) => (
                                <MenuItem key={team.abbreviation} value={team.abbreviation}>
                                    {team.name + " " + team.mascot + "(" + team.abbreviation + ")"}
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