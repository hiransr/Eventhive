import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TransLogo from '../Assets/TransLogo.png'
import { Link, useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { axiosLogout } from '../apis/endpoints';
const EventAppBar = () => {
    return (
        <AppBar position="fixed" className=" bg-slate-50" sx={{ background: "#000000" }} >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', } }}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/eventpage/3"
                            sx={{
                                mr: 2,
                                display: { md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            EVENT DETAILS
                        </Typography>
                    </Box>
                    <div >
                        <img src={TransLogo} alt="Logo" className='w-[110px] h-[60px] '></img>
                    </div>
                </Toolbar>

            </Container>
        </AppBar>
    )
}

export default EventAppBar