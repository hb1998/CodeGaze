import { useEffect } from 'react';
import Home from './Home';
import { BrowserRouter as Router } from 'react-router-dom';
import { supabase } from './Modules/API/supabase';
import { connect } from 'react-redux';
import { IDispatch, IRootState } from './store';
import { ConfigProvider, theme } from 'antd';

type IAppProps = TMapState & TMapDispatch;
const AppComponent = ({
    updateSession
}: IAppProps) => {
    const { defaultAlgorithm, darkAlgorithm,  } = theme;
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            updateSession(session)
        })
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            updateSession(session)
        })

        return () => subscription.unsubscribe()
    }, [updateSession])

    return (
        <ConfigProvider
            theme={{
                algorithm: true ? defaultAlgorithm : darkAlgorithm,
            }}>
            <Router>
                <Home />
            </Router>
        </ConfigProvider>
    );
};

const mapState = (state: IRootState) => ({
    getSession: state.session,
});

const mapDispatch = (dispatch: IDispatch) => ({
    updateSession: dispatch.session.update,
});

type TMapState = ReturnType<typeof mapState>;
type TMapDispatch = ReturnType<typeof mapDispatch>;

const App = connect(mapState, mapDispatch)(AppComponent);
export default App;
