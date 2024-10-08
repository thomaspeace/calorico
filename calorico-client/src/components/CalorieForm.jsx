import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router"
import { addCalorieToUser } from "../api";

const CalorieForm = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [dateConsumed, setDateConsumed] = useState('');
    const [caloriesConsumed, setCaloriesConsumed] = useState('');

    const mutation = useMutation({
        mutationFn: addCalorieToUser,
        onSuccess: () => {
            setDateConsumed('');
            setCaloriesConsumed('');
            navigate(`/calories/${id}`);
        },
        onError: (error) => {
            alert(`Error: ${error.message}`);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate({
            userId: parseInt(id),
            dateConsumed,
            caloriesConsumed: parseInt(caloriesConsumed)
        });
    };

    return(
        <form onSubmit={handleSubmit}>
            <input
                type="date"
                value={dateConsumed}
                onChange={(e) => setDateConsumed(e.target.value)}
                required
            />
            <input 
                type="number" 
                value={caloriesConsumed} 
                onChange={(e) => setCaloriesConsumed(e.target.value)} 
                placeholder="Calories"
                required 
            />
            <button type="submit" disabled={mutation.isLoading}>
                Add Calories
            </button>
        </form>
    )

}

export default CalorieForm