export function initTeams(teamData) {
    window.sessionStorage.setItem("Teams", JSON.stringify(teamData));
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

export function getStoredData(dataType) {
    if(dataType === "Teams" || dataType === "Conferences" || dataType === "Bowls" || dataType === "Rivarlies") {
        return window.sessionStorage.getItem(dataType);
    } else {
        return [];
    }
}

export function getConferenceNames() {
    var conferenceData = getStoredData("Conferences");
    var nameArray = [];
    for (var i=0; i < conferenceData.length; i++) {
        nameArray.push(conferenceData[i].name);
    }
    return nameArray;
}

export function getConferenceData(conferenceName) {
    var conferenceData = getStoredData("Conference");
    for (var i=0; i<conferenceData.length; i++) {
        if(conferenceData[i].name === conferenceName) {
            return conferenceData[i];
        }
    }
    return null;
}

export function getConferenceTeams(conferenceName) {
    var conferenceData = getConferenceData(conferenceName);
    if(conferenceData === null) {
        return [];
    }
    var teamsOut = [];
    for(var i = 0; i < conferenceData.divisions.length; i++) {
        teamsOut.concat(conferenceData.divisions[i]);
    }
    return teamsOut;
}

export function getConferenceDivisons(conferenceName) {
    var conferenceData = getConferenceData(conferenceName)
    if(conferenceData === null) {
        return [];
    }
    return conferenceData.divisions;
}

export function getConferenceStats(conferenceName) {
    var conferenceData = getConferenceData(conferenceName);
    if(conferenceData === null) {
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
        if(check === 0) {
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
    for(var i = 0; i < rivarlyData.length; i++) {
        if(rivarlyData[i].teamA === teamAbbrev || rivarlyData[i].teamB === teamAbbrev) {
            rivarlies.push(rivarlyData[i])
        }
    }
    return rivarlies;
}