import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { supabase } from './Modules/API/supabase';
import { connect } from 'react-redux';
import { ConfigProvider, theme } from 'antd';
import 'react-toastify/dist/ReactToastify.css';
import { IDispatch, IRootState } from './store';
import { useEffect } from 'react';
import Home from './Home';
import { toast } from 'react-toastify';

type IAppProps = TMapState & TMapDispatch;
const AppComponent = ({ updateSession }: IAppProps) => {
    const { defaultAlgorithm, darkAlgorithm } = theme;

    const queryClient = new QueryClient({
        queryCache: new QueryCache({
            onError: (error) => {
                toast.error(error.message || 'Something went wrong')},
        }),
    });

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            updateSession(session);
        });
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            updateSession(session);
        });

        return () => subscription.unsubscribe();
    }, [updateSession]);

    return (
        <ConfigProvider
            theme={{
                algorithm: true ? defaultAlgorithm : darkAlgorithm,
            }}
        >
            <QueryClientProvider client={queryClient}>
                <Router>
                    <Home />
                </Router>
            </QueryClientProvider>
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
