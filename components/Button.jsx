import style from "./components.module.css"

export default function Button(props) {
    // console.log(props.className)
    // console.log(style[props.className])
    return (
        <button
            type={props.type}
            onClick={props.onClick}
            className={style.button}
        >{props.name}</button>
    )
}