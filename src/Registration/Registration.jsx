import "./Registration.css";
import { Container, Button, Modal, Form, Table } from "react-bootstrap"
import "font-awesome/css/font-awesome.min.css"
import { useState } from "react";
const Registration = () => {
    const [modalState, setModalState] = useState(false);
    const [allData, setAllData] = useState([])
    const [buttonState, setButtonState] = useState(true)
    const [index, setIndex] = useState(0)
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        password: "",
        mobile: "",
        profile: ""
    })
    const setInputValue = (e) => {
        let input = e.target;
        let key = input.name;
        let value = input.value;
        return setInput((old) => {
            return {
                ...old,
                [key]: value
            }
        })

    }

    let tmp = {}; // 
    const getFormData = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        for (let data of formData.entries()) {
            let key = data[0]
            let value = data[1]
            if (typeof (value) == "object") {
                value = URL.createObjectURL(value)
            }
            tmp[key] = value  // object me key or value bananey k leye

        }


    }

    // delete user
    const deleteUser = (index) => {
        let tmpData = [...allData]
        tmpData.splice(index, 1)
        return setAllData(tmpData)

    }
    // insert Data
    const insertData = (e) => {
        getFormData(e)
        return (
            setAllData((oldData) => {
                return [
                    ...oldData,
                    tmp
                ]
            }),
            setModalState(false),
            setInput({
                fullname: "",
                email: "",
                password: "",
                mobile: "",
                profile: ""
            })
        )
    }

    // update data
    const updateData = (e) => {
        getFormData(e)
        const tmpData = [...allData];
        tmpData[index] = tmp;
        return (
            setModalState(false),
            setButtonState(true),
            setAllData(tmpData),
            setInput({
                fullname: "",
                email: "",
                password: "",
                mobile: "",
                profile: ""
            })

        )
    }

    // edit user
    const editUser = (data) => {
        return (
            setModalState(true),
            setInput(data),
            setButtonState(false),
            setIndex(data.index)
        )
    }

    // control modal
    const controlModal = () => {
        return (
            setModalState(false),
            setButtonState(true)
        )
    }
    const Tr = ({ item }) => {
        const design = (
            <>
                <tr>
                    <td>{item.index + 1}</td>
                    <td>
                        <img src={item.profile} className="rounded-circle" width={50} height={50} />
                    </td>
                    <td>{item.fullname}</td>
                    <td>{item.email}</td>
                    <td>{item.password}</td>
                    <td>{item.mobile}</td>
                    <td>
                        <Button className="btn btn-primary mx-2"
                            onClick={() => editUser(item)}
                        >
                            <i className="fa fa-edit "></i>
                        </Button>
                        <Button className="btn btn-danger mx-2"
                            onClick={() => deleteUser(item.index)}
                        >
                            <i className="fa fa-trash "></i>
                        </Button>
                    </td>
                </tr>
            </>
        );
        return design
    }
    const design = (
        <>
            <Container className="py-3">
                <h1 className="text-center fw-bold"> All Registration Data</h1>
                <Button className="rounded-circle add-btn" variant="primary" onClick={() => setModalState(true)} >
                    <i className="fa fa-plus"></i>
                </Button>
                <Modal show={modalState} onHide={controlModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            New Registration
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={buttonState ? insertData : updateData}>
                            <Form.Group className="mb-2">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="fullname"
                                    value={input.fullname}
                                    onChange={setInputValue}
                                />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={input.email}
                                    onChange={setInputValue}
                                />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={input.password}
                                    onChange={setInputValue}
                                />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Mobile</Form.Label>
                                <Form.Control
                                    type="tel"
                                    name="mobile"
                                    value={input.mobile}
                                    onChange={setInputValue}
                                />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Profile</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="profile"
                                />
                            </Form.Group>
                            {
                                buttonState ? <Button variant="danger"
                                    type="submit"
                                    className="float-end">
                                    <i className="fa fa-plus"></i>
                                    Add User
                                </Button> :
                                    <Button variant="info"
                                        type="submit"
                                        className="float-end">
                                        <i className="fa fa-plus"></i>
                                        Update User
                                    </Button>
                            }
                        </Form>
                    </Modal.Body>
                </Modal>
                <Table striped bordered hover className="text-center mt-4">
                    <thead>
                        <tr>
                            <th>Sr NO</th>
                            <th>Profile</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Mobile</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allData.map((item, index) => {
                                item["index"] = index
                                return <Tr item={item} key={index} />
                            })
                        }
                    </tbody>
                </Table>
            </Container>
        </>
    );
    return design
}
export default Registration