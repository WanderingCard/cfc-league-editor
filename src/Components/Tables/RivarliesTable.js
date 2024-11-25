import * as React from 'react';
import { Delete, Edit } from '@mui/icons-material';
import { Table, TableCell, TableBody, TableContainer, TableRow, Paper, TableHead, IconButton, Dialog, DialogTitle, DialogContent, Typography, Button, DialogActions} from '@mui/material';
import RivarlyGameEditor from '../Editors/RivarlyEditor';

export default function RivarlyTable({rivarlies, editSubmit, setRivarlies}) {
    const [editorOpen, setEditorOpen] = React.useState(false);
    const [editorInfo, setEditorInfo] = React.useState({});
    const [editorIndex, setEditorIndex] = React.useState(-1);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = React.useState(false);
    const [deleteGame, setDeleteGame] = React.useState('');

    function handleEditorClick(index) {
        setEditorInfo(rivarlies[index]);
        setEditorOpen(true);
        setEditorIndex(index);
    }

    function handleDelete() {
        if(deleteGame) {
            // setBowlGames(bowlGames.filter(game => game.name !== deleteGame.name));
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

    const generateRivarlyName = (rivarly) => {
        return rivarly.teamA + "-" + rivarly.teamB + " rivarly";
    }

    const mapSlot = (slot) => {
        if (slot === 1) {
            return "Early Season (Week 1)"
        } else if (slot === 2) {
            return "Midseason (Weeks 4-6)"
        } else if (slot === 3) {
            return "Late Season (Weeks 9-11)"
        } else {
            return "Invalid"
        }
    }

    return (
        <div>
           <TableContainer sx={{ marginLeft: '20vw', height: '75vh', maxWidth: '60vw' }}>
            <Table component={Paper} stickyHeader>
                    <TableHead sx={{ backgroundColor: 'lightgray' }}>
                        <TableCell>Team One</TableCell>
                        <TableCell>Team Two</TableCell>
                        <TableCell>Schedule Slot</TableCell>
                        <TableCell>Frequency</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableHead>
                    <TableBody component={Paper} sx={{ height: '300sp', overflowY: 'scroll' }}>
                        {rivarlies.map((game, i) => {
                            return (
                                <TableRow>
                                    <TableCell>{game.teamA}</TableCell>
                                    <TableCell>{game.teamB}</TableCell>
                                    <TableCell>{mapSlot(game.preferredSlot)}</TableCell>
                                    <TableCell>{"Every " + game.cadence + " Years"}</TableCell>
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
            <RivarlyGameEditor
                open={editorOpen}
                handleClose={() => setEditorOpen(false)}
                gameInfo={editorInfo}
                index={editorIndex}
                onSubmit={() => setEditorOpen(false)}
            />

            <Dialog open={deleteConfirmationOpen} onClose={handleDeleteConfirmationClose}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        {/* Are you sure you want to delete the {deleteGame.name ? deleteGame.name : ''} ? */}
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