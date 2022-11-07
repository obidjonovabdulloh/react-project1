import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

import "../navigation/navigation.styles.scss"

import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart-context";

import { signOutUser } from "../../utils/firebase/firebase.utils";
import { useState } from "react";


const Navigation = () => {
    const { currentUser , setCurrentUser } = useContext(UserContext)
    const { isCartOpen} = useContext(CartContext)
    const signOutUserHandlar = async () => {
        const res = await signOutUser();
        setCurrentUser(null)
    }   


    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to="/">
                    <CrwnLogo className="logo" />
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to="/shop">
                        Shop
                    </Link>
                    {currentUser ? (
                        <span className="nav-link" onClick={signOutUserHandlar}>Sing Out</span>
                    ) : (
                        <Link className="nav-link" to="/auth">
                            Sing-In
                        </Link>
                    )}
                    <CartIcon/>
                </div>
                {isCartOpen && <CartDropDown/>}
            </div>
            <Outlet />
        </Fragment>
    );
}

export default Navigation;