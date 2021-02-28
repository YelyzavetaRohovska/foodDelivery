import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import firebase from "firebase";
import {firebaseConfig} from "./firebaseConfig";

import './App.css';
import 'food-delivery-package/dist/index.css'
import OrdersPage from './components/orders-page/orders-page';
import Auth from "./components/auth/auth";

function App() {
    firebase.initializeApp(firebaseConfig);
    return (
        <div className="App">
                <BrowserRouter>
                    <main className='main-wrapper'>
                        <Switch>
                            <Route exact path="/auth" component={Auth}/>
                        </Switch>
                        <Switch>
                            <Route exact path="/" component={OrdersPage}/>
                        </Switch>
                    </main>
                </BrowserRouter>
        </div>
    );
}

export default App;
