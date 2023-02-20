import React, { useState } from 'react'
import logo from "../../images/logo2.jpg"
import style from "./style.module.css"
import Images from '../Service/images';
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { clearCurrentUser } from '../store/actions/user';

const SideNav =()=>{
    const [show, setShow] = useState(false);
    const [adShow, setAdshow] = useState(false);
    const currentUser = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(clearCurrentUser());
        navigate("/")
    }

    const display = () => {
        setShow(!show);
        setAdshow(false);
    }


return (<aside className={style.sidebar}>
        <div className={style.img__div}>
            <img src = {logo} className={style.img} alt="This is northwest logo"/>
        </div>
        <div className={style.sideTag}>
            <ul>
            {currentUser?.role === "ADMIN" &&
                        <li className={style.fund}>
                            <Link to="#" className={style.linkimg}>
                                <img src={Images.sided} alt="icon" className={style.Sidebar_icon} />
                                <span onClick={() => { setAdshow(!adShow); setShow(false) }}>ADMIN</span>
                                <span className={style.btn} onClick={() => { setAdshow(!adShow); setShow(false) }}>{adShow ? <img src={Images.warrowup} alt="a white arrow" /> : <img src={Images.warrowdown} alt="a white arrow" />}</span>
                            </Link>
                        </li>
                    }
                    {adShow &&
                        <div className={style.child}>
                            <Link to="/employee" className={style.linkchild}><li>Employees</li></Link>
                            <Link to="/licensename" className={style.linkchild}><li>License Name</li></Link>
                            <Link to="/license" className={style.linkchild}><li>License</li></Link>
                            <Link to="/office" className={style.linkchild}><li>Offices</li></Link>
                        </div>
                    }

                    <li className={style.fund}>
                        <Link to="/dashboard" className={style.linkimg}>
                            <img src={Images.sided} alt="icon" className={style.Sidebar_icon} />
                            <span onClick={() => { setAdshow(false); setShow(false) }}>Dashboard</span>
                        </Link>
                    </li>
                    <li className={style.fund}>
                        <Link to="/depot" className={style.linkimg}>
                            <img src={Images.sided} alt="icon" className={style.Sidebar_icon} />
                            <span onClick={() => { setAdshow(false); setShow(false) }}>Depot</span>
                        </Link>
                    </li>
                    <li className={style.fund}>
                        <Link to="/station" className={style.linkimg}>
                            <img src={Images.sided} alt="icon" className={style.Sidebar_icon} />
                            <span onClick={() => { setAdshow(false); setShow(false) }}>Station</span>
                        </Link>
                    </li>

                    {!currentUser && (
                        <li className={style.fund}>
                            <Link to="/" className={style.linkimg}>
                                <img src={Images.Iconr} alt="" className={style.Sidebar_icon} />
                                Login
                            </Link>
                        </li>
                    )}
                    {currentUser && (
                        <li className={style.fund}>
                            <Link to="/" className={style.linkimg} onClick={() => logout()}>
                                <img src={Images.Iconr} alt="" className={style.Sidebar_icon} />
                                <span>Logout</span>
                            </Link>
                        </li>
                    )}
            </ul>
        </div>

    </aside>);
}
export default SideNav;