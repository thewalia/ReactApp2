import './App.css';
import { Dashboard } from './Components/Dashboard/Dashboard';
import { Login } from './Components/Login/Login';
import { Register } from './Components/Register/Register';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './Components/Home/Home';

//router

const router = createBrowserRouter([

    {
        path: '/',
        element: <div><Home /></div>
    },

    {
        path: '/login',
        element: <div><Login /></div>
    },

    {
        path: '/Dashboard',
        element: <div><Dashboard /></div>
    },

    {
        path: '/register',
        element: <div><Register /></div>
    }
])

function App() {
    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
}

export default App;