import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Home from './Home';
import { BrowserRouter as Router } from 'react-router-dom';
import { supabase } from './Modules/API/supabase';
import { connect } from 'react-redux';
import { IDispatch, IRootState } from './store';

type IAppProps = TMapState & TMapDispatch;
const AppComponent = (props: IAppProps) => {
    return (
        <Router>
            <Home />
        </Router>
    );
};
const mapDispatch = (dispatch: IDispatch) => ({
    updateSession: dispatch.session.update,
});
const mapState = (state: IRootState) => ({
    getSession: state.session,
});

type TMapState = ReturnType<typeof mapState>;
type TMapDispatch = ReturnType<typeof mapDispatch>;

const App = connect(mapState, mapDispatch)(AppComponent);
export default App;
