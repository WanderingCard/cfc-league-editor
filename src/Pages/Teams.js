import { useEffect, useState } from "react";
import TeamTable from "../Components/Tables/TeamTable";
import { getStoredData } from "../localstorage";

export default function Teams() {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        var teams = getStoredData('Teams');
        if(teams) {
            setTeams(teams)
        } else {
            setTeams([])
        }
    }, []);

    return (
        <TeamTable
            teams={teams}
        />
    )
}