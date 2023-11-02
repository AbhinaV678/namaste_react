import RestaurantCard from "./RestaurantCard";
import {useState,useEffect} from "react";
import Shimmer from "./Shimmer_UI";;

const Body = ()=>{
  //Local state variable - very powerful variable
  //First Arg in useState is what to show by default
  //As soon as setListOfRestaurant method is called - react will find out the diff and update the UI accordingly.

  //This is Array destructuring and is same as below codes:
  const [ListOfRestaurants,setListOfRestaurant] = useState([]);
  const [searchText,setSearchText] = useState("");

  //never modifying the original ListofRestaurants but creating a copy and then using it to render the filtered options.
  const [filteredRestaurant,setFilteredRestaurant] = useState([]);
  
  useEffect(()=>{
    fetchData();
  },[]);

//Live api data calling
  const fetchData = async()=>{

    //Fetch method is provided by Browser's JS engine . It returns a promise.
    //handle promise using async await.
    const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.4624191&lng=88.371794&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");

    const jsonData = await data.json();

    console.log(jsonData);

    setListOfRestaurant(jsonData?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    setFilteredRestaurant(jsonData?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
  }

  //const arr = useState(resList);

  //const [ListOfRestaurants,setListOfRestaurant] =arr;
  //The above line is the same as below two line of code:
  // const ListOfRestaurants = arr[0];
  // const setListOfRestaurant = arr[1];

  //Conditional Rendering
  //its using ternary operator to say if true return shimmer or else render component.
    return ListOfRestaurants.length===0 ? <Shimmer/> : (
        <div className="body">

            <div className="filter">

            <div className="search">
          <input type="text" className="search-box" value={searchText} onChange={(e)=>{
            //e here is the event which is being used to obtain the input value
            //initially value of search text is "" but each time i type- setSearchText is called and react re-renders the whole body component with the updated searchText value.
            setSearchText(e.target.value);
            
          }}></input>

          <button onClick={()=>{
            //always using the ListOfRestaurants to populate the copy(filteredRestaurant) , thus no need to change the original variable
            const filteredRestaurant =ListOfRestaurants.filter((res)=> res.info.name.toLowerCase().includes(searchText.trim().toLowerCase()));
            setFilteredRestaurant(filteredRestaurant);

          }}>Search</button>
            </div>

                <button className="filter-btn" onClick={()=>{
                  //always using the ListOfRestaurants to populate the copy(filteredRestaurant) , thus no need to change the original variable
                    const filteredList=ListOfRestaurants.filter((resObj)=> resObj.info.avgRating>4
                    );
                    //setListOfRestaurant(filteredList);
                    setFilteredRestaurant(filteredList);
                }}>Top rated restaurants
                </button>
            </div>
            <div className="restro-container">
                {
                  //For each restaurant Object in the array we are destructuring the 
                  //object and sending it as the resData which is then taken as the props argument by the Restaurant component.

                  //implementation of conflict driven UI
                  //The number of restaurants in the array may change depending on backend data and so the number of restaurant cards displayed will also change.

                  //Always provide a unique key property when using map or looping through a list.
                  filteredRestaurant.map((RestaurantObj)=>(
                    <RestaurantCard key={RestaurantObj.info.id} resData={RestaurantObj}/>
                  ))
                }
            </div>
        </div>
    )
}

export default Body;