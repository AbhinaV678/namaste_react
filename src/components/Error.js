import { useRouteError } from "react-router-dom";

const Error = ()=>{
    const err = useRouteError();
    console.log(err);
    return (
        <div>
            <h1>Oops!!</h1>
            <img src="https://www.severnedgevets.co.uk/sites/default/files/styles/medium/public/guides/kitten.png?itok=Wpg9ghjs"></img>
            <h2>Something went wrong..</h2>
            <h3>{err.status} : {err.statusText}</h3>
            <h4>{err.data}</h4>
        </div>
    )
}

export default  Error;
