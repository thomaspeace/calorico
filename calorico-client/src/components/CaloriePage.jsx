import { useQuery } from "@tanstack/react-query";
import { fetchCaloriesByUserId, fetchWeightsByUserId } from "../api";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const CaloriePage = () => {

    const { id } = useParams();

    const { data: calories, isLoading: loading, isError: error, error: fetchError } = useQuery({
        queryKey: ['calories', id],
        queryFn: () => fetchCaloriesByUserId(id),
      });

    
    if (loading) return <div>Loading...</div>;

    if (error) return <div>Error: {fetchError?.message}</div>;
    
    return (
        <>
            <Link to={`/calories/${id}/add`}>
                <button className="btn btn-wide">Add Calorie Reading</button>
            </Link>
            <div>
                {calories.map((calorie) => (
                    <p key={calorie.id}>{calorie.caloriesConsumed} kcal - {calorie.dateConsumed}</p>
                ))}
            </div>
        </>
    )
}

export default CaloriePage