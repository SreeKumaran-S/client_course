import ReactDOM from 'react-dom/client';
import './index.css';
import Signup from './pages/Signup.jsx';
import { Provider } from "react-redux";
import store from "./store/store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <Signup />
  </Provider>
);
