import axios from "axios"
import { Form , Button } from "react-bootstrap";

// use then catch methood
/*
const getRequest = ()=>{
axios.get("http://localhost:1000")
.then((sucRes)=>{
    const {data} = sucRes
    console.log(data)
})
.catch((error)=>{
    console.log(error)
})

}
*/
//---------------------------------------------------
// use try and catch block get request

const getRequest = async () => {
    try {
        const { data } = await axios.get("http://localhost:1000");
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

// post request
const postRequest = async (e) => {
    e.preventDefault()
    let form = e.target;
        let data = new FormData(form)

    try {
        const response = await axios.post("http://localhost:1000", data);
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
}

// put request
const putRequest = async () => {
    const data = {
        title: "my update coaxios",
        body: "my update axios commit"
    }


    try {
        const response = await axios.put("http://localhost:1000/2", data);
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
}

// delete request
const deleteRequest = async () => {
    try {
        const response = await axios.delete("http://localhost:1000/2");
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
}


const Axios = () => {
    const design = (
        <>
            <div className="container">
                <h1 className="text-center mb-3">Axios request</h1>
                <button onClick={getRequest} className="btn btn-success mb-3">Get Request</button>
                <br />
                <button onClick={postRequest} className="btn btn-info mb-3">POST Request</button>
                <br />
                <button onClick={putRequest} className="btn btn-dark mb-3">POST Request</button>
                <br />
                <button onClick={deleteRequest} className="btn btn-danger mb-3">DELETE Request</button>
                    <hr />
                <Form onSubmit={postRequest} className="w-50">

                    <Form.Control type="text" name="title" className="mb-3" />
                    <Form.Control type="text" name="body"  className="mb-3"  />
                    <Button variant="info" className="float-end" type="submit">Update</Button>

                </Form>
            </div>
        </>
    );
    return design
}

export default Axios