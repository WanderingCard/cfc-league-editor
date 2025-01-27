import React from "react";
import { Button } from "@mui/material";
import { Download } from "@mui/icons-material";
import { generateLeagueFile } from "../localstorage";


export default function DownloadFileButton() {
    // TODO: Allow User to Enter Starting Year, Universe Name, Message

    function handleDownload() {
        // Get JSON and make a blob

        const json = generateLeagueFile("Test", 2025, "Hello There - General Kenobi");
        const blob = new Blob([json], {type: "application/json"});
        const url = URL.createObjectURL(blob);

        // Create Temp Link and Trigger Download

        const link = document.createElement("a");
        link.href = url;
        link.download = "test-file.json"
        link.click();

        URL.revokeObjectURL(url);
    }

    return (
        <Button 
            startIcon={<Download />}
            onClick={handleDownload}
            variant="contained"
        >
            Download League File
        </Button>
    )
}