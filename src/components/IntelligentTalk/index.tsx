import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
// import { message } from 'antd';

import './assets/index.scss';
import { reqGetPreparationChatData } from 'src/api';
import { getCurrentDateTime } from 'src/utils';

type Props = {
  uuid: string | undefined;
  isShowTalk: boolean;
  setIsShowTalk: (flag: boolean) => any;
};

enum TalkPeople {
  robat = 1,
  questioner,
}
export interface ChatMessage {
  status: ChatMsgStatus;
  msg_tpl: MetaMtMsgTpl;
  msg?: string;
  info?: any;
}

interface TalkData {
  type: TalkPeople;
  msg: string;
  time: string;
}

export enum ChatMsgStatus {
  /** 完整的消息 */
  Complete = 'complete',
  /**  流式消息开始 */
  StreamBegin = 'stream_begin',
  /** 流式消息 */
  Stream = 'stream',
  /** 流式消息结束 */
  StreamEnd = 'stream_end',
  /** 错误消息 */
  Error = 'error',
  /** 敏感信息，回滚 */
  Rollback = 'rollback',
}

export enum MetaMtMsgTpl {
  Text = 1,
  BotReply = 2,
  MaxNum = 100022, // 达到最大对话次数限制
}

const talkData: TalkData[] = [];

type MsgObj = typeof talkData extends (infer T)[] ? T : never;

const IntelligentTalk = ({ uuid, isShowTalk, setIsShowTalk }: Props) => {
  let tempString = '',
    tempMsgList = talkData;
  const iframeBoxRef = useRef<any>();
  const [msgQueue, setMsgQueue] = useState<MsgObj[]>(talkData);
  const [inputValue, setInputValue] = useState('');
  // 是否正在回答
  const [isAnswering, setIsAnswering] = useState(false);
  // 暂存的socket实例
  const [socket, setSocket] = useState<WebSocket>();

  useEffect(() => {
    iframeBoxRef.current?.scrollTo({
      top: 100000,
      behavior: 'smooth',
    });
  }, [msgQueue]);

  useEffect(() => {
    console.log(isShowTalk);
    if(isShowTalk) {
      console.log('----进来了~',isShowTalk);
      
      getPreparationData();
    } else {
      socket?.close();
    }
    return () => {
      socket?.close();
    };
  }, [isShowTalk]); //依赖serverUrl进行重渲染

  const connectSocket = (serverUrl: string) => {
    const newSocket = new WebSocket(serverUrl);

    newSocket.onopen = () => {
      console.log('ws连接成功');
      // todo: 连接成功后需要一开始获取智能体的招呼语
      // sendMessage();
    };

    newSocket.onmessage = e => {
      console.log('Received message: ', e.data, msgQueue);
      const msgObj = JSON.parse(e.data);
      processData(msgObj);
      // setMessage(event.data);
    };

    newSocket.onerror = error => {
      console.error('WebSocket error: ', error);
    };

    newSocket.onclose = () => {
      console.log('WebSocket closed');
    };
    setSocket(newSocket);
  };

  const getPreparationData = async () => {
    if (uuid) {
      const res = await reqGetPreparationChatData(uuid);
      console.log(uuid, res);
      if(res?.code === 0) {
        connectSocket(
          `ws://36.103.177.208:9020/v1/ws/open/chat/${res.data.chat_uuid}?Authorization=${res.data.token}`,
        );
      } else {

      }
    }
  };

  // 用于转换对话消息的函数
  const transformMsg = (msg: string): ChatMessage => {
    return {
      status: ChatMsgStatus.Complete,
      msg_tpl: MetaMtMsgTpl.Text,
      msg: msg,
    };
  };

  const handleClose = () => {
    const uniqueMask = document.getElementById('unique-mask');
    if (uniqueMask) {
      setIsShowTalk(false);
      (document.getElementById('unique-mask') as any).style.display = 'none';
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
  };

  const handleSubmit = () => {
    if (!inputValue) return;
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      // message.warning('WebSocket连接失败，请稍后再试');
      alert('WebSocket连接失败，请稍后再试');
      return;
    }
    const msg = {
      type: TalkPeople.questioner,
      msg: inputValue,
      time: getCurrentDateTime(),
    };
    console.log([...msgQueue, msg]);
    tempMsgList.push(msg);
    setMsgQueue(tempMsgList);
    socket.send(JSON.stringify(transformMsg(inputValue)));
    // 开始回答
    // setIsAnswering(true);
    // 清除inputValue值
    setInputValue('');
  };

  const initMsgObj = (msg: string = '') => ({
    type: TalkPeople.robat,
    msg: msg,
    time: getCurrentDateTime(),
  });

  // 处理智能体发送的消息的函数
  const processData = (msgObj: ChatMessage) => {
    const msgParams = {
      type: TalkPeople.robat,
      msg: tempString,
      time: getCurrentDateTime(),
    };
    if (msgObj.status === ChatMsgStatus.StreamBegin) {
      tempString = msgObj?.msg || '';
      tempMsgList.push(initMsgObj());
      setIsAnswering(true);
      setMsgQueue(tempMsgList);
    }
    if (msgObj.status === ChatMsgStatus.Stream) {
      tempString += msgObj.msg;
      msgParams.msg += msgObj.msg || '';
      tempMsgList.splice(tempMsgList.length - 1, 1, msgParams);
      const temp = [...tempMsgList];
      temp.pop();
      temp.push(msgParams);
      setMsgQueue(temp);
    }
    if (msgObj.status === ChatMsgStatus.StreamEnd) {
      setIsAnswering(false);
    }
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
          <section className='talk-box' ref={iframeBoxRef}>
            {msgQueue.map((item, index) => RenderMsg(item, index))}
          </section>
          <footer className='talk-input'>
            <input
              type='text'
              placeholder='请输入你的问题'
              value={inputValue}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleSubmit();
                }
              }}
              onChange={handleInputChange}
            />
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
