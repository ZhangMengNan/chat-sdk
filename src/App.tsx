import React, { useState } from 'react';
import BotTalk from './components/BotTalk/index';
import IntelligentTalk from './components/IntelligentTalk/index';

type Props = {
  uuid: string | undefined;
};

const App = ({ uuid }: Props) => {
  const [isShowTalk, setIsShowTalk] = useState(false)
  return (
    <>
      <BotTalk setIsShowTalk={setIsShowTalk} />
      <IntelligentTalk uuid={uuid} isShowTalk={isShowTalk} setIsShowTalk={setIsShowTalk} />
    </>
  );
};

export default App;
