"use client"

import { useState } from 'react'
import style from './components.module.css'

export default function TaskItem(props) {
    const [showDetail, setShowDetail] = useState(false)

    return (
        <div className={style.taskItem}>
            <input type="checkbox" onChange={() => {props.del(props.index)}}/>
            <p className={style.taskName} onClick={() => {setShowDetail(!showDetail)}}>{props.task.name}</p>
            {showDetail?<p className={style.detail}>{props.task.detail}</p>:null}
        </div>
    )
}