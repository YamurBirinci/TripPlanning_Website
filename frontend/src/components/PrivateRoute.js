import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ roles, redirectPath = '/login' }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to={redirectPath} />;
    }

    if (roles && !roles.includes(user.role)) {
        return <Navigate to="/unauthorized" />;
    }

    return <Outlet />;
};

export default PrivateRoute;
