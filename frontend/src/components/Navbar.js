import './Navbar.css';
import logo from './logo.png';
import {Link} from 'react-router-dom';
import {useSelector} from "react-redux";


const Navbar = ({click}) => {
    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;
    const getCartCount = () => {
        return cartItems.reduce((qty, item) => qty + Number(item.qty), 0);
    };
    return (
        <nav className="navbar">

                <Link className="navbar__image" to="/">
                    <img src={logo} alt="logo"/>
                </Link>

            <Link className="navbar__logo" to="/">
                <h2>Liverpool FC Store</h2>
            </Link>

            <ul className="navbar__links">
                <li>
                    <Link to="/cart" className="cart__link">
                        <i className="fas fa-shopping-cart"></i>
                        <span>
                            Cart
                        <span className="cartlogo__badge">{getCartCount()}</span>
                        </span>

                    </Link>
                </li>
                <li>
                    <Link to="/">
                        Shop
                    </Link>
                </li>
            </ul>

            <div className="hamburger_menu" onClick={click}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </nav>
    )
}
export default Navbar