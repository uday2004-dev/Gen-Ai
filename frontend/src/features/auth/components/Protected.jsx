// import React from 'react'
// import { useAuth } from '../hooks/useAuth'
// import { useNavigate } from 'react-router'

// const Protected = ({children}) => {


//     const { loading, user } = useAuth()

//     const navigate = useNavigate()

//     if (loading) {
//         return (<main><h1>loading....</h1></main>)
//     }

//     if (!user) {
//         navigate("/login")
//     }
//     return  children   
// }

// export default Protected


import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Protected = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!user) {
        return <Navigate to="/login"/>;
    }

    return children;
};

export default Protected;