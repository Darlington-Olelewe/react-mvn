import fileDownload from "js-file-download";
import EndPointService from "../Service/EndPointService";

const StationList = (props) => {
    
    const handleDownload=(id,doc)=>{
        EndPointService.downloadDocument(id).then((response)=>{
            fileDownload(response.data,doc)
        })

    }

    return (<div>

        <table className="table table-striped container">
            <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">licenseName</th>
                    <th scope="col">price</th>
                    <th scope="col">renewal period</th>
                    <th scope="col">Procurment</th>
                    <th scope="col">Expiration</th>
                    <th scope="col">Download</th>
                    <th scope="col">Update</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.all.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.licenseName}</td>
                            <td>{item.price}</td>
                            <td>{item.durationWindowInWeeks} weeks</td>
                            <td>{item.dateOfProcurement}</td>
                            <td>{item.dateOfExpiration}</td>
                            <td><button className="btn btn-success"  onClick={() => handleDownload(item.id,item.docName)}>Download</button></td>
                            <td><button className="btn btn-success">update</button></td>
                            
                        </tr>
                    ))
                }
            </tbody>
        </table>

    </div>)
}
export default StationList;