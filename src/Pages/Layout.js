import { Bolt, EmojiEvents, Groups, Handshake, Home } from "@mui/icons-material";
import NavBar from "../Components/NavBar";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function Layout() {
    const navOptions = [
        {
            label: 'Home',
            path: '/',
            icon: <Home />
        },
        {
            label: 'Bowls',
            path: '/bowls',
            icon: <EmojiEvents />
        }, 
        {
            label: 'Teams',
            path: '/teams',
            icon: <Groups />
        },
        {
            label: 'Conferences',
            path: '/conferences',
            icon: <Handshake />
        },
        {
            label: 'Rivarlies',
            path: '/rivarlies',
            icon: <Bolt />
        }
    ]
    
    return (
    <div style={{display: 'flex'}}>
        <NavBar 
            options={navOptions}
        />
        <main>
            <Outlet />
        </main>
    </div>
    )
}