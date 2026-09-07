import { useContext } from "react";

import ShoppingIcon from "../../assets/shopping-bag.svg?react";

import { CartContext } from "../../contexts/cart.context";

import { CartIconContainer, ItemCount } from "./cart-icon.styles";

const CartIcon = () => {
    const { cartCount, toggleIsCartOpen } = useContext(CartContext);

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon className="shopping-icon" />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    );
};

export default CartIcon;
