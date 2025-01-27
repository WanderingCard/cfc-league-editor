import { Edit } from "@mui/icons-material";
import { IconButton, Paper, Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function AwardsTable({ awards }) {
    const [displayAwards, setDisplay] = useState({})

    useEffect(() => {
        setDisplay(awards);
    }, [awards])

    return (
        <div>
            <TableContainer sx={{ maxWidth: '100%' }} component={Paper}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Award</TableCell>
                            <TableCell>Award Name</TableCell>
                            <TableCell>Abbreviation</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    {
                        Object.entries(awards).map(([key, value]) => (
                            <TableRow key={key}>
                                <TableCell>{key}</TableCell>
                                <TableCell>{value.name}</TableCell>
                                <TableCell>{value.abbreviation}</TableCell>
                                <TableCell><IconButton><Edit /></IconButton></TableCell>
                            </TableRow>
                        ))
                    }
                </Table>
            </TableContainer>
        </div>
    )
}