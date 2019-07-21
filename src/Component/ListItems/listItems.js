import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import GamepadIcon from '@material-ui/icons/Gamepad';
import ShoppingCartIcon from '@material-ui/icons/UpdateSharp';
import PeopleIcon from '@material-ui/icons/LiveTv';
import BarChartIcon from '@material-ui/icons/CompassCalibrationTwoTone';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/AccountCircle';

export const mainListItems = (
    <div>
        <Link to="games">
            <ListItem button>
                <ListItemIcon>
                    <GamepadIcon />
                </ListItemIcon>
                <ListItemText primary="Games" />
            </ListItem>
        </Link>
        <ListItem button>
            <ListItemIcon>
                <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Upcoming Tournaments" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Live Tournaments" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Completed Tournaments" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
        </ListItem>
        <Link to="admin">
            <ListItem button>
                <ListItemIcon>
                    <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="Admins" />
            </ListItem>
        </Link>
        <Link to="offers">
            <ListItem button>
                <ListItemIcon>
                    <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="Offers" />
            </ListItem>
        </Link>
    </div>
);

export const secondaryListItems = (
    <div>
        <ListSubheader inset>Add New</ListSubheader>
        <Link to="addNewGame">
            <ListItem button>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Game" />
            </ListItem>
        </Link>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Tournament" />
        </ListItem>
    </div>
);
