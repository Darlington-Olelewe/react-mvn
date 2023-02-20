import Info from "../Admin/Charts/Info";

const StationList = (props) => {

    return (<div>
        <table className="table table-striped container">
            <thead>
                <tr>
                    <th scope="col">Depot Name</th>
                    <th scope="col">created by</th>
                    <th scope="col">chart</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.data.map(item =>(
                        <tr key= {item.id}>
                            <td>{item.stationName}</td>
                            <td>{item.createdBy}</td>
                            <td><Info route="station" id={item.id}/></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>

    </div>)
}

export default StationList;