import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import { Grid2 } from '@mui/material';

const Input = styled(MuiInput)`
  width: 42px;
`;

export default function MySlider( {value, label, icon, handleChange, min, max, stepBy, name, handleBlur, modifier} ) {

  function generateLabel() {
    if(modifier > 0) {
      return `${label} (+${modifier}): ${value + modifier}`;
    } else {
      return `${label}: ${value + modifier}`;
    }
  }

  return (
    <Box>
      <Typography id="input-slider" gutterBottom>
        {generateLabel()}
      </Typography>
      <Grid2 container spacing={3} sx={{ alignItems: 'center'}}>
        <Grid2 item size={2}>
          {icon}
        </Grid2>
        <Grid2 item size={8}>
          <Slider
            value={typeof value === 'number' ? value : parseInt(value, 10)}
            onChange={handleChange}
            aria-labelledby="input-slider"
            onBlur={handleBlur}
            name={name}
            min={min}
            max={max}
            step={stepBy}
            marks
          />
        </Grid2>
        <Grid2 item size={2}>
          <Input
            name={name}
            value={value}
            size="small"
            onChange={handleChange}
            inputProps={{
              step: {stepBy},
              min: {min},
              max: {max},
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid2>
      </Grid2>
    </Box>
  );
}