import './App.css';
import { Dashboard } from './Components/Dashboard/Dashboard';
import { AdvisorLogin } from './Components/Login/AdvisorLogin';
import { ClientLogin } from './Components/Login/ClientLogin';
import { AdvisorRegister } from './Components/Register/AdvisorRegister';
import { ClientRegister } from './Components/Register/ClientRegister';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './Components/Home/Home';

//router

const router = createBrowserRouter([

    {
        path: '/',
        element: <div><Home /></div>
    },

    {
        path: '/advisor/login',
        element: <div><AdvisorLogin /></div>
    },
    
    {
        path: '/client/login',
        element: <div><ClientLogin /></div>
    },
    
    {
        path: '/Dashboard',
        element: <div><Dashboard /></div>
    },
    {
        path: '/advisor/register',
        element: <div><AdvisorRegister /></div>
    },
    {
        path: '/client/register',
        element: <div><ClientRegister /></div>
    },
])

function App() {
    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
}

export default App;