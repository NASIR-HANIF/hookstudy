import {useReducer } from "react";

// use reducer multipul state or condition ko handel karne ke kam ata hey
// use stste ki terha he kam karta hey
// defalt value first perameter x me rahey gi 
// state change karney ke leye setType me type ko dubara bhaj dena hey
// setType me bhaga gaya argoment action perameter me receive ho ga
// is terha jo bhi cruent state ho gi us ko useReducer ko bhaja jaye ga
// uesReducer me first or secend argument pe condition laga saktey hen  

const Usereducerhook = ()=>{
    const useReduserFunc = (x , action)=>{
        if(action == "password"){
            return "text"
        }else{
            return "password"
        }
       
    }


    const [type, setType] = useReducer(useReduserFunc ,"password");
    

    const design = (
        <>
            <div className="container py-4 d-flex">
                <input type={type} className="form-control w-25" />
                <button onClick={()=>setType(type)} className="btn btn-danger mx-2 btn">
                    <i className="fa fa-eye-slash"></i>
                </button>
            </div>
        </>
    );
    return design
}
export default Usereducerhook