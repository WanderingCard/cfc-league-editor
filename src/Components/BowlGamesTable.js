import { Edit } from '@mui/icons-material';
import { Icon, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import * as React from 'react';

export default function BowlGamesTable({ bowlGames }) {
    return (
        <Table component={Paper} sx={{maxWidth: '60vw', marginLeft: '20vw'}}>
            <TableHead sx={{ backgroundColor: 'lightgray' }}>
                <TableCell>Game</TableCell>
                <TableCell>Zip</TableCell>
                <TableCell>First Tie In</TableCell>
                <TableCell>Second Tie In</TableCell>
                <TableCell></TableCell>
            </TableHead>
            <TableBody component={Paper} sx={{height: '300sp', overflowY: 'scroll'}}>
                {bowlGames.map((game, i) => {
                    var tieIns = game.tieIn ? true : false;
                    var firstTieIn = '';
                    var secondTieIn = '';
                    if (tieIns && game.tieIn.first) {
                        if (game.tieIn.first.constructor === Array) {
                            firstTieIn = game.tieIn.first.join('\n');
                        } else {
                            firstTieIn = game.tieIn.first;
                        }
                    }
                    if (tieIns && game.tieIn.second) {
                        if (game.tieIn.second.constructor === Array) {
                            secondTieIn = game.tieIn.second.join('\n');
                        } else {
                            secondTieIn = game.tieIn.second;
                        }
                    }
                    return (
                        <TableRow>
                            <TableCell>{game.name}</TableCell>
                            <TableCell>{game.zipcode}</TableCell>
                            <TableCell><pre>{firstTieIn}</pre></TableCell>
                            <TableCell><pre>{secondTieIn}</pre></TableCell>
                            <TableCell>
                                <IconButton aria-label='edit'
                                    onClick={() => console.log('Clicked Edit for the ' + bowlGames[i].name)}
                                >
                                    <Edit />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}
