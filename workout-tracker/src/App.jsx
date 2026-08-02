import { useState, useEffect } from 'react'
import WorkoutForm from './components/WorkoutForm'
import WorkoutHistory from './components/WorkoutHistory'
import ProgressChart from './components/ProgressChart'
import AICoach from './components/AICoach'

function App() {
  const [workouts, setWorkouts] = useState([])
  const [activeTab, setActiveTab] = useState('log')

  useEffect(() => {
    const saved = localStorage.getItem('workouts')
    if (saved) {
      setWorkouts(JSON.parse(saved))
    }
  }, [])

  function saveWorkouts(updated) {
    setWorkouts(updated)
    localStorage.setItem('workouts', JSON.stringify(updated))
  }

  function addWorkout(workout) {
    const updated = [...workouts, workout]
    saveWorkouts(updated)
  }

  function deleteWorkout(index) {
    const updated = workouts.filter((_, i) => i !== index)
    saveWorkouts(updated)
  }

  const tabs = [
    { id: 'log', label: 'Log' },
    { id: 'history', label: 'History' },
    { id: 'progress', label: 'Progress' },
    { id: 'coach', label: 'AI Coach' },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-4 text-center">
        <h1 className="text-2xl font-bold">Workout Tracker</h1>
      </header>

      <nav className="flex border-b border-gray-700 bg-gray-800">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 p-3 text-sm font-medium ${
              activeTab === tab.id
                ? 'border-b-2 border-blue-500 text-blue-400'
                : 'text-gray-400'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="mx-auto max-w-2xl p-4">
        {activeTab === 'log' && <WorkoutForm onSave={addWorkout} />}
        {activeTab === 'history' && (
          <WorkoutHistory workouts={workouts} onDelete={deleteWorkout} />
        )}
        {activeTab === 'progress' && <ProgressChart workouts={workouts} />}
        {activeTab === 'coach' && <AICoach workouts={workouts} />}
      </main>
    </div>
  )
}

export default App