import React from "react";
import cover from "../../assets/cover.png"
import "./home.css"


const Home = () =>{
    return (
        <div className="home-page">
            <section className="home-img">
                <img 
                    alt="home-image"
                    loading="lazy"
                    src={cover}
                />
            </section>
            <section className="home-text">
                <h1>Welcome to <span>profile Store app</span></h1>
                <p>
                    Welcome to our profile store application where you can create
                    customize and manage your digital identity effortlessly. 
                    Our platform offers a seamless experience allowing you to curate
                    your profile to reflect your personality interests and professional
                    achievements. Whether you're connecting with friends networking with
                    colleagues or showcasing your skills to potential employers
                </p>
            </section>
        </div>
    )
}
export default Home