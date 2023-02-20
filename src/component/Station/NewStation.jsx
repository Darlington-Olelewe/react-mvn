import React, { useState, useEffect } from "react";
import style from "./Employee.module.css"
import EndPointService from "../Service/EndPointService";
import modal from "./Modal.module.css"

const NewStation = (props) => {
    const [apply, setApply] = useState({
        dateOfExpiration: null,
        dateOfProcurement: null,
        durationWindowInWeeks: null,
        licenseName: null,
        price: null
    });
    const [licensenames, setLicenseNames] = useState([]);
    const [isClosed, setIsClosed] = useState(true);
    const [file, setFile] = useState();

    useEffect(() => {
        EndPointService.fetchLicenseNames().then((resp) => {
            const newdata = { id: 0, licenseName: "---select---" }
            const data = resp.data;
            data.unshift(newdata);
            console.log(data)
            setLicenseNames(data)
        })
    }, []);

    const fileHandler = (e) => {
        setFile(e.target.files[0]);
    }

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
        EndPointService.createStationLicence(apply).then((response) => {
            setIsClosed(true);
            if (response.status === 200) {
                const formData = new FormData();
                formData.append("file", file)
                EndPointService.attachDocument(formData, response.data.id).then((response) => {
                    if (response.status === 200) {
                        props.onSendMsg("success")
                        setIsClosed(true)
                    } else {
                        props.onSendMsg("unsuccessful")
                    }
                })

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
                                    <label>License Name</label>
                                </div>

                                <div className={style.right}>
                                    <select name="licenseName"
                                        onChange={handleChange}
                                        required
                                        type='text'>
                                        {licensenames.map((item, index) => (
                                            <option key={index} value={item.licenseName}>{item.licenseName}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className={style.form__group}>
                                <div className={style.left}>
                                    <label>Procurement Date</label>
                                </div>

                                <div className={style.right}>
                                    <input type='date'
                                        required
                                        name="dateOfProcurement"
                                        onChange={handleChange} />
                                </div>
                            </div>
                            <div className={style.form__group}>
                                <div className={style.left}>
                                    <label>Expiration Date</label>
                                </div>

                                <div className={style.right}>
                                    <input type='date'
                                        required
                                        name="dateOfExpiration"
                                        onChange={handleChange} />
                                </div>
                            </div>

                            <div className={style.form__group}>

                                <div className={style.left}>
                                    <label>Price</label>
                                </div>

                                <div className={style.right}>
                                    <input name="price"
                                        onChange={handleChange}
                                        required
                                        type="number"
                                    />
                                </div>
                            </div>


                            <div className={style.form__group}>

                                <div className={style.left}>
                                    <label>Renewal Period</label>
                                </div>

                                <div className={style.right}>
                                    <input name="durationWindowInWeeks"
                                        onChange={handleChange}
                                        required
                                        type="number"
                                    />
                                </div>
                            </div>


                            <div className={style.form__group}>
                                <div className={style.left}>
                                    <label>License Document</label>
                                </div>
                                <div className={style.right}>
                                    <input type="file" name="file" required onChange={fileHandler} accept=".doc, .docx, .pdf" />
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
                    <button className="btn btn-success" onClick={() => { setIsClosed(!isClosed) }}>New License </button>
                </div>
            }

        </div>

    );
}
export default NewStation;

