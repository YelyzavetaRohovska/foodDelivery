import React, {useEffect} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {ActionCreators} from "../../store/user/actions";

const {getCurrentUser, setAuthorization} = ActionCreators;

const AuthRoute = ({auth, getCurrentUser, setAuthorization, isAuthorized, path, ...routeProps}) => {
    let pathname = '/login';

    // move user check to an Observable service
    useEffect(() => {
        setAuthorization();
        getCurrentUser();
    }, [path])

    if (isAuthorized === null) {
        return null;
    }

    if ((auth === true && isAuthorized) || (auth === false && !isAuthorized)) {
        return <Route {...routeProps} />;
    } else if (auth === false && isAuthorized) {
        pathname = '/';
    }
    return <Route
        {...routeProps}
        component={undefined}
        render={({location}) => (<Redirect to={{pathname, state: {from: location}}}/>)}
    />;
}
export default connect((state) => {
    const {USER_REDUCER: {isAuthorized}} = state;
    return {isAuthorized}
}, {
    getCurrentUser,
    setAuthorization
})(AuthRoute);
