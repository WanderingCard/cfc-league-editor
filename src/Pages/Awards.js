import React, { useEffect, useState } from "react";
import { getStoredData } from "../localstorage";
import AwardsTable from "../Components/Tables/AwardsTable";

export default function Awards() {
    const [awards, setAwards] = useState({});

    useEffect(() => {
        setAwards(getStoredData("Awards"));
    }, [])

    return (
        <AwardsTable 
            awards={awards}
        />
    )
}