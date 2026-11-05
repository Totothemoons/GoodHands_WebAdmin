import { HealthCheck } from '@/features/health/HealthCheck'

export default function App() {
  return (
    <main className="app-shell">
      <section className="card">
        <p className="eyebrow">GOODHANDS</p>
        <h1>Admin dashboard</h1>
        <p>React</p>
        <HealthCheck />
      </section>
    </main>
  )
}
