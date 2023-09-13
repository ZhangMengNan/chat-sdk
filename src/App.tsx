import React from 'react'
import BotTalk from './components/BotTalk/index'
import IntelligentTalk from './components/IntelligentTalk/index'


type Props = {}

const App = (props: Props) => {
  return (
    <>
      <BotTalk />
      <IntelligentTalk />
    </>
  )
}

export default App