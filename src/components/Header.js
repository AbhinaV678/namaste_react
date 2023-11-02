import { LOGO_URL } from "../utils/constants";
import { useEffect, useState } from "react";

const Header = ()=>{

    //The trick here is that when onClick is triggered the setButtonName method changes the name of the buttonName to its new value . But const values cant be changed once initialized so it re-renders or in basic terms calls the Header function again and this time instead of the default value of "Login" being passed , "logout" is passed to buttonName as React kept track of the changes being made and thus the updated header is rendered.
    //This is why a local state variable is needed as JS can only update the variable data but cannot re-render or recall function once again sort of like a refresh so that updated value is shown . This is where React comes .
const [buttonName,setButtonName] =useState("Login");

    useEffect(()=>{
        console.log("UseEffect called.");
    },[buttonName]);

    return  (
        <div className="header">
            <div className="logo-container">
                <img className="logo" src={LOGO_URL}/>
            </div>

            <div className="nav-items">
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact us</li>
                    <li>Cart</li>
                    <button className="login" onClick={()=>{
                       buttonName==="Login"? setButtonName("Logout"): setButtonName("Login");
                    }}  > 
                    {buttonName} 
                    </button>
                </ul>
            </div>
        </div>
    )
}

export default Header;