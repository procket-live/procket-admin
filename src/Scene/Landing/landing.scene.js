import React, { PureComponent } from 'react';
import { Redirect } from "react-router-dom";

class LandingScene extends PureComponent {
    render() {
        return (
            <Redirect to='/login' />
        )
    }
}

export default LandingScene;
