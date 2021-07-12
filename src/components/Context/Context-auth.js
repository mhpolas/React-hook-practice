import React,{useState, useCallback} from 'react'




export const AuthContext=React.createContext({
    isAuth: false,
    login:()=>{}
})

const ContextProvider=props=>{

    const [isAuthentic,setAuth]=useState(false);
    const loginHandeler=()=>{
        setAuth(true);
    }
    return (
        <AuthContext.Provider value={{login:loginHandeler,isAuth:isAuthentic}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default ContextProvider;