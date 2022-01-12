import "./ProductScreen.css";
import {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";

// Actions
import {getProductDetails} from "../redux/actions/productActions";
import {addToCart} from "../redux/actions/cartActions";

const ProductScreen = ({match, history}) => {
    const dispatch = useDispatch();
    const [qty, setQty] = useState(1);
    const windowUrl = window.location.pathname;
    const paths = windowUrl.split('/');
    console.log(paths[1]);

    const productDetails = useSelector((state) => state.getProductDetails);
    const {loading, error, product} = productDetails;

    useEffect(() => {
        dispatch(getProductDetails(paths[2]));
        // dispatch(getProductDetails('61dc0582096fbdf74d3d3e89'))
        // if (product && paths[1] !== product._id) {
        //     dispatch(getProductDetails(match.params.id));
        // }
    }, [dispatch]);

    // [dispatch, match, product]



    const addToCartHandler = () => {
        dispatch(addToCart(product._id, qty));
        history.push(`/cart`);
    };

    return (
        <div className="productscreen">
            {loading ? (
                <h2>Loading...</h2>
            ) : error ? (
                <h2>{error}</h2>
            ) : (
                <>
                    <div className="productscreen__left">
                        <div className="left__image">
                            <img src={process.env.PUBLIC_URL+'/images/'+product.imageUrl} alt={product.name}/>
                        </div>
                        <div className="left__info">
                            <p className="left__name">{product.name}</p>
                            <p>Price: ${product.price}</p>
                            <p>Description: {product.description}</p>
                        </div>
                    </div>
                    <div className="productscreen__right">
                        <div className="right__info">
                            <p>
                                Price:
                                <span>${product.price}</span>
                            </p>
                            <p>
                                Status:
                                <span>
                  {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                </span>
                            </p>
                            <p>
                                Qty
                                <select value={qty} onChange={(e) => setQty(e.target.value)}>
                                    {[...Array(product.countInStock).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                        </option>
                                    ))}
                                </select>
                            </p>
                            <p>
                                <button type="button" onClick={addToCartHandler}>
                                    Add To Cart
                                </button>
                            </p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProductScreen;