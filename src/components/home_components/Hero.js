import React from 'react'

export default function Hero() {
  return (
    <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-bold tracking-tight text-gray-700 sm:text-5xl">Level Up Your Shopping Game With Us</h2>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Our passion extends beyond just providing products; it's about enhancing your lifestyle. We believe that every item we offer tells a story and serves a purpose in your life.
        </p>
      </div>
        <div className="mt-20 sm:mt-30 xl:mx-auto xl:max-w-7xl xl:px-8">
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
            alt=""
            className="aspect-[5/2] w-full object-cover xl:rounded-3xl"
          />
        </div>      
    </div>
  )
}
