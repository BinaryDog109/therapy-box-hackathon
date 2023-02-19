import { useContext } from "react"
import { TasksContext } from "../context/TasksContext"
export const useTasksContext=()=>{
    const context=useContext(TasksContext)
    if(!context){
        throw new Error('You must be inside TasksContextProvider')
    }
    return context
}