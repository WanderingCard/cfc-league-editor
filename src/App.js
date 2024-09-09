import logo from './logo.svg';
import './App.css';
import UploadButton from './Components/UploadButton';
import { useEffect, useState } from 'react';
import BowlGamesTable from './Components/Tables/BowlGamesTable';
import { Button, ButtonGroup } from '@mui/material';
import ConferencesTable from './Components/Tables/ConferencesTable';
import TeamTable from './Components/Tables/TeamTable';

function App() {
  const [fileContent, setFileContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [bowlGames, setBowlGames] = useState([]);
  const [conferences, setConferences] = useState([]);
  const [conferenceNames, setConferenceNames] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedCategory, setCategory] = useState('bowls')

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setFileContent(event.target.result);
    }

    reader.onerror = (error) => {
      setErrorMessage('Error Reading File');
    }

    if (selectedFile) {
      reader.readAsText(selectedFile)
    } else {

    }
  };

  function editBowlGame(i, gameInfo) {
    var modifiedBowlArray = bowlGames;
    modifiedBowlArray[i] = gameInfo;
    setBowlGames(modifiedBowlArray)
  }

  useEffect(() => {
    if (fileContent !== '') {
      var leagueJSON = JSON.parse(fileContent);
      setBowlGames(leagueJSON.bowlGames);
      setConferences(leagueJSON.conferences);
      var nameArray = [];
      var genteams = [];
      for (var i = 0; i < leagueJSON.conferences.length; i++) {
        nameArray.push(leagueJSON.conferences[i].name);
        genteams = genteams.concat(getTeamsFromConference(leagueJSON.conferences[i]))
        console.log(getTeamsFromConference(leagueJSON.conferences[i]))
        console.log(genteams);
      }
      setConferenceNames(nameArray);
      setTeams(genteams);
      console.log(nameArray);
    }
  }, [fileContent])

  function getTeamsFromConference(conference) {
    var output = [];
    for (var i=0; i < conference.divisions.length; i++) {
      output = output.concat(conference.divisions[i].teams)
    }
    return output;
  }

  useEffect(() => {
    console.log(teams);
  }, [teams])

  function renderSection(selected) {
    if (selected === 'bowls') {
      return (
        <div>
          <h3>Bowl Games</h3>
          <BowlGamesTable
            bowlGames={bowlGames}
            setBowlGames={setBowlGames}
            conferenceNames={conferenceNames}
            editSubmit={editBowlGame}
          />
          {/* <pre>{JSON.stringify(bowlGames, null, 2)}</pre> */}
        </div>
      )
    } else if (selected === 'conferences') {
      return (
        <div>
          <h3>Conferences</h3>
          <ConferencesTable
            conferences={conferences}
          />
        </div>
      )
    } else if (selected === 'teams') {
      return (
      <div>
        <h3>Teams</h3>
        <TeamTable 
          teams={teams}
        />
      </div>
      )
    }
  }

  return (
    <div className="App">
      <UploadButton
        fileType='.json'
        onChange={handleFileChange}
      />
      <br></br>
      <ButtonGroup variant='contained' aria-label='Editor Category Select'>
        <Button onClick={() => setCategory('bowls')}>Bowl Games</Button>
        <Button onClick={() => setCategory('conferences')}>Conferences</Button>
        <Button onClick={() => setCategory('teams')}>Teams</Button>
      </ButtonGroup>
      {renderSection(selectedCategory)}
    </div>
  );
}

export default App;
