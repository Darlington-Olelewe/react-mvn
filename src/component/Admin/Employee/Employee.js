import React, { useState, useEffect } from "react";
import style from "./Employee.module.css"
import EndPointService from "../../Service/EndPointService";
import modal from "./Modal.module.css"

const Employee = (props) => {
    // private String firstName;
    // private String lastName;
    // private String email;
    // private Gender gender;
    // private Long depotId;
    // private Long stationId;
    // private Role role;

    const [apply, setApply] = useState({firstName:null, lastName:null, email:null, gender:"MALE", depotId:null, stationId:null, role:"USER"});
    const [depotOption, setDepotOption] = useState([]);
    const [stationOption, setStationOption] = useState([]);
    const [isClosed, setIsClosed] = useState(true);

    useEffect(() => {
        EndPointService.fetchDepot().then((resp) => {
            const newdata = {
                "id": 0,
                "depotName": "-- select --"
            }
            const data = resp.data;
            data.unshift(newdata);
            setDepotOption(data)
        })
    }, []);

    useEffect(() => {
        EndPointService.fetchStation().then((resp) => {
            const newdata = {
                "id": 0,
                "stationName": "-- select --"
            }
            const data = resp.data;
            data.unshift(newdata);
            setStationOption(data)
        })
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setApply((prevState) => {
            return {
                ...prevState,
                [name]: value,
            }
        });

        console.log(apply)
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        // const num = apply.departmentID;
        // const num2 = apply.locationId;
        // const num3 = apply.personalSupervisorId;

        // apply.departmentID = parseInt(num);
        // apply.locationId = parseInt(num2);
        // apply.personalSupervisorId = parseInt(num3);


        // AdminServices.createStaff(apply).then((response) => {
        //     setIsClosed(true)
        //     if (response.status === 201) {
        //         props.onSendMsg("success")
        //     } else {
        //         setIsClosed(true)
        //         props.onSendMsg("unsuccessful")
        //     }

        // }).catch((error) => {
        //     setIsClosed(true)
        //     props.onSendMsg("Not successful")
        // })

        EndPointService.createEmployee(apply).then((response)=>{
            setIsClosed(true);
            if(response.status === 200){
                props.onSendMsg("success")
            }else{
                props.onSendMsg("unsuccessful")
            }
        }).catch((error)=>{
            setIsClosed(true)
            props.onSendMsg("unsuccessful")
        })

    }

    return (
        <div>
            {!isClosed &&
                <div className={modal.modal}>
                    <div onClick={() => { setIsClosed(!isClosed) }} className={modal.overlay}></div>

                    <form onSubmit={handleSubmit} className={modal.modal__content}>
                        <div >


                            <div className={style.form__group}>
                                <div className={style.left}>
                                    <label>First Name</label>
                                </div>

                                <div className={style.right}>
                                    <input type='text'
                                        required
                                        name="firstName"
                                        onChange={handleChange}
                                    />
                                </div>

                            </div>

                            <div className={style.form__group}>
                                <div className={style.left}>
                                    <label>Last Name</label>
                                </div>

                                <div className={style.right}>
                                    <input type='text'
                                        name="lastName"
                                        required
                                        onChange={handleChange}
                                    />
                                </div>

                            </div>

                            <div className={style.form__group}>
                                <div className={style.left}>
                                    <label>Email</label>
                                </div>

                                <div className={style.right}>
                                    <input type='text'
                                        name="email"
                                        required
                                        onChange={handleChange}
                                    />
                                </div>

                            </div>
                            <div className={style.form__group}>

                                <div className={style.left}>
                                    <label>Depot</label>
                                </div>

                                <div className={style.right}>
                                    <select name="depotId"
                                        onChange={handleChange}
                                        required
                                        type='number'>
                                        {depotOption.map((item) => (
                                            <option key={item.id} required type='number' value={parseInt(item.id)}>{item.depotName} </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className={style.form__group}>

                                <div className={style.left}>
                                    <label>Station</label>
                                </div>

                                <div className={style.right}>
                                    <select name="stationId"
                                        onChange={handleChange}
                                        required
                                        type='number'>
                                        {stationOption.map((item) => (
                                            <option key={item.id} required type='number' value={parseInt(item.id)}>{item.stationName} </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className={style.form__group}>
                                <div className={style.left}>
                                    <label>Gender</label>
                                </div>

                                <div className={style.right}>
                                    <select name="gender"
                                        onChange={handleChange}
                                        required
                                    >
                                        <option type='text' value="MALE">Male </option>
                                        <option type='text' value="FEMALE">Female </option>

                                    </select>
                                </div>

                            </div>

                            <div className={style.form__group}>
                                <div className={style.left}>
                                    <label>Role</label>
                                </div>

                                <div className={style.right}>
                                    <select name="role"
                                        required
                                        onChange={handleChange}
                                    >

                                        <option type='text' value="USER">USER</option>
                                        <option type='text' value="ADMIN">Admin</option>

                                    </select>
                                </div>

                            </div>

                        </div>

                        <div className={style.form__group}>
                            <div >
                                <button className="btn btn-danger" onClick={() => { setIsClosed(!isClosed) }}>Close </button>
                                <button className="btn btn-success"
                                    type="submit">Apply</button>
                            </div>
                        </div>
                    </form>
                </div>

            }
            {isClosed &&
                <div>
                    <button className="btn btn-success" onClick={() => { setIsClosed(!isClosed) }}>Create Employee </button>
                </div>
            }

        </div>

    );
}
export default Employee;

