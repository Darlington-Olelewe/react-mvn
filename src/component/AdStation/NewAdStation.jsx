import React, { useState } from "react";
import style from "./Employee.module.css"
import EndPointService from "../Service/EndPointService";
import modal from "./Modal.module.css"
const NewAdStation = (props) => {
    const [apply, setApply] = useState({ stationName: null });
    const [isClosed, setIsClosed] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setApply((prevState) => {
            return {
                ...prevState,
                [name]: value,
            }
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        EndPointService.createStation(apply).then((response) => {

            setIsClosed(true);

            if (response.status === 200) {
                props.onSendMsg("success")
            } else {
                props.onSendMsg("unsuccessful")
            }
        }).catch((error) => {
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
                                    <label>Station name</label>
                                </div>

                                <div className={style.right}>
                                    <input type='text'
                                        required
                                        name="stationName"
                                        onChange={handleChange}
                                    />
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
                    <button className="btn btn-success" onClick={() => { setIsClosed(!isClosed) }}>Create Station </button>
                </div>
            }

        </div>

    );
}
export default NewAdStation;