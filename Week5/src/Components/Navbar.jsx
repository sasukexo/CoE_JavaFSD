import React, { useContext, useState } from "react";
import { BiSearch, BiUser } from "react-icons/bi";
import { FaShoppingBag } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";

const Navbar = () => {
    const { searchProducts, quantity } = useContext(ShopContext);
    const [query, setQuery] = useState("");

    const handleSearch = (e) => {
        setQuery(e.target.value);
        searchProducts(e.target.value);
    };

    return (
        <div>
            <div className="flex justify-between items-center px-14 py-6 w-full z-50 bg-black">
                <Link to="/">
                    <h2 className="text-2xl font-bold text-white">Shopify</h2>
                </Link>
                <div className="relative search flex items-center- space-x-4">
                    <BiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl text-gray-50" />
                    <input
                        value={query}
                        onChange={handleSearch}
                        type="text"
                        placeholder="Search"
                        className="pl-12 bg-white pr-10 py-3 w-[200px] rounded-full border-2 border-white focus:outline-none"
                    />
                </div>
                <div className="flex items-center space-x-8">
                    <Link to="/cart" className="relative">
                        <FaShoppingBag className="text-3xl text-white" />
                        {quantity > 0 && (
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
                                {quantity}
                            </span>
                        )}
                    </Link>
                    <BiUser className="text-3xl text-white" />
                </div>
            </div>
        </div>
    );
};

export default Navbar;








