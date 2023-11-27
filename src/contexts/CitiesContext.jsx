import { useCallback, useReducer } from 'react';
import { createContext, useContext, useEffect } from 'react';

const citiesContext = createContext();
const BASE_URL = 'http://localhost:8000';

const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
    error: ""
};


function reducer(state, action) {

    switch (action.type) {
        case "loading":
            return {
                ...state,
                isLoading: true,
            };


        case "cities/loaded":
            return {
                ...state,
                isLoading: false,
                cities: action.payload
            };


        case "city/created":
            return {
                ...state,
                isLoading: false,
                cities: [...state.cities, action.payload]
            };


        case "city/deleted":
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter(city => city.id !== action.payload)
            };


        case "city/loaded":
            return {
                ...state,
                isLoading: false,
                currentCity: action.payload
            };


        case "rejected":
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        default:
            throw new Error("Unknown action");
    }
}



function CitiesProvider({ children }) {

    const [{ cities, isLoading, currentCity }, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        async function fetchCities() {
            dispatch({ type: "loading" });
            try {
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();

                dispatch({ type: "cities/loaded", payload: data });

            } catch (err) {
                dispatch({ type: "rejected", payload: "there was an error loading data" });
            }
        }
        fetchCities();

    }, []);

    const getCity = useCallback(async function getCity(id) {
        dispatch({ type: "loading" });
        try {
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();
            dispatch({ type: "city/loaded", payload: data });
        } catch (err) {
            dispatch({ type: "rejected", payload: "there was an error loading city" });
        }
    }, []);

    async function createCity(newCity) {
        dispatch({ type: "loading" });

        try {
            const res = await fetch(`${BASE_URL}/cities`, {
                method: 'POST',
                body: JSON.stringify(newCity),
                headers: {
                    "content-Type": 'application/json'
                }
            });
            const data = await res.json();
            dispatch({ type: "city/created", payload: data });

        } catch (err) {
            dispatch({ type: "rejected", payload: "there was an error creating city" });

        }
    }

    async function deleteCity(id) {
        dispatch({ type: "loading" });

        try {
            const res = await fetch(`${BASE_URL}/cities/${id}`, {
                method: 'DELETE',
            });

            dispatch({ type: "city/deleted", payload: id });
        } catch (err) {
            console.log(err.message);
        }
    }


    return (
        <citiesContext.Provider value={{
            cities,
            isLoading,
            currentCity,
            getCity,
            createCity,
            deleteCity
        }}>
            {children}
        </citiesContext.Provider>
    );
}


function useCities() {
    const context = useContext(citiesContext);
    return context;
}
export { CitiesProvider, useCities };
