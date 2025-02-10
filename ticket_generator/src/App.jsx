import Navbar from './components/Navbar'
import TicketForm from './components/TicketForm'
import './App.css'

function App() {

  return (
      <div className='text-white bg-[#02191D]'>
        <div className='py-4 w-[80%] mx-auto'>
        <Navbar />
        <TicketForm/>
        </div>  
      </div>
  )
}

export default App
