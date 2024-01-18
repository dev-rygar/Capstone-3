import React from 'react';
import navbarStyles from '../styles/NavbarStyle';
import { NavLink } from 'react-router-dom';
import { useUser } from '../UserContext';
import Swal from 'sweetalert2';

export default function Navbar() {
  const { user, logout } = useUser();
  const isLoggedIn = user !== null;

    return (
        <nav className={navbarStyles.navbar}>
            <div className={navbarStyles.logoContainer}>
                <span className={navbarStyles.span}>AT.CART</span>
            </div>

            <div className={navbarStyles.navLinks}>
                <NavLink to="/" className={navbarStyles.navLink}>Home</NavLink>
                <NavLink to="/products" className={navbarStyles.navLink}>Products</NavLink>
                <NavLink to="/cart" className={navbarStyles.navLink}>Cart</NavLink>
                <NavLink to="/orders" className={navbarStyles.navLink}>Orders</NavLink>
            </div>

            <div className={navbarStyles.authLinks}>
                {isLoggedIn ? (
                  <div>
                      <NavLink to="/profile" className={navbarStyles.authLink}>Profile</NavLink>
                      <button onClick={logout} className={navbarStyles.authLink}>Logout</button>
                  </div>
                ) : (
                    <div>
                        <NavLink to="/login" className={navbarStyles.authLink}>Login</NavLink>
                        <NavLink to="/register" className={navbarStyles.ctaButton}>Register</NavLink>
                    </div>
                )}
            </div>
        </nav>
    );

};