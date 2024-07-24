import { useEffect, useState } from "react";

const User = ({name})=>{

    const [count,setCount] = useState(0);
    const [count2] = useState(1);

    // useEffect(()=>{
    //     const timer =setInterval(() => {
    //         console.log("Ok");
    //     }, 1000);

    //     return ()=>{
    //         clearInterval(timer);
    //         console.log("OP");
    //     }
    // },[]);

    return (
        <div className="user-card">
            <h1>Count = {count}</h1>
            <h1>Count2 = {count2}</h1>
            <h2>{name}</h2>
            <h3>Location : Kolkata</h3>
            <h4>Contact : devKr1984@gmail.com</h4>
        </div>
    )
}

export default User;