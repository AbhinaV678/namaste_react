//This is how you import named exports
import { CDN_URL } from "../utils/constants";
import UserContext from "../utils/UserContext";
import { useContext } from "react";

//An example of inline css in react
const styleCard = {
  backgroundColor: "#F4F2DE",
};

const RestaurantCard = (props) => {
  //Destructuring props object and naming it as resData
  const { resData } = props;
  //Accessing properties of destructured object
  const { name, cuisines, costForTwo, avgRating, cloudinaryImageId } =
    resData?.info;
  const { deliveryTime } = resData?.info?.sla;
  //An example of using React Context anywhere
  const { LoggedInUser } = useContext(UserContext);
  return (
    <div className="m-4 p-4 w-[250px] rounded-lg bg-orange-100 hover:bg-orange-300">
      <img
        className=" rounded-lg w-[220px] h-[150px]"
        alt="res logo"
        src={CDN_URL + cloudinaryImageId}
      ></img>
      <h3 className="font-bold py-4 text-lg">{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{costForTwo}</h4>
      <h4>{avgRating} stars</h4>
      <h4>{deliveryTime} minutes</h4>
      <h4>User : {LoggedInUser}</h4>
    </div>
  );
};

//Higher order component

//input - restaurantCard , output restaurantIsOpen component
// ...props - JS spread operator
export const isOpenLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label className="absolute bg-black text-white m-2 p-2 rounded-lg">
          Open
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
