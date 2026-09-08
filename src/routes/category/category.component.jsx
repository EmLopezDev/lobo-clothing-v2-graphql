import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";
import { CategoryContainer, Title } from "./category.styles";
import ProductCard from "../../components/product-card/product-card.component";
import Spinner from "../../components/spinner/spinner.component";

const GET_CATEGORY = gql`
    query ($title: String!) {
        getCollectionsByTitle(title: $title) {
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

const Category = () => {
    const { category } = useParams();
    const { loading, data } = useQuery(GET_CATEGORY, {
        variables: {
            title: category,
        },
    });
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (!data) return;
        const {
            getCollectionsByTitle: { items },
        } = data;
        setProducts(items);
    }, [category, data]);

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <Title>{category.toUpperCase()}</Title>
                    <CategoryContainer>
                        {products &&
                            products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                    </CategoryContainer>
                </>
            )}
        </>
    );
};

export default Category;
