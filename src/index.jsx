import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { UserProvider } from "./contexts/user.context";
import { CategoriesProvider } from "./contexts/categories.context.jsx";
import { CartProvider } from "./contexts/cart.context.jsx";
import App from "./App.jsx";
import "./index.scss";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const client = new ApolloClient({
    link: new HttpLink({
        uri: "https://crwn-clothing.com/",
    }),
    cache: new InMemoryCache(),
});

root.render(
    <StrictMode>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <UserProvider>
                    <CategoriesProvider>
                        <CartProvider>
                            <App />
                        </CartProvider>
                    </CategoriesProvider>
                </UserProvider>
            </BrowserRouter>
        </ApolloProvider>
    </StrictMode>,
);
