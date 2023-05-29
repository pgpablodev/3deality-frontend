import Topbar from '../Topbar'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { Outlet, useLocation } from 'react-router-dom'

const Layout = () => {
    const location = useLocation()
    
    if(location.pathname.slice(0,10)==='/pdfpedido'){        
        return(
            <Outlet />
        )
    }else{
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
}

export default Layout