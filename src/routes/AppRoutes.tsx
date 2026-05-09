import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Employees from "../pages/Employees";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route path="/employees" element={<Employees />} />
            </Routes>    
        </BrowserRouter>        
    );
}

export default AppRoutes;