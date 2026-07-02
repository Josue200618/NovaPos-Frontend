import {

BrowserRouter,
Routes,
Route,
Navigate

} from "react-router-dom";

import Login from "../features/auth/pages/Login";

import DashboardLayout from "../layouts/DashboardLayout";

import PrivateRoute from "./PrivateRoute";
import { UserDashboard } from "../features/users";
import Dashboard from "../features/dashboard/pages/Dashboard";
import Products from "../features/products/pages/Products";
import Providers from "../features/providers/pages/Providers";
import Purchases from "../features/purchases/pages/Purchases";
import Sales from "../features/sales/pages/Sales";
import Register from "../features/auth/pages/Register";
import ForgotPassword from "../features/auth/pages/ForgotPassword";
import ResetPassword from "../features/auth/pages/ResetPassword";


export default function AppRouter(){

    return(

        <BrowserRouter>

            <Routes>

                <Route

                    path="/login"

                    element={<Login/>}

                />

                <Route

                    path="/"

                    element={<Navigate to="/login"/>}

                />

                  <Route

                path="/register"

                element={<Register/>}

            />

                <Route
        
                    path="/forgot-password"

                    element={<ForgotPassword/>}

                />
                <Route

                        path="/reset-password"

                        element={<ResetPassword/>}

                    />

                     <Route

                                path="/dashboard"

                                element={

                                    <PrivateRoute>

                                        <DashboardLayout/>

                                    </PrivateRoute>

                                }

                            >

                                <Route

                                    index

                                    element={<Dashboard/>}

                                />

                                <Route

                                    path="clientes"

                                    element={<UserDashboard/>}

                                />

                                <Route

                                    path="productos"

                                    element={<Products/>}

                                />

                                <Route

                                    path="proveedores"

                                    element={<Providers/>}

                                />

                                <Route

                                    path="compras"

                                    element={<Purchases/>}

                                />

                                <Route

                                    path="ventas"

                                    element={<Sales/>}

                                />

                            </Route>

                     </Routes>

        </BrowserRouter>

    )

}