import { LOGO_URL } from "../utils/constants";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  //The trick here is that when onClick is triggered the setButtonName method changes the name of the buttonName to its new value . But const values cant be changed once initialized so it re-renders or in basic terms calls the Header function again and this time instead of the default value of "Login" being passed , "logout" is passed to buttonName as React kept track of the changes being made and thus the updated header is rendered.
  //This is why a local state variable is needed as JS can only update the variable data but cannot re-render or recall function once again sort of like a refresh so that updated value is shown . This is where React comes .
  const [buttonName, setButtonName] = useState("Login");
  const onlineStatus = useOnlineStatus();

  const { LoggedInUser } = useContext(UserContext);
  //subscribibg to the store using a selector
  //this store prop is coming from app.js file
  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);

  return (
    //read like - when greater than small screen:green,when greater than large screen : fuchsia and when small screen  default to yellow
    //media queries in tailwind
    <div className="flex justify-between bg-yellow-300 shadow-lg sm:bg-green-200 lg:bg-fuchsia-200">
      <div className="logo-container">
        <img className="w-40 p-4" src={LOGO_URL} />
      </div>

      <div className="flex items-center">
        <ul className="flex p-4 m-4">
          <li className="px-4">Online Status : {onlineStatus ? "✅" : "🔴"}</li>

          <li className="px-4">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="px-4">
            <Link to={"/about"}>About</Link>
          </li>
          <li className="px-4">
            <Link to={"/contact"}>Contact us</Link>
          </li>
          <li className="px-4">
            <Link to={"/grocery"}>Grocery</Link>
          </li>
          <li className="px-4 font-bold text-xl">
            <Link to={"/cart"}>Cart - ({cartItems.length})</Link>
          </li>
          <button
            className="login"
            onClick={() => {
              buttonName === "Login"
                ? setButtonName("Logout")
                : setButtonName("Login");
            }}
          >
            {buttonName}
          </button>

          <li className="px-4">{LoggedInUser}</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
