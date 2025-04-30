import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className='text-8xl text-red-600'>Bojler eladó!</h1>
      <button className="btn btn-primary">Button</button>
    </>
  )
}

export default App
