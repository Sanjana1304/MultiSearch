import React from 'react'
import Header from './Header'

const About = () => {
return (
    <div>
            <Header/>
            <div className='shadow p-4 w-[60%] mx-auto mt-10 text-xl text-green-800'>
            <h1 className='text-3xl mb-5'>About Us</h1>
            <p>This is a simple web application that fetches data from various APIs and displays them in a single page.</p>
            <p>Our goal is to provide users with a seamless experience by aggregating information from multiple sources into one cohesive interface.</p>
            <p>We use modern web technologies such as React for the frontend and Node.js for the backend to ensure a fast and responsive user experience.</p>
            <p>Thank you for using our application. We hope you find it useful and informative.</p>
            </div>
    </div>
)
}

export default About