import { FunctionComponent, useContext } from "react";
import { SiteTheme } from "../App";

interface AboutProps {

}

const About: FunctionComponent<AboutProps> = () => {
    let theme =useContext(SiteTheme);
    return (
        <div className={`aboutStyle ${theme}`}>
            <h5 className="display-1 text-center">About Us...</h5>
            <p className="container backGround col-md-6 p-5 d-flex text-center" style={{ fontSize: "1.4rem" }}>
                Welcome to our site! Here, we strive to connect businesses and users seamlessly and efficiently. Our platform serves as a hub for businesses to advertise their services and for users to discover and contact these businesses easily.

                At its core, our site offers a comprehensive directory of businesses in various industries. Users can explore a wide variety of businesses, each with their own unique offerings and specialties. Whether you are looking for a local restaurant, a reliable plumber or a reliable accountant, our website has you covered.

                For users who wish to take advantage of the additional benefits, we offer a familiar user login feature. By becoming a recognized user, you will gain access to exclusive features and personalized options tailored to your preferences.
                It allows you to save favorite businesses, get recommendations based on your interests, and easily manage your interactions with the businesses you've connected with.

                If you log in as a business user, you are given the option to advertise your business and in any case you are given all the options of deleting the business, editing it, etc.

                One of the key functions of our website is the ability for recognized users to display and manage their customers. This feature empowers businesses to maintain a strong relationship with their customers. Recognized users can effortlessly edit client information, remove outdated information and ensure their clients have the most up-to-date and accurate representation on our platform.

                In conclusion, our website acts as a bridge between businesses and users, providing a user-friendly platform to connect, explore and engage. We strive to make the process of searching and connecting to businesses as simple and enjoyable as possible. Whether you are a business owner looking to expand your reach or a user in need of reliable services, our site is here to assist you every step of the way.
                We wish you efficient and nice use!!! 
            </p>
        </div>
    )
}

export default About;