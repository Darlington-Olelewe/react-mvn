import style from "./style.module.css"
import React, { useState, useEffect } from "react";
import EndPointService from "../Service/EndPointService";
import NewAdDepot from "./NewAdDepot";
import DepotList from "./DepotList";
import NewAdStation from "../AdStation/NewAdStation";
import StationList from "../AdStation/StationList";


const Office = () => {

    const [depot, setDepot] = useState([])
    const [station, setStation] = useState([])

    const [deptMsg, setDeptMsg] = useState();
    const [statMsg, setStatMsg] = useState();


    const handleDeptMsg = (info) => {
        setDeptMsg(info);
    }

    const handleStatMsg = (info) => {
        setStatMsg(info);
    }

    useEffect(() => {
        EndPointService.fetchDepot().then((response) => {
            if (response.status === 200) {
                setDepot(response.data)
            }
        })
    }, [deptMsg])

    useEffect(() => {
        EndPointService.fetchStation().then((response) => {
            if (response.status === 200) {
                setStation(response.data)
            }
        })
    }, [statMsg])

    return (<div className={style.main}>

        <div>
            <div>
                <NewAdDepot
                onSendMsg={handleDeptMsg} />
            </div>
            <div>
                <DepotList
                data = {depot}/>
            </div>

        </div>

        <div>

            <div>
                <NewAdStation
                onSendMsg={handleStatMsg}/>
            </div>
            <div>
                <StationList
                data = {station}/>
            </div>
        </div>



    </div>)
}
export default Office;