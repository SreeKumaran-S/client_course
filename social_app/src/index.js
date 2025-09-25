import ReactDOM from 'react-dom/client';
import './index.css';

import { Provider } from "react-redux";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import store from "./store/store";
import NotificationProvider from "./context/NotificationContext";
import Signup from './pages/Signup';
import UsersPage from './pages/UsersPage';
import ErrorPage from './pages/ErrorPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <NotificationProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UsersPage/>}></Route>
          <Route path="/addUser" element={<Signup/>}></Route>       
          <Route path="/updateUser" element={<Signup/>}></Route>
          <Route path="*" element={<ErrorPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </NotificationProvider>
  </Provider>
);
