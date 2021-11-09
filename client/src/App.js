import { Toaster } from 'react-hot-toast';

import { Provider } from 'react-redux';
import {store} from './store/store';

import { BrowserRouter as Router } from 'react-router-dom';
import Routes from "./routes";

import { Header } from "./components/Header/header.component";
import ErrorBoundary from "./components/ErrorBoundary/errorBoundary.component";

import "./style/_base.scss";
import { setUser } from './store/slice/user.slice';
import { getTokenFromStorage } from './utils';
import { TOKEN_KEY, USER_KEY } from './utils/constants';


let token = getTokenFromStorage(TOKEN_KEY);
let user = JSON.parse(getTokenFromStorage(USER_KEY));

if(token && user) store.dispatch(setUser({token, user}));

function App() {
  return <>
    <Provider store={store}>
      <Router>
        <Header />
        <ErrorBoundary>
          <Routes />
        </ErrorBoundary>
      </Router>
      <Toaster />
    </Provider>
  </>;
}

export default App;
