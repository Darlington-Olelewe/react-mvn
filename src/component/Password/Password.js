import React, { useState } from "react";
import style from "./Password.module.css"
import EndPointService from "../Service/EndPointService";
import modal from "./Modal.module.css"

const Password = (props) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isDisabled, setIsDisableld] = useState(true);
    const [message, setMessage] = useState();
    const [isClosed, setIsClosed] = useState(true);

    const handleOldPassword = (e) => {
        setOldPassword(e.target.value);
    }
    const handleNewPassword = (e) => {
        setNewPassword(e.target.value);
        if (e.target.value === confirmPassword) {
            setIsDisableld(false)
        } else {
            setIsDisableld(true)
        }
        if (e.target.value === "") setIsDisableld(true);
    }

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);

        if (e.target.value === newPassword) {
            setIsDisableld(false)
        } else {
            setIsDisableld(true)
        }
        if (e.target.value === "") setIsDisableld(true);
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            oldPassword, newPassword, confirmPassword
        }

        EndPointService.changePassword(payload).then((response) => {
            if (response.status === 200) {
                setIsClosed(!isClosed)
                props.onSend("Password Changed")

            } else {
                setIsClosed(!isClosed)
                props.onSend("Change unsuccessful")
            }

        }).catch((error) => {
            setIsClosed(!isClosed)
            props.onSend("Change unsuccessful")
        })



    }

    return (<div className={style.main}>
        {!isClosed &&

            <div className={modal.modal}>
                <div onClick={() => { setIsClosed(!isClosed) }} className={modal.overlay}></div>

                <form onSubmit={handleSubmit} className={modal.modal__content}>


                    <div className={style.form__group}>
                        <div className={style.left}>
                            <legend>Old Password</legend>
                        </div>
                        <div className={style.right}>
                            <input
                                required
                                type="password"
                                placeholder="old****word"
                                name="oldPassword"
                                onChange={handleOldPassword}
                            />
                        </div>
                    </div>

                    <div className={style.form__group}>
                        <div className={style.left}>
                            <legend>New Password</legend>
                        </div>
                        <div className={style.right}>
                            <input
                                type="password"
                                placeholder="new****word"
                                required
                                name="newPassword"
                                onChange={handleNewPassword}
                            />
                        </div>
                    </div>
                    <div className={style.form__group}>
                        <div className={style.left}>
                            <legend>Confirm Password</legend>
                        </div>
                        <div className={style.right}>
                            <input
                                required
                                type="password"
                                placeholder="con****word"
                                name="confirmPassword"
                                onChange={handleConfirmPassword}
                            />
                        </div>
                    </div>


                    <div className={style.form__group}>
                        <div className={style.space}>
                            <button className="btn btn-danger" onClick={() => { setIsClosed(!isClosed) }}>Close </button>
                            <button type="submit" className="btn btn-success" disabled={isDisabled}>Change Password</button>
                        </div>
                    </div>

                </form>
            </div>
        }
        {isClosed &&
            <div>
                <button onClick={() => { setIsClosed(!isClosed) }} className="btn btn-success">Change Password </button>
            </div>
        }

    </div>)
}

export default Password