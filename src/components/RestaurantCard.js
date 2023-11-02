//This is how you import named exports
import { CDN_URL } from "../utils/constants";

//An example of inline css in react
const styleCard = {
    backgroundColor: "#F4F2DE",
}

const RestaurantCard =(props)=>{
    
    //Destructuring props object and naming it as resData
      const {resData} = props;
    //Accessing properties of destructured object
      const {name,cuisines,costForTwo,avgRating,cloudinaryImageId} = resData?.info;
      const {deliveryTime} = resData?.info?.sla;
      return (
          <div className="res-card"style={styleCard}>
              <img 
              className="res-logo"
              alt="res logo" src={ CDN_URL+ cloudinaryImageId}></img>
              <h3>{name}</h3>
              <h4>{cuisines.join(", ")}</h4>
              <h4>{costForTwo}</h4>
              <h4>{avgRating} stars</h4>
              <h4>{deliveryTime} minutes</h4>
          </div>
      )
  }

  export default RestaurantCard;