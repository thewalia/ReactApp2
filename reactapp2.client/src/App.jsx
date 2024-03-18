import './App.css';
import { AdvisorDashboard } from './Components/AdvisorDashboard/AdvisorDashboard';
import Investment from './Components/AdvisorDashboard/Investment';
import { ClientDashboard } from './Components/ClientDashboard/ClientDashboard';
import { Login } from './Components/Login/Login';
import { Register } from './Components/Register/Register';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './Components/Home/Home';
import AdvisorForm from './Components/AdvisorForm/AdvisorForm';
import ClientForm from './Components/ClientForm/ClientForm';
import ListOfClient from './Components/AdvisorForm/ListOfClient/ListOfClient'; // Import ListOfClient
import SellInvestment from './Components/AdvisorDashboard/SellInvestment';

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
        path: '/AdvisorDashboard',
        children: [
            {
                path: '', // Add this route for the exact /advisorform path
                element: <div><AdvisorDashboard /></div>
            },
            {
                path: 'investment', // This will match /advisorform/listofclients
                element: <div><Investment /></div>
            },
            {
                path: 'sellinvestment', // This will match /advisorform/listofclients
                element: <div><SellInvestment /></div>
            }

        ]
       
    },

    {
        path: '/clientdashboard',
        element: <div><ClientDashboard /></div>
    },

    {
        path: '/register',
        element: <div><Register /></div>
    },

    {

        path: '/advisorform',
        children: [
            {
                path: '', // Add this route for the exact /advisorform path
                element: <div><AdvisorForm /></div>
            },
            {
                path: 'listofclients', // This will match /advisorform/listofclients
                element: <div><ListOfClient /></div>
            }
        ]
        
    },



    {

        path: '/clientform',
        element: <div><ClientForm /></div>
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