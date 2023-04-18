import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Divider from '@mui/material/Divider';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { IconButton, TextField } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';


const drawerWidth = 250;

export default function PermanentDrawerLeft({ handleTrending, handleReset, handlePrevious, onFieldChange, onFilterChange, inputValue = {} }) {
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <div>
            <Box sx={{ display: 'flex' }} >

                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,

                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                            background: '#f6f7eb',
                            paddingTop: '80px',
                            boxShadow: 3,
                        },
                        '&': {
                            zIndex: 1,
                        },

                    }}
                    variant="permanent"
                    anchor="left"
                >
                    <List>

                        {/* <ListItemButton >
                            Filter
                        </ListItemButton> */}

                        <ListItemButton onClick={handleClick}>
                            Filter
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem sx={{ pl: 4 }}>
                                    <TextField value={inputValue.date} id="date" InputLabelProps={{ shrink: true }} sx={{ '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'black !important' }, '& .MuiFormLabel-root': { color: 'black !important' } }} label="Date" type="date" variant="outlined" name="date" onChange={onFieldChange} />
                                </ListItem>
                                <ListItemButton onClick={onFilterChange}>
                                    Submit
                                </ListItemButton>
                            </List>
                        </Collapse>


                        <ListItemButton onClick={handleTrending}>
                            Trending<TrendingUpIcon className='text-decline' />
                        </ListItemButton>
                    </List>
                    <Divider />
                    <List>
                        <ListItemButton onClick={handlePrevious}>
                            Previous Events
                        </ListItemButton>
                        <ListItem>
                            <IconButton onClick={handleReset}>
                                <FilterAltOffIcon />
                            </IconButton>
                        </ListItem>
                    </List>
                </Drawer>
            </Box>
        </div>
    );
}
