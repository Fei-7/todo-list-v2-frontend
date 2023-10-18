import TaskItem from "./TaskItem"
import style from "./components.module.css"

export default function TaskList(props) {
    console.log("rendering task list")
    const taskByPriority = [[], [], [], []]
    const priorityName = ["Very high", "High", "Normal", "Low"].map((e) => {return `${e} priority`})
    props.tasks.forEach((task, index) => {
        taskByPriority[task.priority].push(
            <TaskItem 
                key={task._id}
                index={index}
                task={task}
                del={props.del}
            />
        )
    });
    let render = []
    for (let i=0;i<4;i++) {
        if (taskByPriority[i].length === 0) continue
        render = [...render, <h1 key={i}>{priorityName[i]}</h1>, ...taskByPriority[i], <hr key={i+4} />]
    }

    return (
        <div className={style.taskList}>
            {render}
        </div>
    )
}