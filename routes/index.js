import {createBrowserRouter} from 'react-router-dom'
import {app} from '../app'

const router = createBrowserRouter([
    {
        path: "/",
        element: app(),
    }
])

export {router};