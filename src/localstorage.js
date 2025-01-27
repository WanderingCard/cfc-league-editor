import JSZip from "jszip";

export function generateLeagueFile(name, startYear, message) {
    const data = {
        name: name,
        startingYear: startYear,
        startingMessage: message,
        bowlGames: getStoredData("Bowls"),
        conferences: getStoredData("Conferences"),
        oocRivalries: getStoredData("Rivarlies"),
        leagueAwardNames: getStoredData("Awards")
    }

    // Add additional code to append coaches and rosters if defined in data set

    return JSON.stringify(data, null, 2);
}

export function generateUniverseZip(name, startYear, message) {
    
}

export function loadData(fileContent) {
    var leagueJSON = JSON.parse(fileContent);

    initBowls(leagueJSON.bowlGames);
    initConferences(leagueJSON.conferences);
    initRivarlies(leagueJSON.oocRivalries);
    initAwards(leagueJSON.leagueAwardNames);

    var genTeams = [];
    for (var i = 0; i < leagueJSON.conferences.length; i++) {
        genTeams = genTeams.concat(getTeamsFromConference(leagueJSON.conferences[i]));
    }
    genTeams.sort((a, b) => a.name.localeCompare(b.name));
    initTeams(genTeams);
}

function getTeamsFromConference(conference) {
    var output = [];
    for (var i = 0; i < conference.divisions.length; i++) {
        var divisionTeams = []
        for (var j=0; j < conference.divisions[i].teams.length; j++) {
            var teamData = conference.divisions[i].teams[j];
            teamData.conference = conference.name;
            divisionTeams.push(teamData);
        }
        output = output.concat(divisionTeams);
    }
    return output;
}

export function initTeams(teamData) {
    if(JSON.stringify(teamData) != undefined)
        window.sessionStorage.setItem("Teams", JSON.stringify(teamData));
    else
        window.sessionStorage.setItem("Teams", "[]");
}

export function initConferences(confData) {
    window.sessionStorage.setItem("Conferences", JSON.stringify(confData));
}

export function initBowls(bowlData) {
    window.sessionStorage.setItem("Bowls", JSON.stringify(bowlData));
}

export function initRivarlies(rivData) {
    window.sessionStorage.setItem("Rivarlies", JSON.stringify(rivData));
}

export function initAwards(awardData) {
    window.sessionStorage.setItem("Awards", JSON.stringify(awardData));
}

export function getStoredData(dataType) {
    if (dataType === "Teams" || dataType === "Conferences" || dataType === "Bowls" || dataType === "Rivarlies" || dataType === "Awards") {
        var data = window.sessionStorage.getItem(dataType);
        if (data != null)
            return JSON.parse(window.sessionStorage.getItem(dataType));
        return [];
    } else {
        return [];
    }
}

export function storeData(dataType, data) {
    if (dataType === "Teams" || dataType === "Conferences" || dataType === "Bowls" || dataType === "Rivarlies" || dataType === "Awards") {
        window.sessionStorage.setItem(dataType, JSON.stringify(data))
    }
}

export function getConferenceNames() {
    var conferenceData = getStoredData("Conferences");
    var nameArray = [];
    for (var i = 0; i < conferenceData.length; i++) {
        nameArray.push(conferenceData[i].name);
    }
    return nameArray;
}

export function getConferenceData(conferenceName) {
    var conferenceData = getStoredData("Conference");
    for (var i = 0; i < conferenceData.length; i++) {
        if (conferenceData[i].name === conferenceName) {
            return conferenceData[i];
        }
    }
    return null;
}

export function getConferenceTeams(conferenceName) {
    var conferenceData = getConferenceData(conferenceName);
    if (conferenceData === null) {
        return [];
    }
    var teamsOut = [];
    for (var i = 0; i < conferenceData.divisions.length; i++) {
        teamsOut.concat(conferenceData.divisions[i]);
    }
    return teamsOut;
}

export function getConferenceDivisons(conferenceName) {
    var conferenceData = getConferenceData(conferenceName)
    if (conferenceData === null) {
        return [];
    }
    return conferenceData.divisions;
}

export function getConferenceStats(conferenceName) {
    var conferenceData = getConferenceData(conferenceName);
    if (conferenceData === null) {
        return {};
    }
    return {
        "name": conferenceData.name,
        "prestigeLevel": conferenceData.prestigeLevel,
        "zipcode": conferenceData.zipcode
    };
}

export function getTeamByAbbrev(teamAbbrev) {
    var teamData = getStoredData("Teams");
    teamData.sort((a, b) => a.abbreviation.localeCompare(b.abbreviation));
    var start = 0;
    var end = teamData.length - 1;
    var middle = Math.floor((start + end) / 2);

    while (middle >= start && middle <= end) {
        var check = teamAbbrev.localeCompare(teamData[middle].abbreviation);
        if (check === 0) {
            return teamData[middle];
        } else if (check < 0) {
            start = middle + 1;
        } else if (check > 0) {
            end = middle - 1;
        }
        middle = (start + end) / 2;
    }
    return null;
}

export function getTeamByName(teamName) {
    var teamData = getStoredData("Teams");
    var start = 0;
    var end = teamData.length - 1;
    var middle = Math.floor((start + end) / 2);

    while (middle >= start && middle <= end) {
        var check = teamName.localeCompare(teamData[middle].name);
        if (check === 0) {
            return teamData[middle];
        } else if (check < 0) {
            start = middle + 1;
        } else if (check > 0) {
            end = middle - 1;
        }
        middle = (start + end) / 2;
    }
    return null;
}

export function getRivarliesByTeam(teamAbbrev) {
    var rivarlyData = getStoredData("rivarlies");
    var rivarlies = [];
    for (var i = 0; i < rivarlyData.length; i++) {
        if (rivarlyData[i].teamA === teamAbbrev || rivarlyData[i].teamB === teamAbbrev) {
            rivarlies.push(rivarlyData[i])
        }
    }
    return rivarlies;
}

export function moveTeam(teamName, origConference, newConference) {
    var teamData = getTeamByName(teamName);
}