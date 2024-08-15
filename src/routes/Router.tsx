import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from '../pages/Login';
import Home from '../pages/Home';
import { ProtectedRoute } from './ProtectedRoute';
import Clients from "../pages/clients/Clients";
import {AddClient} from "../pages/clients/AddClient";
import {EditClient} from "../pages/clients/EditClient";
import Users from "../pages/users/Users";
import {AddUser} from "../pages/users/AddUser";
import {EditUser} from "../pages/users/EditUser";
import UserTypes from "../pages/authorizations/UserTypes";
import {AddUserType} from "../pages/authorizations/AddUserType";
import Unauthorized from '../pages/Unauthorized';
import Bookings from "../pages/bookings/Bookings";
import {AddBookingByClient} from "../pages/bookings/AddBookingByClient";
import {EditBooking} from "../pages/bookings/EditBooking";
import Passengers from "../pages/passengers/Passengers";
import {AddPassenger} from "../pages/passengers/AddPassenger";
import {EditPassenger} from "../pages/passengers/EditPassenger";
import BookingsByClient from "../pages/bookings/BookingsByClient";
import BookingsByPassenger from "../pages/bookings/BookingsByPassenger";
import {AddPassengerByBooking} from "../pages/passengers/AddPassengerByBooking";
import {BookingReceipt} from "../pages/bookings/bookingReceipt/BookingReceipt";
import {AddBooking} from "../pages/bookings/AddBooking";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import {AddInvoiceModal} from "../pages/invoices/AddInvoiceModal";
import {Invoices} from "../pages/invoices/Invoices";
import {AddClientInvoice} from "../pages/invoices/AddClientInvoice";
import {EditInvoice} from "../pages/invoices/EditInvoice";
import {InvoiceReceipt} from "../pages/invoices/invoiceReceipt/InvoiceReceipt";
import {InvoicesbyClient} from "../pages/invoices/InvoicesByClient";
import {AddInvoiceByClient} from "../pages/invoices/AddInvoiceByClient";

