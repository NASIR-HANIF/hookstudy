import useHttp from "../Custom_hook/useHttp";
import { Button, Modal, ModalHeader, ModalBody, ModalTitle, Form } from "react-bootstrap";
import { useState } from "react";


const Test = () => {
    const [show, setShow] = useState(false);
    const [request, setRequest] = useState(
        {
            type: "GET",
            url: "http://localhost:1000"
        }
    )

    const data = useHttp(request)

    const Post = ({ item }) => {
        const Pdesign = (
            <>
                <div className="container p-4">
                    <div className="card mb-3">
                        <div className="card-header">
                            <label >{
                                item.title
                            } </label>
                        </div>
                        <div className="card-body">
                            <p> {
                                item.body
                            }</p>
                        </div>
                    </div>
                </div>
            </>
        );
        return Pdesign
    }


    // post request and put request 
    const createPost = (e) => {
        e.preventDefault();
        let form = e.target;
        let formData = new FormData(form)
        return setRequest({
            // type: "POST",
            // url: "http://localhost:1000",

            // type: "PUT",
            // url: "http://localhost:1000/1",
            // data: formData


            type: "DELETE",
            url: "http://localhost:1000/1",
            
        })
    }



    const design = (
        <>
            <h1 className="text-center">All Posts</h1>

            <Button onClick={() => setShow(true)} variant="primary" className="btn">Register</Button>

            <Modal show={show} onHide={() => setShow(false)} >
                <ModalHeader closeButton>
                    <ModalTitle>New Register</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={createPost}>
                        <Form.Control type="text" name="title" className="mb-3" />
                        <Form.Control type="text" name="body" className="mb-3" />
                        <Button type="submit">Submit</Button>
                        {
                            request.type != "GET" ? data.message : null
                        }
                    </Form>
                </ModalBody>
            </Modal>


            {/* {
                data.map((item, index) => {
                    return <Post item={item} key={index} />
                })
            } */}

        </>
    );
    return design
}

export default Test