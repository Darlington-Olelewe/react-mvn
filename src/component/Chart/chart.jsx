import { useSelector } from "react-redux"
import style from "./Chart.module.css"
const Chart=()=>{

    const currUser = useSelector(state => state.user)
    console.log("comming from chart")
    console.log(currUser);

    return (
        <p className={style.chart}>this is it the chart section of the project</p>
    )

}
export default Chart;