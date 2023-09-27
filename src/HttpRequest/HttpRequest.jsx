import { Button, Container, Modal, ModalHeader, ModalTitle, ModalBody, Form, FormGroup } from "react-bootstrap"
import { useState, useEffect } from "react"
import $ from "jquery";
import 'animate.css/animate.min.css';

const HttpRequest = () => {
    const [allData, setAllData] = useState([])
    const [singleData, setSingleData] = useState([])
    const [modalState, setModalstate] = useState(false)
    const [counter, setCounter] = useState(null)
    const [button , setButton]= useState(true)
    const [index, setIndex] = useState(0)
    const [input , setInput]= useState({
        title : "",
        body : ""
    })
    const [animation, setAnimation] = useState("animate__animated animate__zoomIn")

    // ajex request
    const fetchAllData = () => {
        $.ajax({
            type: "GET",
            url: "http://localhost:1000",
            success: (response) => {
                if (response.length == 0) {
                    setAllData(response)

                } else {
                    return (
                        setAllData(response),
                        setIndex(response[response.length - 1].id + 1)
                    )
                }


            }
        })
    }

    // fatch data bt id
    const fatchDataById = () => {
        $.ajax({
            type: "GET",
            url: `http://localhost:1000/${allData.length ? counter : 0}`,
            success: (response) => {
                if (response.length != 0) {
                    setSingleData(response)
                }

            }
        })
    }

    // card
    const Card = ({ item }) => {
        const design = (
            <>
                <div className={"card mb-3 " + animation}>
                    <div className="card-header
                     fw-bold
                      text-uppercase  
                      d-flex justify-content-between 
                      align-items-center
                      ">
                        <label>
                            {item.title}
                        </label>
                        <div>
                            <button onClick={()=>editData(item)} className="btn btn-light mx-2">
                                <i className="fa fa-edit"></i>
                            </button>

                            <button onClick={deleteData} className="btn btn-light">
                                <i className="fa fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <div className="card-body">
                        {item.body}
                    </div>
                </div>
            </>
        );
        return design
    }

     // insert function
     const insertData = (e) => {
        e.preventDefault()
        let form = e.target;
        let formData = new FormData(form)
        let title = formData.get("title")
        let body = formData.get("body")
        let id = index
        $.ajax({
            type: "POST",
            url: "http://localhost:1000",
            data: {
                title: title,
                body: body,
                id: id
            },
            success: (response) => {
                
                return (
                    setModalstate(false),
                    setCounter(response.data.id)
                )
            }
        })
    }

    // editData function
    const editData = (item)=>{
            return(
                setCounter(item.id),
                setModalstate(true),
                setButton(false),
                setInput(item)
            )
    }

    const setInputValue = (e)=>{
        e.preventDefault()
        let input = e.target;
        let value = input.value;
        let key = input.name;
        return setInput((oldData)=>{
            return{
                ...oldData,
                [key] : value
            }
        })
    }


    // updateData
    const updateData = (e)=>{
        e.preventDefault();
        let formData = new FormData(e.target)
        $.ajax({
            type : "PUT",
            url : `http://localhost:1000/${counter}`,
            data : formData,
            contentType : false,
            processData : false,
            success : (response)=>{
                console.log(response)
                return(
                    setModalstate(false),
                    setButton(true),
                    setSingleData([input]),
                    setInput({
                        title : "",
                        body : ""
                    })
                )
            }
        })
    }

    // delete data
    const deleteData = ()=>{

    }

    
    // on loade ajex request
    useEffect(() => {
        fetchAllData()
        fatchDataById()

    }, [counter])

   

    const nextFunc = () => {
        return (
            counter <= allData.length - 2 ? setCounter(counter + 1) : null,
            setAnimation("animate__animated animate__fadeInRight")
        )
    }
    // preview btn
    const prevFunc = () => {
        return (
            counter > 0 ? setCounter(counter - 1) : null,
            setAnimation("animate__animated animate__fadeInLeft")
        )
    }

    const design = (
        <>
            <Container className="mt-4 shadow-lg p-4 overflow-hidden">
                <div className="d-flex justify-content-between align-items-center bg-body-secondary mb-4 p-2">
                    <h1 className="display-4 p-0 m-0" >
                        Comments
                        <sup>{allData.length ? counter + 1 : ""}</sup>
                    </h1>
                    <Button onClick={() => { setModalstate(true) }} className="btn btn-danger">
                        New Comment
                        <sup>{allData.length}</sup>
                    </Button>
                </div>
                {
                    singleData.map((item, index) => {
                        return <Card item={item} key={index} />
                    })
                }
                <h1 className="text-center">{allData.length ? "" : "There Is No Data"}</h1>
                <div className="d-flex justify-content-end">
                    <Button onClick={prevFunc} className="btn btn-light border float-end mx-4 px-3 fa-2x">
                        <i className="fa fa-angle-left"></i>
                    </Button>
                    <Button onClick={nextFunc} className="btn btn-light border float-end px-3 fa-2x">
                        <i className="fa fa-angle-right"></i>
                    </Button>
                </div>
                <Modal show={modalState} onHide={() =>(setModalstate(false),setButton(true))}>
                    <ModalHeader closeButton>
                        <ModalTitle>Add New Comments</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={button ? insertData : updateData}>
                            <FormGroup className="mb-3">
                                <Form.Label> Title</Form.Label>
                                <Form.Control type="text" 
                                name="title" 
                                value={input.title} 
                                onChange={setInputValue} />
                            </FormGroup>
                            <FormGroup className="mb-3">
                                <Form.Label> Body</Form.Label>
                                <textarea name="body" 
                                className="form-control"
                                rows={"2"} 
                                value={input.body} 
                                onChange={setInputValue}></textarea>
                            </FormGroup>
                            {
                              button ? <Button variant="danger" className="float-end" type="submit">Submit</Button> :
                              <Button variant="info" className="float-end" type="submit">Update</Button>
                            }
                            
                        </Form>
                    </ModalBody>
                </Modal>
            </Container>
        </>
    );
    return design
}



export default HttpRequest;