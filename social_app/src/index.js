import ReactDOM from 'react-dom/client';
import './index.css';

import { Provider } from "react-redux";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import store from "./store/store";
import NotificationProvider from "./context/NotificationContext";
import Signup from './pages/Signup';
import UsersPage from './pages/UsersPage';
import ErrorPage from './pages/ErrorPage';
import { constants } from './services/constants';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <NotificationProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UsersPage/>}></Route>
          <Route path="/addUser" element={<Signup pageName={constants.ADD_USER_PAGE}/>}></Route>    
          <Route path="/updateUser/:id" element={<Signup pageName={constants.UPDATE_USER_PAGE}/>} />   
          <Route path="*" element={<ErrorPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </NotificationProvider>
  </Provider>
);
