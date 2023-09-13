import React, { useState } from 'react';
import Draggable from 'react-draggable';

import './assets/index.scss';

type Props = {};

enum TalkPeople {
  robat = 1,
  questioner,
}

const talkData = [
  {
    type: TalkPeople.robat,
    msg: '您好！我是深圳言图科技的AI小秘书，很高兴为您服务！如有问题欢迎提问，我们很乐意为您解决问题～',
    time: '17:20:33',
  },
  {
    type: TalkPeople.questioner,
    msg: '介绍下你们公司',
    time: '17:20:38',
  },
];

type MsgObj = typeof talkData extends (infer T)[] ? T : never;

const IntelligentTalk = (props: Props) => {
  const [msgQueue, setMsgQueue] = useState<MsgObj[]>(talkData);
  const [inputValue, setInputValue] = useState('');
  // 是否正在回答
  const [isAnswering, setIsAnswering] = useState(false);

  const handleClose = () => {
    const uniqueMask = document.getElementById('unique-mask');
    if (uniqueMask) {
      (document.getElementById('unique-mask') as any).style.display = 'none';
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
  };

  const handleSubmit = () => {
    if (!inputValue) return;
    const msg = {
      type: TalkPeople.questioner,
      msg: inputValue,
      time: '17:20:38',
    };
    console.log([...msgQueue, msg]);
    setMsgQueue([...msgQueue, msg]);
    // 清除inputValue值
    setInputValue('');
  };

  const RenderMsg = (item: MsgObj, index: number) => {
    if (item.type === TalkPeople.robat) {
      return (
        <div className='talk-robat' key={index}>
          <div className='robat-avatar'></div>
          <div className='robat-msg'>
            <div className='robat-name'>AI小秘书</div>
            <div className='robat-answer'>{item.msg}</div>
          </div>
          <div className='robat-time'>{item.time}</div>
        </div>
      );
    } else {
      return (
        <div className='talk-questioner' key={index}>
          <div className='questioner-time'>{item.time}</div>
          <div className='questioner-msg'>{item.msg}</div>
          <div className='questioner-avatar'></div>
        </div>
      );
    }
  };

  return (
    <div className='bot-mask' id='unique-mask' onClick={handleClose}>
      <Draggable bounds='.bot-mask' handle='.talk-header'>
        <div className='intelligent-talk' onClick={e => e.stopPropagation()}>
          <header className='talk-header'>
            <div className='talk-title'>智能对话</div>
            <div className='talk-close' onClick={handleClose}></div>
          </header>
          <section className='talk-box'>{msgQueue.map((item, index) => RenderMsg(item, index))}</section>
          <footer className='talk-input'>
            <input type='text' placeholder='请输入你的问题' value={inputValue} onChange={handleInputChange} />
            <button onClick={handleSubmit} className={`submit-btn ${isAnswering && 'disabled'}`}>
              发送
            </button>
          </footer>
        </div>
      </Draggable>
    </div>
  );
};

export default IntelligentTalk;
