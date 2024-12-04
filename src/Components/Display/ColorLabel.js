import { Square } from '@mui/icons-material'
import { Grid2, Typography } from '@mui/material'
import * as React from 'react'

export default function ColorLabel({colorCode}) {
    return (
        <Grid2 container spacing={0.25}>
            <Grid2 item size={5}>
                <Square style={{ color: colorCode}} />
            </Grid2>
            <Grid2 item size={5} marginTop={'3px'}>
                <Typography variant='p'>{colorCode}</Typography>  
            </Grid2>
            <Grid2 item size={1} />
        </Grid2>
    )
}