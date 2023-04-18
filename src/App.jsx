// import React, { useEffect, useState } from 'react'
// import { axiosCheckStatus } from './apis/endpoints'
// import Typewriter from 'typewriter-effect/dist/core'

// function App() {
//   new Typewriter('#typewriter', {
//     strings: ['Hello', 'World'],
//     autoStart: true,
//   })
//   async function CheckStatus() {
//     const res = await axiosCheckStatus()
//     console.log(res)
//     setStatus(res.data.message)
//   }
//   const [status, setStatus] = useState(null)
//   useEffect(() => {
//     CheckStatus()
//   }, [])
//   return <div>{status ? status : 'loading'}</div>
// }

// export default App
import React from 'react'
import Typewriter from 'typewriter-effect'
import HomeNav from './Components/HomeNav';

const App = () => {
  return (
    <>
      <HomeNav />
      <div className='home-bg'>
        <div className=' flex mx-auto flex-col justify-center items-center'>
          <div className=' text-8xl mt-[200px]'>
            {/* <Typewriter
          options={{
            autoStart: true,
            loop: true,
          }}
          onInit={(typewriter) => {
            typewriter.typeString('EVENTHIVE')
              .pauseFor(5000);
          }}
        /> */}
            <Typewriter
              options={{ loop: true, deleteSpeed: 200 }}
              onInit={(typewriter) => {
                typewriter.typeString('<strong>"EVENTHIVE"</strong>')
                  .pauseFor(2500)
                  .typeString('<br className="text-5xl">Events Made <strong>Easy</strong>')
                  .pauseFor(300)
                  .deleteChars(4)
                  .typeString('<strong>Fast</strong>')
                  .pauseFor(300)
                  .deleteChars(4)
                  .typeString('<strong>in One Place</strong>')
                  .callFunction(() => {
                    console.log('All strings were deleted');
                  })
                  .start();
              }} />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
