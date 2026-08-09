import Navbar from './components/Navbar'
import Hero from './components/Hero'
import VipMenu from './components/VipMenu'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <VipMenu />
      </main>
      <Footer />
    </div>
  )
}
