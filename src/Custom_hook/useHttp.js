import { useState,useEffect } from "react";
import $ from "jquery"

const useHttp = (request)=>{
    const [data ,setData]= useState([])
   


console.log(request)

useEffect(()=>{

    if(request.type == "POST" || request.type == "PUT"){
        request['contentType'] = false;
        request.processData = false
    }

    request['success'] = (r)=>{ 
      
      return  setData(r)
    }

$.ajax(request)


},[request])
return data

}
export default useHttp

// when update request argumen and call use request vareable
// use effect array not implimint use effect when update request vareable 