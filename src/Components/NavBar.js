import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UploadButton from "./UploadButton";
import { useState } from "react";
import { loadData } from "../localstorage";

/**
 * Allows the user to naviage between the various pages
 * @param {*} param0 
 * @returns 
 */
export default function NavBar({ options }) {
    const { pathName } = useLocation();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("")
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            loadData(event.target.result);
            navigate('/')
        }

        reader.onerror = (error) => {
            setErrorMessage('Error Reading File');
        }

        if (selectedFile) {
            reader.readAsText(selectedFile)
        } else {

        }
    };
    return (
        <Drawer
            anchor="left"
            variant="permanent"
            sx={{
                width: '15vw'
            }}
        >
            <List>
                {options.map((option, i) => (
                    <ListItem>
                        <ListItemButton component={Link} to={option.path} selected={option.path === pathName}>
                            <ListItemIcon>{option.icon}</ListItemIcon>
                            <ListItemText>{option.label}</ListItemText>
                        </ListItemButton>
                    </ListItem>
                ))}
                <Divider />
                <ListItem>
                    <UploadButton
                        fileType='.json'
                        label={"Upload Universe File"}
                        onChange={handleFileChange}
                    />
                </ListItem>
            </List>
        </Drawer>
    );
}