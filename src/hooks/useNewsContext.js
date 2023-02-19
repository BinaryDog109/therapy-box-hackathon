import { useContext } from "react"
import { NewsContext } from "../context/NewsContext"

export const useNewsContext=()=>{
    const context=useContext(NewsContext)
    if(!context){
        throw new Error('You must be inside NewsContextProvider')
    }
    return context
}