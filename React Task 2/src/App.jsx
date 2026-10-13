import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Intern from "./InternCard"


const interns = [
  { id: 1, name: "Anu", role: "React Intern", team: "Platform team" },
  { id: 2, name: "Ravi", role: "UI Intern", team: "Learning team" },
  { id: 3, name: "Maya", role: "Frontend Intern", team: "Web team" },
];



function App() {
  return (
    <main className="page">
      <h1>Meet the Interns</h1>
      <p className="subtitle">Our new frontend team</p>

      <section className="grid">
        {interns.map((intern) => (
          <Intern
            key={intern.id}
            name={intern.name}
            role={intern.role}
            team={intern.team}
          />
        ))}
      </section>
    </main>
  );
}

export default App;