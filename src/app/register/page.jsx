"use client"

import { useState } from "react"
import Button from "../../../components/Button"
import style from "../login/page.module.css"
import { useRouter } from "next/navigation"
import { isValidEmail, isValidname } from "../../../utils/inputValidate"

export default function Page() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    async function submit(e) {
        e.preventDefault()

        if (!isValidEmail(email)) {
            alert("Email is not valid");
            return;
        }

        await fetch("http://localhost:8000/api/register", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        })

        router.push("/login")
    }


    return (
        <div className={style.container}>
            <form className={style.loginContainer} onSubmit={submit}>
                <h1>Register</h1>
                <input 
                    className={style.input} 
                    type="text" 
                    placeholder="Name"
                    onChange={(e) => {setName(e.target.value)}}
                />
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
                    name="register"
                    type="submit"
                />
            </form>
        </div>
    )
}