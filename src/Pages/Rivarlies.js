import { useEffect, useState } from "react";
import { getStoredData } from "../localstorage";
import RivarlyTable from "../Components/Tables/RivarliesTable";

export default function Rivarlies() {
    const [rivarlies, setRivarlies] = useState([]);

    useEffect(() => {
        var conf = getStoredData('Rivarlies');
        if(conf) {
            setRivarlies(conf);
        } else {
            setRivarlies([]);
        }
    }, []);

    return (
        <RivarlyTable
            rivarlies={rivarlies}
        />
    )
}