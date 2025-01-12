import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

/**
 * Allows the user to naviage between the various pages
 * @param {*} param0 
 * @returns 
 */
export default function NavBar({options}) {
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
                        <ListItemButton component={Link} to={option.path}>
                            <ListItemIcon>{option.icon}</ListItemIcon>
                            <ListItemText>{option.label}</ListItemText>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}