import Info from "../Admin/Charts/Info";

const DepotList = (props) => {

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
                            <td>{item.depotName}</td>
                            <td>{item.createdBy}</td>
                            <td><Info route="depot" id={item.id}/></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>

    </div>)
}

export default DepotList;