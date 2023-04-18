import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TransLogo from '../Assets/TransLogo.png'

const NewEventNav = () => {
    return (
        <AppBar position="fixed" className=" bg-slate-50" sx={{ background: "#000000" }} >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', } }}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/cadmin"
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
                            CREATE EVENT
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

export default NewEventNav