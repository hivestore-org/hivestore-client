import React from 'react';
//import ReactDOM from 'react-dom';
import App from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
import { createRoot } from 'react-dom/client';
 //import reportWebVitals from './reportWebVitals';


const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <Provider store={store}>
            <App />
    </Provider> 
);