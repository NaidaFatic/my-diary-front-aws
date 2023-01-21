import { createContext, useReducer, useEffect } from 'react';
export const AuthContext = createContext();

export const autoReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { token: action.payload }
        case 'LOGOUT':
            return { token: null }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(autoReducer, {
        token: null
    })

    useEffect(() => {
        const user = localStorage.getItem('token')

        if (user) {
            dispatch({ type: 'LOGIN', payload: user })
        }
    }, [])

    console.log('AuthContext state:', state)

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}