import React, { useState } from 'react';
import modal from "./Modal.module.css"
import 'chartjs-adapter-date-fns';
import style from "./Charts.module.css"
import {
    Chart as ChartJS,
    CategoryScale,
    TimeScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import EndPointService from '../../Service/EndPointService';
import { useEffect } from 'react';

const Info = (props) => {
    ChartJS.register(
        CategoryScale,
        TimeScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );
    const [chartInfo, setChartBuilder] = useState({})
    const [isClosed, setIsClosed] = useState(true);

    useEffect(() => {
        EndPointService.fetchChart(props.route, props.id).then((response) => {
            setChartBuilder(response.data)
        })
    }, [])

    const options = {
        plugins: {
            title: {
                display: true,
                text: chartInfo.name,
            },
        },
        responsive: true,
        scales: {
            x: {
                stacked: true,

            },
            y: {
                stacked: true,
                type: 'time',
                time: {
                    unit: 'month'
                },
                min: '2022-07-01',
                max: '2023-07-01'

            },
        },
    }

    const data = {
        labels: chartInfo.label,
        datasets: [

            // {
            //     label: 'Messaging Time ',
            //     data: chartInfo.dataSet2,
            //     backgroundColor: 'rgb(53, 162, 235)',
            // },
            
            {
                label: 'Expiration Time',
                data: chartInfo.dataSet,
                backgroundColor: 'rgb(255, 99, 132)',
            },
            {
                label: 'Renewal Time',
                data: chartInfo.dataSet1,
                backgroundColor: 'rgb(75, 192, 192)',
            }
            
            
            // {
            //     label: chartInfo.name,
            //     data: chartInfo.objects
            // }
        ]
    }

    console.log(data)

    return (<div>
        {!isClosed &&
            <div className={modal.modal}>
                <div onClick={() => { setIsClosed(!isClosed) }} className={modal.overlay}></div>
                <div >
                    <div className={modal.modal__content}>
                        <div className={style.charts}>
                        <Bar options={options} data={data} />
                        </div>
                    </div>

                </div>

            </div>
        }
        {isClosed &&
            <div>
                <button className="btn btn-success" onClick={() => { setIsClosed(!isClosed) }}>Chart</button>
            </div>
        }

    </div>)





}
export default Info;