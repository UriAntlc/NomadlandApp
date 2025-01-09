import { createContext, useContext, useState } from "react";
const searchContext = createContext();

export const SearchProvider = ({children}) =>{
    const [searchData, setSearchData] = useState ({
        ciudad: '',
        categoria: '',
        presupuesto: '',
        calificacionMinima:'',
        ambiente:'',
        acompanantes: '',
    });
    return(
        <searchContext.Provider value = {{SearchData, setSearchData}}>
            {children}
        </searchContext.Provider>
    );
};

export const useSearch = () => useContext(searchContext);