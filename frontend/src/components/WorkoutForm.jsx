import React, { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const WorkoutForm = () => {
    const {dispatch} = useWorkoutsContext()
    const [title, setTitle] = useState("")
    const [load, setLoad] = useState("")
    const [reps, setReps] = useState("")
    const [error, setError] = useState(null)

    const handleSubmit = async (e)=>{
        e.preventDefault()

        const workout = {title,load, reps}

        const response = await fetch('/api/workouts', {
            method:'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok){
           setError(json.error)
        }
        if(response.ok){
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            console.log('new workot added', json)
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
    }
    return (
        <form  className="create" onSubmit={handleSubmit}>
            <h3>Ajouter nouveau Entrainement</h3>
            <label htmlFor="">Titre d'Exerrcice:</label>
            <input type="text" onChange={e => setTitle(e.target.value)} value={title} />
            <label htmlFor="">Kg:</label>
            <input type="number" onChange={e => setLoad(e.target.value)} value={load} />
            <label htmlFor="">Nombre de répétition:</label>
            <input type="number" onChange={e => setReps(e.target.value)} value={reps} />

            <button>Ajouter l'Entrainement</button>
            {error && <div className='error'>{error}</div>}
        </form>
       
    );
}

export default WorkoutForm;
