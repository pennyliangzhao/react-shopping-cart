import "./HomeScreen.css";
import homescreenimage from './homescreenimage.jpg';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import Product from "../components/Product";

//Actions
import { getProducts as listProducts } from "../redux/actions/productActions";
import logo from "../components/logo.png";

const HomeScreen = () => {
    const dispatch = useDispatch();

    const getProducts = useSelector((state) => state.getProducts);
    const { products, loading, error } = getProducts;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    return (
        <div className="homescreen">
            <div className="homescreen__image">
                <img src={homescreenimage} alt="homescreenimage"/>
            </div>
            <h2 className="homescreen__title">Latest Products</h2>
            <div className="homescreen__products">
                {loading ? (
                    <h2>Loading...</h2>
                ) : error ? (
                    <h2>{error}</h2>
                ) : (
                    products.map((product) => (
                        <Product
                            key={product._id}
                            name={product.name}
                            description={product.description}
                            price={product.price}
                            imageUrl={process.env.PUBLIC_URL+'/images/'+product.imageUrl}
                            productId={product._id}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default HomeScreen;