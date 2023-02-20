import EndPointService from "../Service/EndPointService";
import style from "./Dashboard.module.css"
import { AiOutlineBank } from "react-icons/ai";
import { AiOutlineEnvironment } from "react-icons/ai";
import { AiOutlineCalendar } from "react-icons/ai";
import { AiOutlineTeam } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { useSelector } from 'react-redux';
import { useState } from "react"
import Password from "../Password/Password";

const Dashboard = () => {

    const currentUser = useSelector(state => state.user);
    const [message, setMessage] = useState();
    const recieveMessage = (msg) => {
        setMessage(msg)
    }

    return (<div className={style.dashboard}>

        <div className={style.major}>
            <div className={style.primary}>

                <div className={style.details}>
                    <div className={style.icon}>
                        <AiOutlineBank />
                    </div>

                    <div className={style.detail}>
                        <p className={style.info__title}>First Name</p>
                        <p className={style.info__body}>{currentUser.firstName}</p>
                    </div>
                </div>
                <div className={style.details}>
                    <div className={style.icon}>
                        <AiOutlineBank />
                    </div>

                    <div className={style.detail}>
                        <p className={style.info__title}>Last Name</p>
                        <p className={style.info__body}>{currentUser.lastName}</p>
                    </div>
                </div>


                {currentUser.stationId &&
                    <div className={style.details}>
                        <div className={style.icon}>
                            <AiOutlineEye />
                        </div>

                        <div className={style.detail}>
                            <p className={style.info__title}>Station</p>
                            <p className={style.info__body}>{currentUser.stationName}</p>
                        </div>
                    </div>
                }

                {currentUser.depotId &&
                    <div className={style.details}>
                    <div className={style.icon}>
                        <AiOutlineEye />
                    </div>

                    <div className={style.detail}>
                        <p className={style.info__title}>Depot</p>
                        <p className={style.info__body}>{currentUser.depotName}</p>
                    </div>
                </div>
                }

                <div className={style.details}>
                    <div className={style.icon}>
                        <AiOutlineCalendar />
                    </div>

                    <div className={style.detail}>
                        <p className={style.info__title}>Role</p>
                        <p className={style.info__body}>{currentUser.role}</p>
                    </div>
                </div>

                <div className={style.details}>
                    <div className={style.icon}>
                        <AiOutlineTeam />
                    </div>

                    <div className={style.detail}>
                        <p className={style.info__title}>Email</p>
                        <p className={style.info__body}>{currentUser.email}</p>
                    </div>
                </div>

            </div>

            <div className={style.secondary}>
                <div className={style.notification}>
                    <Password onSend={recieveMessage} />
                    {message && (
                        <div className="alert alert-success">{message}</div>
                    )}
                </div>
            </div>

        </div>
    </div>);

}
export default Dashboard;