import { Button } from "bootstrap";
import style from "./AppUsers.module.css"

const UserList = (props) => {
    return (<div>
        <table className="table table-striped container">
            <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Depot Id</th>
                    <th scope="col">Depot Name</th>
                    <th scope="col">Station Id</th>
                    <th scope="col">Station Name</th>
                    <th scope="col">Edit</th>
                </tr>

            </thead>
            <tbody>
                {
                    props.all.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.email}</td>
                            <td>{item.role}</td>
                            <td>{item.depotId}</td>
                            <td>{item.depotName}</td>
                            <td>{item.stationId}</td>
                            <td>{item.stationName}</td>
                            <td><button className="btn btn-success">Edit</button></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>

    </div>)
}
export default UserList;