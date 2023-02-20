import React, { useState, useEffect } from "react";
import EndPointService from "../Service/EndPointService";
import DepotList from "./DepotList";
import { useSelector } from "react-redux";
import { AiFillCaretLeft } from "react-icons/ai";
import { AiFillCaretRight } from "react-icons/ai";
import style from "./AppUsers.module.css"
import NewDepot from "./NewDepot";
import Info from "../Admin/Charts/Info";

const Depot = () => {
    const currentUser = useSelector(state => state.user);
    const [query, setQuery] = useState("");
    const [details, setDetails] = useState([]);
    const Keys = ["dateOfExpiration", "dateOfProcurement", "licenseName", "price"];
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPgage, setPostPerPage] = useState(10);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        EndPointService.fetchDepotLicenses(currentUser.depotId).then((response) => {
            setDetails(response.data)
            console.log(response.data)
        })
    }, [message])

    const search = (any) => {
        return any.filter((item) => Keys.some(key => item[key].toLowerCase().includes(query)));
    };

    const getMessage = (msg) => {
        setMessage(msg)
    }

    const indexOfLastPost = currentPage * postPerPgage;
    const indexOfFirstPost = indexOfLastPost - postPerPgage;
    const filtered = search(details);
    const currentPost = filtered.slice(indexOfFirstPost, indexOfLastPost);


    return (
        <div className={style.main}>

            <div className={style.controls}>
                <div className={style.controls__left}>
                    <input
                        className={style.pp}
                        type="number"
                        value={postPerPgage}
                        onChange={(e) => setPostPerPage(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="search...."
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                {!message &&
                    <div className="alert alert-success">{message}</div>
                }

                <NewDepot onSendMsg={getMessage} />
                <Info route={"depot"} id={1}/>
                <div className={style.controls__right}>
                    <AiFillCaretLeft onClick={() => {
                        if (currentPage !== 1) {
                            setCurrentPage(currentPage - 1);
                        }
                    }} />
                    <span>{currentPage + " OF " + Math.ceil(filtered.length / postPerPgage)}</span>
                    <AiFillCaretRight
                        onClick={() => {
                            if (currentPage !== Math.ceil(filtered.length / postPerPgage)) {
                                setCurrentPage(currentPage + 1)
                            }
                        }}
                    />
                </div>

            </div>
            <div className={style.table}>
            <DepotList all={currentPost} onGetMsg={getMessage}/>
        </div>


        </div>
    );
}
export default Depot;