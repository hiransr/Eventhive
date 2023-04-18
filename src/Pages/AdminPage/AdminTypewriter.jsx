import React from 'react'
import Typewriter from 'typewriter-effect'


const AdminTypewriter = () => {
    return (
        <div><div className='flex mx-auto flex-col justify-center items-center mt-[100px] text-6xl'>
            <Typewriter
                options={{ loop: true, deleteSpeed: 200 }}
                onInit={(typewriter) => {
                    typewriter.typeString('Welcome <strong>"ADMIN"</strong>,')
                        .pauseFor(2500)
                        .typeString('<br style="fontSize:20px"> Events Made <strong>Easy</strong>')
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
        </div></div>
    )
}

export default AdminTypewriter