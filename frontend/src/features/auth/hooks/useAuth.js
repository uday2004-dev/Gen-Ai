// import { useContext } from "react";
// import { AuthContext } from "../services/AuthContext";
// import { login, register, logout, getme } from "../services/auth.api.js"

// export const useAuth = () => {
//     const context = useContext(AuthContext)
//     const { user, setUser, loading, setLoading } = context

//     const handleLogin = async ({ email, password }) => {
//         setLoading(true)

//         try {
//             const data = await login({ email, password })
//             setUser(data.user)
//         } catch (error) {
//             console.log(error)
//         } finally {
//             setLoading(false)
//         }

//     }

//     const handleRegister = async ({ username, email, password }) => {
//         setLoading(true)
//         try {
//             const data = await register({ user, setUser, loading, setLoading })
//             setUser(data.user)
//         } catch (error) {
//             console.log(error)
//         } finally {
//             setLoading(false)
//         }



//     }

//     const handleLogout = async () => {
//         setLoading(true)
//         try {
//             const res = await logout()
//             setUser(null)

//         } catch (error) {
//             console.log(error)
//         } finally {
//             setLoading(false)
//         }
//     }

//     return { user, loading, handleLogin, handleRegister, handleLogout }
// }


import { useContext , useEffect} from "react";
import { AuthContext } from "../services/AuthContext";
import { login, register, logout,getme } from "../services/auth.api.js";

export const useAuth = () => {
    const context = useContext(AuthContext);
    const { user, setUser, loading, setLoading } = context;

    const handleLogin = async ({ email, password }) => {
        setLoading(true);

        try {
            const data = await login({ email, password });
            setUser(data.user);
            console.log("API RESPONSE:", data);
            console.log("USER:", data?.user);
            return data;
        } catch (error) {
            console.log(error.response?.data || error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async ({ userName, email, password }) => {
        setLoading(true);

        try {
            const data = await register({ userName, email, password });
            setUser(data.user);
            return data;
        } catch (error) {
            console.log(error.response?.data || error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        setLoading(true);

        try {
            await logout();
            setUser(null);
        } catch (error) {
            console.log(error.response?.data || error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };


     useEffect(() => {
        const getAndSetUser = async () => {
            try {
                const data = await getme();
                setUser(data.user);
            } catch (error) {
                console.log(
                    "User is not authenticated:",
                    error.response?.data || error.message
                );
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        getAndSetUser();
    }, []);

    return {
        user,
        loading,
        handleLogin,
        handleRegister,
        handleLogout
    };
};
