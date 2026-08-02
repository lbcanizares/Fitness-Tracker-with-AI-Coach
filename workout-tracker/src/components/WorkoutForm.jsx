import { useState } from 'react'

function WorkoutForm ({ onSave }) {
    const [date, setDate] = useState(new Date().toISOString().split("T")[0])
    const [category, setCategory] = useState('Upper')
    const [exercises, setExercises] = useState([])
    const [exerciseName, setExerciseName] = useState('')
    const [sets, setSets] = useState('')
    const [reps, setReps] = useState('')
    const [weight, setWeight] = useState('')

    function addExercise() {
        if (!exerciseName || !sets || !reps || !weight) return
        setExercises([
            ...exercises,
            { name: exerciseName, sets: Number(sets), reps: Number(reps), weight: Number(weight) }
        ])

        setExerciseName('')
        setSets('')
        setReps('')
        setWeight('')
    }

    function saveWorkout() {
        if (exercises.length === 0) return
        onSave({ date, category, exercises })
        setExercises([])
    }

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="block text-sm font-medium text-gray-400">Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full rounded bg-gray-800 p-2 text-white"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400">Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full rounded bg-gray-800 p-2 text-white"
                    >
                        <option>Upper</option>
                        <option>Lower</option>
                        <option>Push</option>
                        <option>Pull</option>
                        <option>Full Body</option>
                    </select>
                </div>
            </div>
            <div className="space-y-3 rounded-lg bg-gray-800 p-4">
                <input
                    type="text"
                    placeholder="Exercise Name"
                    value={exerciseName}
                    onChange={(e) => setExerciseName(e.target.value)}
                    className="w-full rounded bg-gray-700 p-2 text-white placeholder-gray-500"
                />
                <div className="grid grid-cols-3 gap-3">
                    <input
                        type="number"
                        placeholder="Sets"
                        value={sets}
                        onChange={(e) => setSets(e.target.value)}
                        className="rounded bg-gray-700 p-2 text-white placeholder-gray-500"
                    />
                    <input
                        type="number"
                        placeholder="Reps"
                        value={reps}
                        onChange={(e) => setReps(e.target.value)}
                        className="rounded bg-gray-700 p-2 text-white placeholder-gray-500"
                    />
                    <input
                        type="number"
                        placeholder="Weight"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="rounded bg-gray-700 p-2 text-white placeholder-gray-500"
                    />
                </div>
                <button
                    onClick={addExercise}
                    className="w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700"
                >
                    Add Exercise
                </button>
            </div>
            {exercises.length > 0 && (
                <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-400">
                        Current Workout ({exercises.length} exercises)
                    </h3>
                    {exercises.map((ex, i) => (
                        <div key={i} className="rounded bg-gray-800 p-2 text-sm">
                            {ex.name} - {ex.sets}x{ex.reps} @ {ex.weight}kg
                        </div>
                    ))}
                    <button
                        onClick={saveWorkout}
                        className="w-full rounded bg-green-600 p-3 font-bold hover:bg-green-700"
                    >
                        Save Workout
                    </button>
                </div>
            )}
        </div>
    )
}

export default WorkoutForm;