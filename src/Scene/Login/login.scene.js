import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PublicApi from '../../Api/public.api';
import GLOBAL from '../../Constants/global.constants';
import PrivateApi from '../../Api/private.api';

const styles = theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class LoginScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loggedIn: false,
        }
    }

    submit = async () => {
        const result = await PublicApi.login({ email: this.state.email, password: this.state.password })
        if (result.success) {
            const adminCheck = await PrivateApi.checkAdmin();
            if (adminCheck.success) {
                const user = result.response;
                const token = result.token;
                localStorage.setItem('@token', token);
                GLOBAL.USER = user;
                this.setState({ loggedIn: true });
            }
        }
    }

    render() {
        const { classes } = this.props;

        if (this.state.loggedIn) {
            return <Redirect to="dashboard" />
        }

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        GAMETOWN LOGIN
                    </Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={this.state.email}
                        onChange={(e) => this.setState({ email: e.target.value })}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={this.state.password}
                        onChange={(e) => this.setState({ password: e.target.value })}
                    />
                    <Button
                        onClick={this.submit}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                </div>
            </Container>
        )
    }
}

export default withStyles(styles)(LoginScene);
