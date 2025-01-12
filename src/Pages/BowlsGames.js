import { useEffect, useState } from "react";
import { getConferenceNames, getStoredData, storeData } from "../localstorage";
import BowlGamesTable from "../Components/Tables/BowlGamesTable";

export default function BowlGames () {
    const [bowlList, setBowlList] = useState([]);
    const [conferenceNames, setNames] = useState([]);

    useEffect(() => {
        var bowls = getStoredData("Bowls");
        console.log("Bowl List: " + bowls)
        if(bowls)
            setBowlList(bowls);
        else
            setBowlList([]);
        setNames(getConferenceNames());
    }, [])

    function handleBowlChange(i, gameInfo) {
        var modifiedBowlArray = bowlList;
        modifiedBowlArray[i] = gameInfo;
        setBowlList(modifiedBowlArray);
        storeData("Bowls", modifiedBowlArray);
    }

    return (
        <BowlGamesTable 
            bowlGames={bowlList}
            conferenceNames={conferenceNames}
            editSubmit={handleBowlChange}
            setBowlGames={setBowlList}
        />
    )
}