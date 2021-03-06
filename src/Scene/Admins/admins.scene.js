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

class AdminsScene extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            admins: []
        }
    }

    componentDidMount = () => {
        this.fetchAdmins();
    }

    fetchAdmins = async () => {
        const result = await PrivateApi.getAdmins();
        if (result.success) {
            this.setState({ admins: result.response });
        }
    }

    render() {
        const { classes } = this.props;
        const { admins } = this.state;

        return (
            <div>
                <AppBar position="absolute" className={clsx(classes.appBar)}>
                    <Toolbar className={classes.toolbar}>
                        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                            Admins
                        </Typography>
                        <Link to="addNewGame">
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
                                    <TableCell>User name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Password</TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {admins.map(admin => (
                                    <TableRow key={admin.user.name}>
                                        <TableCell component="th" scope="row">
                                            {admin.user.name}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {admin.user.email}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {admin.user.mobile}
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton color="primary">
                                                <RedirectIcon color="#fff" />
                                            </IconButton>
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

export default withStyles(styles)(AdminsScene);
