import RestaurantCard, { isOpenLabel } from "./RestaurantCard";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer_UI";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Body = () => {
  //Local state variable - very powerful variable
  //First Arg in useState is what to show by default
  //As soon as setListOfRestaurant method is called - react will find out the diff and update the UI accordingly.

  //This is Array destructuring and is same as below codes:
  const [ListOfRestaurants, setListOfRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
  const RestaurantIsOpen = isOpenLabel(RestaurantCard);
  const { LoggedInUser, setUserName } = useContext(UserContext);

  //never modifying the original ListofRestaurants but creating a copy and then using it to render the filtered options.
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  //Live api data calling
  const fetchData = async () => {
    //Fetch method is provided by Browser's JS engine . It returns a promise.
    //handle promise using async await.
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.4624191&lng=88.371794&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const jsonData = await data.json();

    //console.log(jsonData);

    setListOfRestaurant(
      jsonData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
    setFilteredRestaurant(
      jsonData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
  };

  //const arr = useState(resList);

  //const [ListOfRestaurants,setListOfRestaurant] =arr;
  //The above line is the same as below two line of code:
  // const ListOfRestaurants = arr[0];
  // const setListOfRestaurant = arr[1];

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false) {
    return <h1>"You are offline! Please check your Internet Connection."</h1>;
  }

  //Conditional Rendering
  //its using ternary operator to say if true return shimmer or else render component.
  return ListOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter flex">
        <div className="search p-4 m-4">
          <input
            type="text"
            className="search-box border border-solid border-black"
            value={searchText}
            onChange={(e) => {
              //e here is the event which is being used to obtain the input value
              //initially value of search text is "" but each time i type- setSearchText is called and react re-renders the whole body component with the updated searchText value.
              setSearchText(e.target.value);
            }}
          ></input>

          <button
            className="px-4 py-2 m-4 bg-green-200 rounded-lg "
            onClick={() => {
              //always using the ListOfRestaurants to populate the copy(filteredRestaurant) , thus no need to change the original variable
              const filteredRestaurant = ListOfRestaurants.filter((res) =>
                res.info.name
                  .toLowerCase()
                  .includes(searchText.trim().toLowerCase())
              );
              setFilteredRestaurant(filteredRestaurant);
            }}
          >
            Search
          </button>
        </div>

        <div className="px-4 py-2 m-4 flex items-center">
          <button
            className="px-4 py-2 bg-orange-200 rounded-lg "
            onClick={() => {
              //always using the ListOfRestaurants to populate the copy(filteredRestaurant) , thus no need to change the original variable
              const filteredList = ListOfRestaurants.filter(
                (resObj) => resObj.info.avgRating > 4
              );
              setFilteredRestaurant(filteredList);
            }}
          >
            Top rated restaurants
          </button>
        </div>
        <div className="px-4 py-2 m-4 flex items-center">
          <label>UserName -</label>
          <input
            className="border border-black p-2"
            value={LoggedInUser}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-wrap ">
        {
          //For each restaurant Object in the array we are destructuring the
          //object and sending it as the resData which is then taken as the props argument by the Restaurant component.

          //implementation of conflict driven UI
          //The number of restaurants in the array may change depending on backend data and so the number of restaurant cards displayed will also change.

          //Always provide a unique key property when using map or looping through a list.

          //Making the cards clickable using Link.
          filteredRestaurant?.map((RestaurantObj) => (
            <Link
              key={RestaurantObj.info.id}
              to={"/restaurant/" + RestaurantObj.info.id}
            >
              {RestaurantObj.info.isOpen ? (
                <RestaurantIsOpen resData={RestaurantObj} />
              ) : (
                <RestaurantCard resData={RestaurantObj} />
              )}
            </Link>
          ))
        }
      </div>
    </div>
  );
};

export default Body;
