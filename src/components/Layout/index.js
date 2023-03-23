import Topbar from '../Topbar'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { Outlet, useLocation } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons'

const Layout = () => {
    const location = useLocation()

    return(
        <div className="App">
            <Topbar />
            {
                location.pathname==='/'
                ? <Navbar imagen={true}/>
                : <Navbar imagen={false}/>
            }
            <div className="page">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Layout