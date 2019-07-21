import React, { PureComponent } from 'react';
import { Redirect } from "react-router-dom";
import PrivateApi from '../../Api/private.api';

class LandingScene extends PureComponent {
    constructor() {
        super();
        this.state = {
            login: false,
            dashboard: false,
            loading: true
        }
    }

    componentDidMount = async () => {
        const result = await PrivateApi.checkAdmin();
        console.log('result', result);
        if (result.success) {
            this.setState({ dashboard: true, loading: false });
        } else {
            this.setState({ login: true, loading: false })
        }
    }

    render() {
        const { loading, dashboard, login } = this.state;

        if (loading)
            return <div>LOADING</div>

        if (login) {
            return (
                <Redirect to='/login' />
            )
        }


        if (dashboard)
            return (
                <Redirect to='/dashboard' />
            )

        return null;
    }
}

export default LandingScene;
