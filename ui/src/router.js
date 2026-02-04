import { createBrowserRouter } from "react-router-dom";

import Layout from "./Layout";
import Home from "./Home";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
        ]
    }
]);

export default router;
