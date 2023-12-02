import { useContext, createContext, useState, useEffect } from 'react';

function AuthProviderProps{
    children: React.ReactNode;
}

const AuthContext = createContext({
    isAuthenticated: false,
})

export function AuthProvider({children, isAuthenticated}){
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    return(
        <AuthContext.Provider value={{isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}