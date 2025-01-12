import { useEffect, useState } from "react";
import { getStoredData } from "../localstorage";
import ConferencesTable from "../Components/Tables/ConferencesTable";

export default function Conferences() {
    const [conferences, setConferences] = useState([]);

    useEffect(() => {
        var conf = getStoredData('Conferences');
        if(conf) {
            setConferences(conf);
        } else {
            setConferences([]);
        }
    }, []);

    return (
        <ConferencesTable
            conferences={conferences}
        />
    )
}