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

class AddNewGame extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            name: 'PUBG Mobile',
            releaseDate: '23/03/2017',
            minimumAndroidVerson: '5.1.1',
            minimumApiVerion: '21',
            minimumRam: '2',
            imageURL: 'https://firebasestorage.googleapis.com/v0/b/procket-live.appspot.com/o/Screen-Shot-2017-12-15-at-9.43.41-AM.png?alt=media&token=8fcb27eb-d671-45d9-8224-f402a000e304',
            wallpaperURL: 'https://firebasestorage.googleapis.com/v0/b/procket-live.appspot.com/o/pubg-hero_1527570270606-770x433.jpg?alt=media&token=668363e4-12d0-4720-bc9c-d17593d1612a',
            packageName: 'com.tencent.ig',
            active: true,
            stars: 5,
            rating: 5,
            overview: 'PlayerUnknown\'s Battlegrounds is a battle royale shooter that pits 100 players against each other in a struggle for survival. Gather supplies and outwit your opponents to become the last person standing. PLAYERUNKNOWN, aka Brendan Greene, is a pioneer of the battle royale genre and the creator of the battle royale game modes in the ARMA series and H1Z1: King of the Kill. At PUBG Corp., Greene is working with a veteran team of developers to make PUBG into the world\'s premiere battle royale experience.',
            platform: 'mobile',
            developer: 'Bluehole',
            publisher: 'Tencent Games',
            minAge: '14',
            websiteURL: 'https://www.pubg.com/',
            genre: 'Shooter,First Person Shooter,Battle Royale',
            tags: 'battle royale,FPS,TPP,Multiplayer,Gun Combat,pubg,pubg mobile'
        }
    }

    createGame = async () => {
        const body = {
            name: this.state.name,
            release_date: this.state.releaseDate,
            minimun_android_version: this.state.minimumAndroidVerson,
            minimun_api_version: this.state.minimumApiVerion,
            minimum_ram: this.state.minimumRam,
            image_url: this.state.imageURL,
            wallpaper_url: this.state.wallpaperURL,
            package_name: this.state.packageName,
            active: this.state.active,
            stars: this.state.stars,
            overview: this.state.overview,
            platform: this.state.platform,
            rating: this.state.rating,
            developer: this.state.developer,
            publisher: this.state.publisher,
            min_age: this.state.minAge,
            website_url: this.state.websiteURL,
            genre: this.state.genre.split(','),
            tags: this.state.tags.split(',')
        }
        console.log('body', body);
        const result = await PrivateApi.createGame(body);
        console.log('result', result);
        if (result.success) {
            alert('GAME CREATED')
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <AppBar position="absolute" className={clsx(classes.appBar)}>
                    <Toolbar className={classes.toolbar}>
                        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                            Add New Game
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
                                label="Name"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                value={this.state.name}
                                onChange={(e) => this.setState({ name: e.target.value })}
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Release Date"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                value={this.state.releaseDate}
                                onChange={(e) => this.setState({ releaseDate: e.target.value })}
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Minimum android version"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                value={this.state.minimumAndroidVerson}
                                onChange={(e) => this.setState({ minimumAndroidVerson: e.target.value })}
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Minimum api version"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                value={this.state.minimumApiVerion}
                                onChange={(e) => this.setState({ minimumApiVerion: e.target.value })}
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Minimum ram"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                value={this.state.minimumRam}
                                onChange={(e) => this.setState({ minimumRam: e.target.value })}
                            />
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
                                label="Wallpaper URL"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                value={this.state.wallpaperURL}
                                onChange={(e) => this.setState({ wallpaperURL: e.target.value })}
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Package name"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                value={this.state.packageName}
                                onChange={(e) => this.setState({ packageName: e.target.value })}
                            />
                            <Box component="fieldset" borderColor="transparent">
                                <Typography component="legend">Is Avtive</Typography>
                                <Switch
                                    checked={this.state.active}
                                    onChange={(event) => this.setState({ active: event.target.checked })}

                                />
                            </Box>
                            <Box component="fieldset" borderColor="transparent">
                                <Typography component="legend">Start</Typography>
                                <Rating
                                    name="simple-controlled"
                                    value={this.state.stars}
                                    onChange={(event, newValue) => {
                                        this.setState({ stars: newValue })
                                    }}
                                />
                            </Box>
                            <Box component="fieldset" mb={5} borderColor="transparent">
                                <Typography component="legend">Rating</Typography>
                                <Rating
                                    name="simple-controlled"
                                    value={this.state.rating}
                                    onChange={(event, newValue) => {
                                        this.setState({ rating: newValue })
                                    }}
                                />
                            </Box>
                            <TextField
                                required
                                id="outlined-required"
                                label="Overview"
                                className={classes.textField2}
                                margin="normal"
                                variant="outlined"
                                value={this.state.overview}
                                onChange={(e) => this.setState({ overview: e.target.value })}
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Platform"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                value={this.state.platform}
                                onChange={(e) => this.setState({ platform: e.target.value })}
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Developer"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                value={this.state.developer}
                                onChange={(e) => this.setState({ developer: e.target.value })}
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Publisher"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                value={this.state.publisher}
                                onChange={(e) => this.setState({ publisher: e.target.value })}
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Min Age"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                value={this.state.minAge}
                                onChange={(e) => this.setState({ minAge: e.target.value })}
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Website URL"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                value={this.state.websiteURL}
                                onChange={(e) => this.setState({ websiteURL: e.target.value })}
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Genre - comma seprated"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                value={this.state.genre}
                                onChange={(e) => this.setState({ genre: e.target.value })}
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Tags - comma seprated"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                value={this.state.tags}
                                onChange={(e) => this.setState({ tags: e.target.value })}
                            />
                            <Box component="fieldset" mb={12} borderColor="transparent">
                                <Button
                                    onClick={this.createGame}
                                    variant="outlined"
                                    component="span"
                                    className={classes.button}
                                >
                                    CREATE GAME
                                </Button>
                            </Box>
                        </Grid>
                    </Container>
                </main>
            </div>
        );
    }
}

export default withStyles(styles)(AddNewGame);