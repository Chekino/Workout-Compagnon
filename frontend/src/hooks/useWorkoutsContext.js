import { workoutsContext } from "../context/WorkoutContext";
import { useContext } from "react";


export const useWorkoutsContext =()=>{
    const context = useContext(workoutsContext)
    if(!context) {
        throw Error("le fournisseur de contexte dit etre utilsé avec un context Provider")
    }

    return context
}