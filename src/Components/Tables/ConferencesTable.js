import { ArrowForward, Cancel, Delete, Edit, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { Box, Collapse, Icon, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import * as React from 'react';

function getConferenceFormat(conference) {
    if (conference.divisions.length === 1) {
        return "No Divisons"
    } else if (conference.divisions.length === 2) {
        return "Two Divisions"
    } else if (conference.divisions.length === 4) {
        return "Pods"
    } else {
        return "N/A"
    }
}

function countTeams(conference) {
    var total = 0;
    for (var i = 0; i < conference.divisions.length; i++) {
        total += conference.divisions[i].teams.length;
    }
    return total;
}

function Row({ conference }) {
    const [open, setOpen] = React.useState(false);
    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label={`Expand ${conference.name} row`}
                        size='small'
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                </TableCell>
                <TableCell>{conference.name}</TableCell>
                <TableCell>{conference.prestigeLevel}</TableCell>
                <TableCell>{conference.zipcode}</TableCell>
                <TableCell>{getConferenceFormat(conference)}</TableCell>
                <TableCell>{countTeams(conference)}</TableCell>
                <TableCell>
                    <IconButton>
                        <Edit />
                    </IconButton>
                </TableCell>
                <TableCell>
                    <IconButton>
                        <Delete />
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                    <Collapse in={open} timeout={'auto'} unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant='h5' gutterBottom component='div'>
                                {`${conference.name} Teams`}
                            </Typography>
                            {conference.divisions.map((division) => (
                                <>
                                    {conference.divisions.length > 1 && 
                                    <Typography variant='h6' style={{justifyContent: 'center', paddingTop: '20px', paddingBottom: '20px'}}>
                                        {conference.divisions.length === 2 ? `${division.name} Division` : `${division.name} Pod`}
                                    </Typography> }
                                    <Table size='small' aria-label={`${division.name} team table`} style={{ }}>
                                        <TableHead style={{backgroundColor: 'lightgray'}}>
                                            <TableRow>
                                                <TableCell>Abbrev.</TableCell>
                                                <TableCell>Team</TableCell>
                                                <TableCell>Mascott</TableCell>
                                                <TableCell>Prestige</TableCell>
                                                <TableCell>Rival</TableCell>
                                                <TableCell colSpan={2}></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {division.teams.map((team) => (
                                                <TableRow>
                                                    <TableCell>{team.abbreviation}</TableCell>
                                                    <TableCell>{team.name}</TableCell>
                                                    <TableCell>{team.mascot}</TableCell>
                                                    <TableCell>{team.attributes.prestige}</TableCell>
                                                    <TableCell>{team.rivalAbbreviation}</TableCell>
                                                    <TableCell>
                                                        <IconButton>
                                                            <Cancel />
                                                        </IconButton>
                                                    </TableCell>
                                                    <TableCell>
                                                        <IconButton>
                                                            <ArrowForward />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </>
                            ))}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

export default function ConferencesTable({ conferences }) {
    return (
        <div>
            <TableContainer sx={{ marginLeft: '20vw', height: '75vh', maxWidth: '60vw' }}>
                <Table component={Paper} stickyHeader>
                    <TableHead sx={{ backgroundColor: 'lightgray' }}>
                        <TableCell></TableCell>
                        <TableCell>Conference</TableCell>
                        <TableCell>Prestige Level</TableCell>
                        <TableCell>CCG Zipcode</TableCell>
                        <TableCell>Format</TableCell>
                        <TableCell>Team Count</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableHead>
                    <TableBody component={Paper} sx={{ height: '300sp', overflowY: 'scroll' }}>
                        {conferences.map((conference) => {
                            return (
                                // <TableRow>
                                //     <TableCell>{conference.name}</TableCell>
                                //     <TableCell>{conference.prestigeLevel}</TableCell>
                                //     <TableCell>{conference.zipcode}</TableCell>
                                //     <TableCell>{getConferenceFormat(conference)}</TableCell>
                                //     <TableCell>{countTeams(conference)}</TableCell>
                                //     <TableCell>
                                //         <IconButton>
                                //             <Edit />
                                //         </IconButton>
                                //     </TableCell>
                                //     <TableCell>
                                //         <IconButton>
                                //             <Delete />
                                //         </IconButton>
                                //     </TableCell>
                                // </TableRow>
                                <Row key={conference.name} conference={conference} />
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}