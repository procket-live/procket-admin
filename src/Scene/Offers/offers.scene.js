import React, { PureComponent } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Add'
import RedirectIcon from '@material-ui/icons/InfoOutlined'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PrivateApi from '../../Api/private.api';


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
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
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
    table: {
        minWidth: 650,
    },
});

class OffersScene extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            offers: []
        }
    }

    componentDidMount = () => {
        this.fetchOffers();
    }

    fetchOffers = async () => {
        const result = await PrivateApi.offers();
        if (result.success) {
            this.setState({ offers: result.response });
        }
    }

    render() {
        const { classes } = this.props;
        const { offers } = this.state;

        return (
            <div>
                <AppBar position="absolute" className={clsx(classes.appBar)}>
                    <Toolbar className={classes.toolbar}>
                        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                            Offers
                        </Typography>
                        <Link to="addNewOffer">
                            <IconButton color="secondary">
                                <NotificationsIcon color="#fff" />
                            </IconButton>
                        </Link>
                    </Toolbar>
                </AppBar>

                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Paper className={classes.root}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">Image</TableCell>
                                    <TableCell align="right">Path</TableCell>
                                    <TableCell align="right">Active</TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {offers.map(offer => (
                                    <TableRow key={offer.image_url}>
                                        <TableCell align="right">
                                            <img alt={offer.image_url} src={offer.image_url} style={{ width: 100, height: 140 }} />
                                        </TableCell>
                                        <TableCell align="right">
                                            {offer.path}
                                        </TableCell>
                                        <TableCell align="right">
                                            {offer.active}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </main>
            </div>
        );
    }
}

export default withStyles(styles)(OffersScene);
