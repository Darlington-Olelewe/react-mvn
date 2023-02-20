import React,{useState, useEffect} from "react";
import EndPointService from "../../Service/EndPointService";
import UserList from "./UserList";
import { AiFillCaretLeft } from "react-icons/ai";
import { AiFillCaretRight } from "react-icons/ai";
import style from "./AppUsers.module.css"
import Employee from "../Employee/Employee";

const AppUsers = () =>{
    const [query, setQuery] = useState("");
    const [details, setDetails] = useState([]);
    const Keys = ["firstName", "lastName", "email", "gender", "depotName", "stationName"];
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPgage, setPostPerPage] = useState(10);
    const [message, setMessage] = useState();

    useEffect(()=>{
        EndPointService.fetchAllEmployee().then((response) =>{
            setDetails(response.data)
        })
    },[message])

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


    return(
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
            
            <Employee onSendMsg={getMessage} />
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
            <UserList all={currentPost} onGetMsg={getMessage}/>
        </div>


    </div>
    );
}
export default AppUsers;