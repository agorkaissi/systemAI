import {NavLink, Outlet} from "react-router-dom";
import './App.css';

const Layout = () => {
    return (
        <>
            <header className="app-header">
                <div className="container header-row">
                    <h1 className="app-title">
                        <strong>Simple AI system</strong>
                    </h1>

                    <nav className="app-nav">
                        <NavLink to="/" end>Home</NavLink>
                    </nav>
                </div>
            </header>
            <main>
                <Outlet/>
            </main>
            <footer>
                <div className="container">
                    <strong>&#169; 2026. All rights reserved</strong>

                </div>
            </footer>
        </>
    )
        ;
};

export default Layout;
