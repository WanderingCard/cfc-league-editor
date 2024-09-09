import { Delete, Edit } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Icon, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import * as React from 'react';
import BowlGameEditor from '../Editors/BowlGameEditor';

export default function BowlGamesTable({ bowlGames, conferenceNames, editSubmit, setBowlGames }) {
    const [editorOpen, setEditorOpen] = React.useState(false);
    const [editorInfo, setEditorInfo] = React.useState({});
    const [editorIndex, setEditorIndex] = React.useState(-1);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = React.useState(false);
    const [deleteGame, setDeleteGame] = React.useState('');

    function handleEditorClick(index) {
        setEditorInfo(bowlGames[index]);
        setEditorOpen(true);
        setEditorIndex(index);
    }

    function handleDelete() {
        if(deleteGame) {
            setBowlGames(bowlGames.filter(game => game.name !== deleteGame.name));
            setDeleteConfirmationOpen(false);
        }
    }

    const handleDeleteConfirmationOpen = (game) => {
        setDeleteGame(game);
        setDeleteConfirmationOpen(true);
    }

    const handleDeleteConfirmationClose = () => {
        setDeleteConfirmationOpen(false);
    }

    return (
        <div>
           <TableContainer sx={{ marginLeft: '20vw', height: '75vh', maxWidth: '60vw' }}>
            <Table component={Paper} stickyHeader>
                    <TableHead sx={{ backgroundColor: 'lightgray' }}>
                        <TableCell>Game</TableCell>
                        <TableCell>Zip</TableCell>
                        <TableCell>First Tie In</TableCell>
                        <TableCell>Second Tie In</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableHead>
                    <TableBody component={Paper} sx={{ height: '300sp', overflowY: 'scroll' }}>
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
                                            onClick={() => handleEditorClick(i)}
                                        >
                                            <Edit />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton aria-label='delete'
                                            onClick={() => handleDeleteConfirmationOpen(game)}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <BowlGameEditor
                open={editorOpen}
                gameInfo={editorInfo}
                handleClose={() => setEditorOpen(false)}
                conferenceNames={conferenceNames}
                onSubmit={editSubmit}
                index={editorIndex}
            />

            <Dialog open={deleteConfirmationOpen} onClose={handleDeleteConfirmationClose}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        Are you sure you want to delete the {deleteGame.name ? deleteGame.name : ''} ?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteConfirmationClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
