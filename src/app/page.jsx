import Link from "next/link"
import style from "./page.module.css"
import Button from "../../components/Button"


export default function() {
    return (
        <div className={style.container}>
            <div className={`${style.left} ${style.side}`}>
                <div>
                    <h1>To-do List</h1>
                    <p>make life better</p>
                </div>
            </div>
            <div className={`${style.right} ${style.side}`}>
                <div>
                    <h1>Welcome</h1>
                    <hr />
                    <div className={style.buttonContainer}>
                        <Link href="/login"><Button name="Login"/></Link>
                        <Link href="/register"><Button name="Register"/></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}