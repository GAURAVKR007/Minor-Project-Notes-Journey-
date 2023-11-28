import React from 'react'
import TypewriterComponent from 'typewriter-effect'

type Props = {}

const TypeWriterTitle = (props: Props) => {
  return (
    <TypewriterComponent
        options={{
            loop: true,
        }}

        onInit={(typerwriter) => {
            typerwriter.typeString("⚡ SuperCharged Productivity.")
            .pauseFor(1000)
            .deleteAll()
            .typeString("⚡ AI Powered Insights.")
            .start()
        }}
    ></TypewriterComponent>
  )
}

export default TypeWriterTitle