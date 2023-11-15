import React, { useState } from 'react'
import BotTalk from './components/BotTalk/index'
import IntelligentTalk from './components/IntelligentTalk/index'

type Props = {
  uuid: string | undefined
  type: string | undefined
}

const App = ({ uuid, type }: Props) => {
  const [isShowTalk, setIsShowTalk] = useState(true)

  return (
    <>
      <BotTalk setIsShowTalk={setIsShowTalk} />
      <IntelligentTalk
        uuid={uuid}
        type={type}
        isShowTalk={isShowTalk}
        setIsShowTalk={setIsShowTalk}
      />
    </>
  )
}

export default App
