import React, { PureComponent } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/MenuOutlined'
import NotificationsIcon from '@material-ui/icons/Add'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import { mainListItems, secondaryListItems } from '../../Component/ListItems/listItems';
import PrivateApi from '../../Api/private.api';


const drawerWidth = 280;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 500,
    },
    textField2: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 1200,
        height: 300,
    },
    button: {
        margin: theme.spacing(1),
    },
});

class AddNewOffer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            imageURL: '',
            path: '',
            active: true
        }
    }

    createOffer = async () => {
        const body = {
            image_url: this.state.imageURL,
            path: this.state.path,
            active: this.state.active,
        }
        console.log('body', body);
        const result = await PrivateApi.createOffer(body);
        console.log('result', result);
        if (result.success) {
            alert('OFFER CREATED')
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <AppBar position="absolute" className={clsx(classes.appBar)}>
                    <Toolbar className={classes.toolbar}>
                        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                            Add Offer
                        </Typography>
                    </Toolbar>
                </AppBar>

                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={3}>
                            <TextField
                                required
                                id="outlined-required"
                                label="Image URL"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                value={this.state.imageURL}
                                onChange={(e) => this.setState({ imageURL: e.target.value })}
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Path"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                value={this.state.path}
                                onChange={(e) => this.setState({ path: e.target.value })}
                            />

                            <Box component="fieldset" borderColor="transparent">
                                <Typography component="legend">Is Avtive</Typography>
                                <Switch
                                    checked={this.state.active}
                                    onChange={(event) => this.setState({ active: event.target.checked })}

                                />
                            </Box>

                            <Box component="fieldset" mb={12} borderColor="transparent">
                                <Button
                                    onClick={this.createOffer}
                                    variant="outlined"
                                    component="span"
                                    className={classes.button}
                                >
                                    CREATE OFFER
                                </Button>
                            </Box>
                        </Grid>
                    </Container>
                </main>
            </div>
        );
    }
}

export default withStyles(styles)(AddNewOffer);