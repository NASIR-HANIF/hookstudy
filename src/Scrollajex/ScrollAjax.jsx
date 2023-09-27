import $ from "jquery";
import { useEffect, useState } from "react";
const ScrollAjax = () => {

    const [data, setData] = useState([])
    const [start, setStart] = useState(0)
    const [loader , setLoader] = useState(false)

    const getRequest = () => {
        $.ajax({
            type: "GET",
            url: `https://jsonplaceholder.typicode.com/photos?_start=${start}&_limit=16`,
            beforeSend : ()=>{
              return  setLoader(true)
            },
            success: (response) => {
                response.map((item) => {
                    return setData((oldData) => {
                        return [
                            ...oldData,
                            item
                        ]
                    })
                })
            },
            complete : ()=>{
                return  setLoader(false)
            }
        })
    }

    const InfiniteScroll = () => {
        window.onscroll = () => {
            let windowS = (window.innerHeight + window.scrollY)
            let bodyHeight = (document.body.offsetHeight - 150)
            if (windowS >= bodyHeight) {
                setStart(start + 16)
            }
        }
    }

    useEffect(() => {
        getRequest();
        InfiniteScroll()
    }, [start])


    const download = (data) => {
        let a = document.createElement("A");
        a.href = data.url;
        a.download = data.title + ".PNG"
        a.click();
        a.remove()
    }
    const Column = ({ item }) => {
        const colDesign = (
            <>
                <div className="col-md-3 mb-3">
                    <div className="card">
                        <img src={item.url} alt="item.title" />
                        <div className="card-body">
                            <p>{item.title}</p>
                            <button onClick={() => download(item)} className="btn btn-danger">Downloade</button>
                        </div>
                    </div>
                </div>

            </>
        );
        return colDesign
    }
    // loader design
    const Loader = () => {
        const lDesign = (
            <>
                <div className="d-flex justify-content-center py-4">
                    <div class="spinner-grow text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <div class="spinner-grow text-secondary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <div class="spinner-grow text-success" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <div class="spinner-grow text-danger" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <div class="spinner-grow text-warning" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <div class="spinner-grow text-info" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <div class="spinner-grow text-light" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <div class="spinner-grow text-dark" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </>
        );
        return lDesign
    }
    const design = (
        <>
            <div className="container py-4">
                <h1>Infinite Scroll</h1>
                <hr />
                <div className="row">
                    {
                        data.map((item, index) => {
                            return <Column item={item} key={index} />
                        })
                    }
                </div>
                {
                    loader ? <Loader /> : null
                }
            </div>
        </>
    );
    return design
}

export default ScrollAjax