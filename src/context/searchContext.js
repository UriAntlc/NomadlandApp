import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const SearchProvider = ({children}) =>{
    const [SearchData, setSearchData] = useState ({
        ciudad: '',
        categoria: '',
        presupuesto: '',
        calificacionMinima:'',
        ambiente:'',
        acompanantes: '',
    });
    return(
        <SearchContext.Provider value = {{SearchData, setSearchData}}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => useContext(SearchContext);