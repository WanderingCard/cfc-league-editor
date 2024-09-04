import logo from './logo.svg';
import './App.css';
import UploadButton from './Components/UploadButton';
import { useEffect, useState } from 'react';
import BowlGamesTable from './Components/BowlGamesTable';

function App() {
  const [fileContent, setFileContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [bowlGames, setBowlGames] = useState([]);
  const [conferences, setConferences] = useState([]);
  const [conferenceNames, setConferenceNames] = useState([]);
  const [teams, setTeams] = useState([]);

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
      for (var i = 0; i<leagueJSON.conferences.length; i++) {
        nameArray.push(leagueJSON.conferences[i].name);
      }
      setConferenceNames(nameArray);
      console.log(nameArray);
    }
  }, [fileContent])



  return (
    <div className="App">
      <UploadButton
        fileType='.json'
        onChange={handleFileChange}
      />
      <div>
        <h3>Bowl Games Content</h3>
        <BowlGamesTable
          bowlGames={bowlGames}
          setBowlGames = {setBowlGames}
          conferenceNames={conferenceNames}
          editSubmit={editBowlGame}
        />
        {/* <pre>{JSON.stringify(bowlGames, null, 2)}</pre> */}
      </div>
    </div>
  );
}

export default App;
