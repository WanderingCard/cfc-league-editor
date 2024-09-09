import { Delete, Edit, KeyboardArrowDown, KeyboardArrowUp, Square } from '@mui/icons-material';
import { Box, Collapse, Grid2, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import * as React from 'react';

function Row({ team }) {
    const [open, setOpen] = React.useState(false);
    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label={`Expand ${team.name} row`}
                        size='small'
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                </TableCell>
                <TableCell>{team.abbreviation}</TableCell>
                <TableCell>{team.name}</TableCell>
                <TableCell>{team.mascot}</TableCell>
                <TableCell style={{alignContent: 'center', width: '10%'}}>
                    <Square style={{ color: team.primaryColor, paddingRight: '10px' }}/>
                    <Typography variant='p'>{team.primaryColor}</Typography>
                </TableCell>
                <TableCell style={{alignContent: 'center', width: '10%'}}>
                    <Square style={{ color: team.secondaryColor, paddingRight: '10px'  }} />
                    {team.secondaryColor}
                </TableCell>
                <TableCell>{team.zipcode}</TableCell>
                <TableCell>{team.attributes.prestige}</TableCell>
                <TableCell>{team.attributes.totalLevels}</TableCell>
                <TableCell>{team.rivalAbbreviation}</TableCell>
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
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                    <Collapse in={open} timeout={'auto'} unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant='h6' gutterBottom component='div'>
                                {`${team.name} School Attributes`}
                            </Typography>
                            <Table size='small' aria-label={`${team.name} attribute table`}>
                                <TableHead style={{ backgroundColor: 'lightgray' }}>
                                    <TableRow>
                                        <TableCell>Attribute</TableCell>
                                        <TableCell>Value</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Facilities</TableCell>
                                        <TableCell>{team.attributes.facilities}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Stadium</TableCell>
                                        <TableCell>{team.attributes.stadium}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>College Life</TableCell>
                                        <TableCell>{team.attributes.collegeLife}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Academics</TableCell>
                                        <TableCell>{team.attributes.academics}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Marketing</TableCell>
                                        <TableCell>{team.attributes.marketing}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Enrollment</TableCell>
                                        <TableCell>{team.attributes.attendance}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Fanbase Level</TableCell>
                                        <TableCell>{team.attributes.fanbaseLevel}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Archtype</TableCell>
                                        <TableCell>{team.archetype}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>FanbaseType</TableCell>
                                        <TableCell>{team.fanbaseType}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment >
    )
}

export default function TeamTable({ teams }) {
    return (
        <div>
            <TableContainer sx={{ marginLeft: '10vw', height: '75vh', maxWidth: '80vw', overflowX: 'scroll' }}>
                <Table component={Paper} stickyHeader>
                    <TableHead sx={{ backgroundColor: 'lightgray'}}>
                        <TableCell style={{textAlign: 'center'}}></TableCell>
                        <TableCell style={{textAlign: 'center'}}>Abbreviation</TableCell>
                        <TableCell style={{textAlign: 'center'}}>Team</TableCell>
                        <TableCell style={{textAlign: 'center'}}>Mascot</TableCell>
                        <TableCell style={{textAlign: 'center'}}>Primary Color</TableCell>
                        <TableCell style={{textAlign: 'center'}}>Secondary Color</TableCell>
                        <TableCell style={{textAlign: 'center'}}>Location Zipcode</TableCell>
                        <TableCell style={{textAlign: 'center'}}>Prestige</TableCell>
                        <TableCell style={{textAlign: 'center'}}>Total Levels</TableCell>
                        <TableCell style={{textAlign: 'center'}}>Rival Abbreviation</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableHead>
                    <TableBody component={Paper} sx={{ height: '300sp', overflowY: 'scroll' }}>
                        {teams.map((team) => {
                            return (
                                <Row key={team.name} team={team} />
                                // <TableRow>
                                //     <TableCell>{team.name}</TableCell>
                                //     <TableCell>{team.mascot}</TableCell>
                                //     <TableCell>{team.abbreviation}</TableCell>
                                //     <TableCell>
                                //         <Square style={{ color: team.primaryColor }} />
                                //         {team.primaryColor}
                                //     </TableCell>
                                //     <TableCell>
                                //         <Square style={{ color: team.secondaryColor }} />
                                //         {team.secondaryColor}
                                //     </TableCell>
                                //     <TableCell>{team.zipcode}</TableCell>
                                //     <TableCell>{team.attributes.prestige}</TableCell>
                                //     <TableCell>{team.attributes.facilities}</TableCell>
                                //     <TableCell>{team.attributes.stadium}</TableCell>
                                //     <TableCell>{team.attributes.collegeLife}</TableCell>
                                //     <TableCell>{team.attributes.academics}</TableCell>
                                //     <TableCell>{team.attributes.marketing}</TableCell>
                                //     <TableCell>{team.attributes.attendance}</TableCell>
                                //     <TableCell>{team.attributes.fanbaseLevel}</TableCell>
                                //     <TableCell>{team.archetype}</TableCell>
                                //     <TableCell>{team.fanbaseType}</TableCell>
                                //     <TableCell>{team.rivalAbbreviation}</TableCell>
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
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}