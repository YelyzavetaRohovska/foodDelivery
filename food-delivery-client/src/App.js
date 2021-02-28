import React from 'react';
import {BrowserRouter, Switch} from 'react-router-dom';
import {useSelector} from 'react-redux'

import './App.css';
import 'food-delivery-package/dist/index.css'

import AuthRoute from './components/AuthRoute/auth-route';
import Authorization from './components/AuthorizationForm/authorization';
import Registration from './components/AuthorizationForm/registration';
import ConfirmAuth from './components/ConfirmAuth/confirm-form';
import Header from './components/Header/header.component';
import RestaurantPage from './components/RestaurantPage/restaurant-page'
import MainPage from './components/MainPage/MainPage';
import Cart from './components/ShoppingBag/shoppingBag';
import CreateRestaurant from './components/CreateRestaurant/createRestaurant';
import OrderMakePage from "./components/OrderMakePage/order-make-page";
import OrderStatusPage from "./components/OrderStatusPage/order-status-page";

function App() {
    const isAuthorized = useSelector(state =>
        state.USER_REDUCER.isAuthorized
    );
    return (
        <div className="App">
            <BrowserRouter>
                {isAuthorized && <Header/>}
                <main className='main-wrapper'>
                    <Switch>
                        <AuthRoute auth={false} exact path="/login" component={Authorization}/>
                        <AuthRoute auth={false} exact path="/registration" component={Registration}/>
                        <AuthRoute auth={false} exact path="/confirm-auth" component={ConfirmAuth}/>
                        <AuthRoute auth={true} exact path="/restaurant/:id" component={RestaurantPage}/>
                        <AuthRoute auth={true} exact path="/shopping-bag" component={Cart}/>
                        <AuthRoute auth={true} exact path="/add-restaurant" component={CreateRestaurant}/>
                        <AuthRoute auth={true} exact path="/make-order" component={OrderMakePage}/>
                        <AuthRoute auth={true} exact path="/status-order" component={OrderStatusPage}/>
                        <AuthRoute auth={true} exact path="/" component={MainPage}/>
                    </Switch>
                </main>
            </BrowserRouter>
        </div>
    );
}

export default App;
