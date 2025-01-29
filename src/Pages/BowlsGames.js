import { useEffect, useState } from "react";
import { getConferenceNames, getStoredData, storeData } from "../localstorage";
import BowlGamesTable from "../Components/Tables/BowlGamesTable";
import { InputLabel, MenuItem, Select, Typography } from "@mui/material";

export default function BowlGames() {
    const [bowlList, setBowlList] = useState([]);
    const [displayBowls, setDisplayBowls] = useState([]);
    const [conferenceFilter, setConfFilter] = useState("none");
    const [conferenceNames, setNames] = useState([]);

    useEffect(() => {
        var bowls = getStoredData("Bowls");
        console.log("Bowl List: " + bowls)
        if (bowls)
            setBowlList(bowls);
        else
            setBowlList([]);
        setNames(getConferenceNames());
    }, [])

    useEffect(() => {
        if (conferenceFilter === "none") {
            setDisplayBowls(bowlList);
        } else {
            var filtered = bowlList.filter((bowl) => {
                if(!bowl.tieIn)
                    return false;
                if (bowl.tieIn.first && bowl.tieIn.first.constructor !== Array) {
                    if (bowl.tieIn.first === conferenceFilter)
                        return true;
                } else if(bowl.tieIn.first) {
                    for (var i = 0; i < bowl.tieIn.first.length; i++) {
                        if (bowl.tieIn.first[i] === conferenceFilter)
                            return true;
                    }
                }

                if (bowl.tieIn.second && bowl.tieIn.second.constructor !== Array) {
                    return (bowl.tieIn.second === conferenceFilter)
                } else if(bowl.tieIn.second){
                    for (var i = 0; i < bowl.tieIn.first.second; i++) {
                        if (bowl.tieIn.second[i] === conferenceFilter)
                            return true;
                    }
                }
                return false;
            })
            console.log(filtered);
            setDisplayBowls(filtered);
        }
    }, [bowlList, conferenceFilter])

    function handleBowlChange(i, gameInfo) {
        var modifiedBowlArray = bowlList;
        modifiedBowlArray[i] = gameInfo;
        setBowlList(modifiedBowlArray);
        storeData("Bowls", modifiedBowlArray);
    }

    return (
        <>
            <InputLabel id='ConfFilter'>Filter Conference</InputLabel>
            <Select
                style={{ width: '10vw', marginBottom: '5px' }}
                labelId='ConfFilter'
                id='ConferenceFilter'
                value={conferenceFilter}
                onChange={(event) => {
                    setConfFilter(event.target.value);
                    console.log(event.target.value);
                }}
            >
                {["none", ...conferenceNames].map((name) => (
                    <MenuItem key={name} value={name}>
                        {name !== "none" ? name : 'Show All'}
                    </MenuItem>
                ))}
            </Select>
            <BowlGamesTable
                bowlGames={displayBowls}
                conferenceNames={conferenceNames}
                editSubmit={handleBowlChange}
                setBowlGames={setBowlList}
            />
        </>
    )
}