import React from 'react'
import Cookie from 'cookie-universal'
import { Navigate, Outlet } from 'react-router-dom';
export default function RequireAuth() {
    const cookies = Cookie();
    const token = cookies.get('freelanceCookie');

  return ( token ? <Outlet/> : <Navigate to={'/signin'} /> )
}