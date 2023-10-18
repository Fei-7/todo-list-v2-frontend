"use client"

import style from "./page.module.css"
import TaskList from "../../../components/TaskList"
import Button from "../../../components/Button"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Page() {
    const [name , setName] = useState("")
    const [tasks, setTasks] = useState([])

    const router = useRouter()

    useEffect(() => {(async () => {
        try {
            const response = await fetch("http://localhost:8000/api/user", {
                method: "GET",
                credentials: "include"
            })

            
            if (response.status !== 200) {
                const json = await response.json()
                window.alert(json.message)
                router.push("/login")
                return
            }
    
            const user = await response.json()
            console.log(user)

            console.log(user)
            console.log("why")
            setName(user.name)
            setTasks(user.tasks)

        } catch(err) {
            console.log(err)
            setName("Noob")
        }
    })()}, [])

    async function addTask(e) {
        e.preventDefault()
        const name = document.getElementById("taskName").innerText
        const detail = document.getElementById("taskDetail").innerText
        const priority = parseInt(document.getElementById("taskPriority").value)
        const time = parseInt(Date.now() / 1000)

        if (name === "") {
            window.alert("Please enter task name")
            return
        }

        let newTask = {
            name: name,
            detail: detail,
            time: time,
            priority: priority
        }

        const response = await fetch("http://localhost:8000/api/task", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify(newTask)
        })

        const json = await response.json()

        if (response.status !== 200) {
            window.alert(json.message)
            router.push("/login")
            return
        }

        newTask._id = json._id

        document.getElementById("taskName").innerText = ""
        document.getElementById("taskDetail").innerText = ""
        setTasks([...tasks, newTask])
    }

    async function deleteTask(index) {
        const taskToDel = tasks[index]
        console.log(index)
        console.log(taskToDel)

        const response = await fetch("http://localhost:8000/api/task", {
            method:"DELETE",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify({
                _id: taskToDel._id
            })
        })

        const json = await response.json()

        if (response.status !== 200) {
            window.alert(json.message)
            router.push("/home")
            return
        }

        setTasks(tasks.filter((e, idx) => {return idx != index}))
    }

    async function logout() {
        await fetch("http://localhost:8000/api/logout", {
            method:"POST",
            credentials:"include"
        })
        router.push("/login")
    }


return (
    <div className={style.outer}>
        <div className={style.navbar}>
            <p>Welcome {name}!</p>
            <div>
                <Link href="/settings"><p>settings</p></Link>
                <p onClick={logout}>logout</p>
            </div>
        </div>
        <div className={style.container}>
            <TaskList tasks={tasks} del={deleteTask}/>
            <form className={style.newTask} onSubmit={addTask}>
                <div id="taskName" className={style.name} contentEditable="true" placeholder="Task name" 
                    onKeyDown={(e) => {if (e.key==="Enter") {addTask(e)}}}
                />
                <div id="taskDetail" className={style.content} contentEditable="true" placeholder="detail"
                    onKeyDown={(e) => {if (e.key==="Enter") {addTask(e)}}}
                />
                <div className={style.taskOption}>
                    <p>priority:</p>
                    <select id="taskPriority" defaultValue={2}>
                        <option value={0}>Very High</option>
                        <option value={1}>High</option>
                        <option value={2}>Normal</option>
                        <option value={3}>Low</option>
                    </select>
                </div>
                <div className={style.buttonContainer}>
                    <Button type="submit" name="submit"/>
                    <Button 
                        type="button" 
                        name="cancel" 
                        onClick={() => {
                            document.getElementById("taskName").innerText = ""
                            document.getElementById("taskDetail").innerText = ""
                        }}
                    />
                </div>
            </form>
        </div>
    </div>
)
}