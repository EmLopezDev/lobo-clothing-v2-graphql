import { createContext, useState, useEffect } from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

export const CategoriesContext = createContext({
    categoriesMap: {},
    loading: false,
    error: null,
});

const COLLECTIONS = gql`
    query {
        collections {
            id
            title
            items {
                id
                name
                price
                imageUrl
            }
        }
    }
`;

export const CategoriesProvider = ({ children }) => {
    const { loading, error, data } = useQuery(COLLECTIONS);
    const [categoriesMap, setCategoriesMap] = useState({});

    useEffect(() => {
        if (!data) return;
        const { collections } = data;
        const collectionsMap = collections.reduce((acc, collection) => {
            const { title, items } = collection;
            acc[title.toLowerCase()] = items;
            return acc;
        }, {});
        setCategoriesMap(collectionsMap);
    }, [data]);

    const value = { categoriesMap, loading, error };
    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>;
};
