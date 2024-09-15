import { useState , useCallback } from "react";

// use call back hook is leye use kertay hen keh jab data print karwana ho us waqat
// loop puray data ko print karta hey 
// jab keh hamey sirf us data ko add karna hey jo new update huva hey 
// na keh purana data or new data dubara lode karna 
// jo data update ho ga us ko call back key array me den gey
const Usecallbackhook = () => {
    const [data, setData] = useState([
        {
            name : "nasir",
            roll : 54
        }
    ]);

    const addMore = useCallback(()=>{
      return  setData((oldData)=>{
            return [
                ...oldData,
                {
                    name : "abdulhadi",
                    roll : 564
                }
            ]
        })
    },[data])


    const design = (
        <>
            <div className="container py-4">

                <table className="table">
                    <thead>
                    <tr>
                    <th>name</th>
                    <th>roll</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item,index)=>{
                                const newTr = (
                                    <>
                                    <tr>
                                       <td>{item.name}</td>
                                       <td>{item.roll}</td>
                                    </tr>
                                    </>
                                )
                                return newTr;
                            })
                        }
                    </tbody>
                
                </table>
                <button onClick={addMore} className="btn btn-primary">Add More</button>
            </div>
        </>
    );
    return design
}
export default Usecallbackhook