import React from "react";
import hero_img from '../assets/hero.jpg';

const Hero = () => {
    return (
        <div>
            <div className="grid w-full place-items-center bg py-10">
                <div className="text-center max-w-3xl">
                    <h1 className="text-5xl font-bold mt-10 text-black">
                        Shopify<br /> With US
                    </h1>
                    <p className="text-lg mt-3 text-black">
                    Welcome to Shopify – Your Ultimate E-Commerce Solution! 🚀

Shopify is a leading e-commerce platform that empowers businesses of all sizes to create, customize, and manage their online stores with ease. Whether you're starting a new business or expanding an existing one, Shopify provides everything you need – from secure payments and seamless checkout to powerful marketing and analytics tools.
                    </p>
                    <img src={hero_img} alt="Hero Image" className="w-[740px] h-[400px] mt-10 place-self-center" />
                </div>
            </div>
        </div>
    );
};

export default Hero;

