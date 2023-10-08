import React, { useEffect, useState, useRef } from 'react'
import Draggable from 'react-draggable'

import './assets/index.scss'
import { setRem } from 'src/utils/rem'

type Props = {
  setIsShowTalk: (flag: boolean) => any
}

const BotTalk = ({ setIsShowTalk }: Props) => {
  const chatRef = useRef<any>()
  const [hasDrag, setHasDrag] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    console.log('root', document.getElementById('myRoot'))
    // console.log(botRef.current.style.height = document.documentElement.clientHeight + 'px');
    handleWidthChange()
    bindMouseEvent()
    // setRem()
    // 改变窗口大小时重新设置 rem
    window.onresize = function () {
      handleWidthChange()
      // setRem()
    }
  }, [])

  const handleWidthChange = () => {
    let width =
      document.documentElement.clientWidth || document.body.clientWidth

    setIsMobile(width <= 750)
  }

  const bindMouseEvent = () => {
    const marker = chatRef.current
    if (marker) {
      let x1: number, x2, y1: number, y2
      marker.addEventListener('mousedown', function (e: any) {
        x1 = e.clientX
        y1 = e.clientY
      }) //mousedown记录鼠标位置1
      marker.addEventListener('mouseup', function (e: any) {
        x2 = e.clientX
        y2 = e.clientY
        var _val = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1))
        //判断
        if (_val >= 0 && _val <= 2) {
          setHasDrag(true)
        } else {
          setHasDrag(false)
        }
      })
    }
  }

  const handleChat = () => {
    console.log('点击状态~', hasDrag)
    if (hasDrag) {
      // 打开IntelligentTalk
      const uniqueMask = document.getElementById('unique-mask')
      if (uniqueMask) {
        setIsShowTalk(true)
        ;(document.getElementById('unique-mask') as any).style.display = 'flex'
      }
    }
  }

  const handleMobileChat = () => {
    const uniqueMask = document.getElementById('unique-mask')

    if (uniqueMask) {
      setIsShowTalk(true)
      ;(document.getElementById('unique-mask') as any).style.display = 'flex'
    }
  }

  return (
    <div className="bot-father">
      <Draggable
        defaultPosition={{ x: 0, y: 0 }}
        onStop={isMobile ? () => handleMobileChat() : () => {}}
      >
        <div className="bot" ref={chatRef} onClick={handleChat}>
          <div className="bot-container">
            <div className="bot-img"></div>
            <div className="bot-desc">智能对话</div>
          </div>
          <div className="bot-shadow"></div>
        </div>
      </Draggable>
    </div>
  )
}

export default BotTalk
