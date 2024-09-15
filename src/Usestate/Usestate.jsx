import { useState } from "react";
const Usestate = () => {
    const [type, setType] = useState("password");
  
    const design = (
        <>
            <div className="container py-4 d-flex">
                <input type={type} className="form-control w-25" />
                <button onClick={()=>type == "password" ? setType("text") : setType("password")} className="btn btn-danger mx-2 btn">
                    <i className="fa fa-eye-slash"></i>
                </button>

            </div>
        </>
    );
    return design
}
export default Usestate