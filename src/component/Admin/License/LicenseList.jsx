import { Button } from "bootstrap";
import style from "./AppUsers.module.css"

const LicenseList = (props) => {



    return (<div>
        <table className="table table-striped container">
            <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">license Name</th>
                    <th scope="col">Created by</th>
                </tr>

            </thead>
            <tbody>
                {
                    props.all.map((item) => (
                        <tr key={item.licenseName}>
                            <td>{item.id}</td>
                            <td>{item.licenseName}</td>
                            <td>{item.createdBy}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>

    </div>)
}
export default LicenseList;