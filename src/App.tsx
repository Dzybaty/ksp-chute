import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

import { calculateVelocity, generateId, formatResult } from './utils';
import { CELESTIAL_BODIES, PARACHUTES } from './data';
import type { ParachuteGroupT } from './data';
import './App.css';

function App() {
  const [targetBody, setTargetBody] = useState(CELESTIAL_BODIES[3]);
  const [shipMass, setSetShipMass] = useState<'' | number>('');
  const [parachuteType, setParachuteType] = useState(PARACHUTES[0]);
  const [symmetry, setSymmetry] = useState(1);
  const [mountedGroups, updateMountedGroups] = useState<ParachuteGroupT[]>([]);
  const [results, setResults] = useState({ vTouch: 'N/A', vDrag: 'N/A' });

  useEffect(() => {
    const { vTouch, vDrag } = calculateVelocity(targetBody, mountedGroups, shipMass || 0);

    setResults({
      vTouch: formatResult(vTouch),
      vDrag: formatResult(vDrag),
    });
  }, [targetBody, shipMass, mountedGroups]);

  const addChutesToMounted = () => {
    const newGroup = {
      id: generateId(),
      symmetry,
      type: parachuteType,
    };

    updateMountedGroups([...mountedGroups, newGroup]);
  };

  const removeChutesFromMounted = (id: string) => {
    const updatedGroups = mountedGroups.filter((group) => group.id !== id);

    updateMountedGroups(updatedGroups);
  };

  return (
    <Box className="container">
      <img src="logo.png" alt="" />
      <Box className="section">
        <InputLabel>Ship mass (kg)</InputLabel>
        <TextField
          type="number"
          InputProps={{
            endAdornment: <InputAdornment position="start">kg</InputAdornment>,
          }}
          variant="outlined"
          value={shipMass}
          onChange={(e) => setSetShipMass(Number(e.target.value))}
          onFocus={() => setSetShipMass('')}
        />
        <InputLabel>Target body</InputLabel>
        <Select
          value={JSON.stringify(targetBody)}
          onChange={(event) => setTargetBody(JSON.parse(event.target.value))}
        >
          {
          CELESTIAL_BODIES.map((b) => (
            <MenuItem key={b.name} value={JSON.stringify(b)}>{b.name}</MenuItem>
          ))
        }
        </Select>
      </Box>

      <Box className="section">
        <InputLabel>Parachute</InputLabel>
        <Select
          value={JSON.stringify(parachuteType)}
          onChange={(event) => setParachuteType(JSON.parse(event.target.value))}
        >
          {
          PARACHUTES.map((chute) => (
            <MenuItem key={chute.name} value={JSON.stringify(chute)}>{chute.name}</MenuItem>
          ))
        }
        </Select>
        <InputLabel>Symmetry</InputLabel>
        <Select
          value={symmetry.toString()}
          onChange={(event) => setSymmetry(Number(event.target.value))}
        >
          {
           [...Array(8)].map((x, i) => (
             // eslint-disable-next-line react/no-array-index-key
             <MenuItem key={i} value={i + 1}>{i + 1}</MenuItem>
           ))
          }
        </Select>
        <Button
          className="add-button"
          variant="contained"
          onClick={addChutesToMounted}
        >
          Add chute
        </Button>
      </Box>

      <Box className="section">
        <InputLabel>Mounted parachutes:</InputLabel>
        <Box className="cards-container">
          {
            mountedGroups.map((group) => (
              <Chip
                key={group.id}
                label={`${group.symmetry}x - ${group.type.name}`}
                variant="outlined"
                onClick={() => removeChutesFromMounted(group.id)}
              />
            ))
          }
        </Box>
      </Box>

      <Box className="section">
        <Box className="result-row">
          <Typography display="inline" color="textPrimary" variant="body1">
            V<sub>touchdown</sub>
          </Typography>
          <Typography display="inline" color="textPrimary"><strong>{results.vTouch}</strong></Typography>
        </Box>
        <Box className="result-row">
          <Typography display="inline" color="textPrimary" variant="body1">
            V<sub>drogue</sub>
          </Typography>
          <Typography display="inline" color="textPrimary"><strong>{results.vDrag}</strong></Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
