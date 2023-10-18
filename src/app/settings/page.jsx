"use client"
import homeStyle from "../home/page.module.css"
import style from "./page.module.css"
import Button from "../../../components/Button"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Page() {
    const [name , setName] = useState("")
    const [newPassword, setNewPassword] = useState("")
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

        } catch(err) {
            console.log(err)
            setName("Noob")
        }
    })()}, [])

    async function logout() {
        await fetch("http://localhost:8000/api/logout", {
            method:"POST",
            credentials:"include"
        })
        router.push("/login")
    }

    async function changePassword() {
        const response = await fetch("http://localhost:8000/api/password", {
            method:"POST",
            headers: {"Content-Type": "application/json"},
            credentials:"include",
            body: JSON.stringify({
                password: newPassword
            })
        })

        const json = await response.json()
        window.alert(json.message)
        setNewPassword("")
    }

    return (
        <div className={homeStyle.outer}>
            <div className={homeStyle.navbar}>
                <p>Welcome {name}!</p>
                <div>
                    <p>settings</p>
                    <p onClick={logout}>logout</p>
                </div>
            </div>
            <div className={style.main}>
                <div className={style.changeName}>
                    <h1>Change username</h1>
                    <input type="text" placeholder="Enter new username"/>
                    <div className={style.buttonContainer}>
                        <Button 
                            type="button"
                            name="Apply"
                        />
                    </div>
                </div>
                <div className={style.password}>
                    <h1>Change password</h1>
                    <input onChange={(e) => {setNewPassword(e.target.value)}} value={newPassword} type="password" placeholder="Enter new password"/>
                    <div className={style.buttonContainer}>
                        <Button 
                            type="button"
                            name="Apply"
                            onClick={changePassword}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}