const Router = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token/:idUser" element={<ResetPassword />} />
                <Route path="/" element={<Navigate to="/home" replace />} />
                
                <Route path="/home" element={
                    <ProtectedRoute requiredRoles={['SUPERADMIN', 'ADMIN', 'AGENT']}>
                        <Home />
                    </ProtectedRoute>} />

                    {/*Clients*/}
                    <Route path="/clients" element={
                        <ProtectedRoute requiredRoles={['SUPERADMIN', 'ADMIN', 'AGENT']}>
                            <Clients />
                        </ProtectedRoute>
                    } />
                    <Route path="/clients/add" element={
                        <ProtectedRoute requiredRoles={['SUPERADMIN', 'ADMIN', 'AGENT']}>
                            <AddClient />
                        </ProtectedRoute>
                    } />
                    <Route path="/clients/:clientId" element={
                        <ProtectedRoute requiredRoles={['SUPERADMIN', 'ADMIN', 'AGENT']}>
                            <EditClient />
                        </ProtectedRoute>
                    } />

                    {/*Users*/}
                    <Route path="/users" element={
                        <ProtectedRoute requiredRoles={['SUPERADMIN', 'ADMIN']}>
                            <Users />
                        </ProtectedRoute>
                    } />
                    
                    <Route path="/users/add" element={
                        <ProtectedRoute requiredRoles={['SUPERADMIN', 'ADMIN']}>
                            <AddUser />
                        </ProtectedRoute>
                    } />
                    <Route path="/users/:userId" element={
                        <ProtectedRoute requiredRoles={['SUPERADMIN', 'ADMIN', 'AGENT']}>
                            <EditUser />
                        </ProtectedRoute>
                    } />

                    {/*Bookings*/}
                    <Route path="/bookings" element={
                        <ProtectedRoute requiredRoles={['SUPERADMIN', 'ADMIN', 'AGENT']}>
                            <Bookings />
                        </ProtectedRoute>
                    } />
                    {/*<Route path="/bookings/add" element={*/}
                    {/*    <ProtectedRoute requiredRoles={['SUPERADMIN', 'ADMIN', 'AGENT']}>*/}
                    {/*        <AddBooking />*/}
                    {/*    </ProtectedRoute>*/}
                    {/*} />*/}
                    <Route path="/bookings/add/:clientId" element={
                        <ProtectedRoute requiredRoles={['SUPERADMIN', 'ADMIN', 'AGENT']}>
                            <AddBookingByClient />
                        </ProtectedRoute>
                    } />
                    <Route path="/bookings/:bookingId" element={
                        <ProtectedRoute requiredRoles={['SUPERADMIN', 'ADMIN', 'AGENT']}>
                            <EditBooking />
                        </ProtectedRoute>
                    } />
                    <Route path="/bookings/passenger/:passengerId" element={
                        <ProtectedRoute requiredRoles={['SUPERADMIN', 'ADMIN', 'AGENT']}>
                            <BookingsByPassenger />
                        </ProtectedRoute>
                    } />
                    <Route path="/bookings/receipt/:bookingId" element={
                        <ProtectedRoute requiredRoles={['SUPERADMIN', 'ADMIN', 'AGENT']}>
                            <BookingReceipt />
                        </ProtectedRoute>
                    } />

                    {/*Passengers*/}
                    <Route path="/passengers" element={
                        <ProtectedRoute requiredRoles={['SUPERADMIN', 'ADMIN', 'AGENT']}>
                            <Passengers />
                        </ProtectedRoute>
                    } />
                    <Route path="/passengers/add" element={
                        <ProtectedRoute requiredRoles={['SUPERADMIN', 'ADMIN', 'AGENT']}>
                            <AddPassenger />
                        </ProtectedRoute>
                    } />
                    <Route path="/passengers/add/:bookingId" element={
                        <ProtectedRoute requiredRoles={['SUPERADMIN', 'ADMIN', 'AGENT']}>
                            <AddPassengerByBooking />
                        </ProtectedRoute>
                    } />
                    <Route path="/passengers/:passengerId" element={
                        <ProtectedRoute requiredRoles={['SUPERADMIN', 'ADMIN', 'AGENT']}>
                            <EditPassenger />
                        </ProtectedRoute>
                    } />

                    {/*User Type*/}
                    <Route path="/authorizations" element={
                        <ProtectedRoute requiredRoles={['SUPERADMIN', 'ADMIN']}>
                            <UserTypes />
                        </ProtectedRoute>
                    } />
                    <Route path="/authorizations/add" element={
                        <ProtectedRoute requiredRoles={['SUPERADMIN', 'ADMIN']}>
                            <AddUserType />
                        </ProtectedRoute>
                    } />

                    {/*Invoice*/}
                    <Route path="/invoices" element={
                        <ProtectedRoute requiredRoles={['SUPERADMIN', 'ADMIN']}>
                            <Invoices />
                        </ProtectedRoute>
                    } />
                    <Route path="/invoices/add/:clientId" element={
                        <ProtectedRoute requiredRoles={['SUPERADMIN', 'ADMIN']}>
                            <AddInvoiceByClient />
                        </ProtectedRoute>
                    } />
                    <Route path="/clientInvoices/add/:clientId/:invoiceId" element={
                        <ProtectedRoute requiredRoles={['SUPERADMIN', 'ADMIN']}>
                            <AddClientInvoice />
                        </ProtectedRoute>
                    } />
                    <Route path="/invoices/:invoiceId" element={
                        <ProtectedRoute requiredRoles={['SUPERADMIN', 'ADMIN']}>
                            <EditInvoice />
                        </ProtectedRoute>
                    } />
                    <Route path="/invoices/receipt/:invoiceId" element={
                        <ProtectedRoute requiredRoles={['SUPERADMIN', 'ADMIN']}>
                            <InvoiceReceipt />
                        </ProtectedRoute>
                    } />
                    <Route path="/invoices/client/:clientId" element={
                        <ProtectedRoute requiredRoles={['SUPERADMIN', 'ADMIN']}>
                            <InvoicesbyClient />
                        </ProtectedRoute>
                    } />

                    <Route path="/unauthorized" element={<Unauthorized />} />       
            </Routes>
        </BrowserRouter>
    )
};

export default Router;