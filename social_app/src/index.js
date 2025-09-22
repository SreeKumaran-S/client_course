import ReactDOM from 'react-dom/client';
import './index.css';
import Signup from './pages/Signup';
import { Provider } from "react-redux";
import store from "./store/store";
import NotificationProvider from "./context/NotificationContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <NotificationProvider>
      <Signup />
    </NotificationProvider>
  </Provider>
);
