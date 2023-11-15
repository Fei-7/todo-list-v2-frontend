"use client"

import Button from "../../../components/Button"
import style from "./page.module.css"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { isValidEmail } from "../../../utils/inputValidate"

export default function Page() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    async function submit(e) {
        e.preventDefault()

        if (!isValidEmail(email)) {
            alert("Email is not valid");
            return;
        }

        const response = await fetch("http://localhost:8000/api/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        const json = await response.json()
        console.log(json)
        if (response.status === 200) {
            router.push("/home")
        } else {
            window.alert(json.message)
        }
    }

    return (
        <div className={style.container}>
            <form className={style.loginContainer} onSubmit={submit}>
                <h1>Login</h1>
                <input 
                    className={style.input} 
                    type="email" 
                    placeholder="Email"
                    onChange={(e) => {setEmail(e.target.value)}}
                />
                <input 
                    className={style.input} 
                    type="password" 
                    placeholder="Password"
                    onChange={(e) => {setPassword(e.target.value)}}
                />
                <Button 
                    className={style.button}
                    name="login"
                    type="submit"    
                />
            </form>
        </div>
    )
}