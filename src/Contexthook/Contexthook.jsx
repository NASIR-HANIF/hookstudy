import { useState, createContext, useContext , useRef, useEffect  } from "react";
const Sender = createContext()


const Header = () => {
    const [color, setColor] = useState("red")
    // use Cuntext data
    const userData = useContext(Sender)

    // access any element jsx
    const myElement = useRef()
     useEffect(()=>{
        let data =   myElement.current
        data.style.color = color
     })
      
        
    const design = (
        <>
            <h1 ref={myElement}>my name is :{userData.name} </h1>
            <button onClick={()=>setColor("green")}>Click me</button>
        </>
    );
    return design
}

const Footer = () => {
    const userData = useContext(Sender)
    const design = (
        <>
            <h1>{userData.roll}</h1>
        </>
    );
    return design
}



const Contexthook = () => {
    const [data, setData] = useState({
        name: "nasir",
        roll: 12345
    })
    const design = (
        <>
            <Sender.Provider value={data} >
                <Header />
                <Footer />
            </Sender.Provider>
        </>
    );
    return design
}
export default Contexthook