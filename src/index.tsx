import React, { useState, useRef, useLayoutEffect, useEffect } from "react"
import { render } from "react-dom"
import styled from "styled-components"

import stringWidth from "string-width"
const ParentContainer = styled.div`
  width: ${({ width }) => width}px;
  border: 1px solid #ccc;
  padding: 1em;
`

const Button = styled.button`
  /* width: ${({ width }) => width}px; */
  width: 100%;
  /* padding: 0; */
  border-radius: 9999px;
  font-size: ${({ fontSize }) => fontSize};
  background: #76ccf5;
  white-space: nowrap;
`

const AutoSizedButton = ({ text }) => {
  const ref = useRef()
  const [width, setWidth] = useState(0)
  const [fontSize, setFontSize] = useState("auto")
  useEffect(() => {
    const sizePx = (width / stringWidth(text)) * 2
    setFontSize(`${sizePx}px`)
  }, [width, text])
  useLayoutEffect(() => {
    // @ts-ignore
    const r = new ResizeObserver((e) => setWidth(e[0].contentRect.width))
    r.observe(ref.current)
  }, [])
  return (
    <Button ref={ref} fontSize={fontSize}>
      {text}
    </Button>
  )
}

const Input = styled.input`
  font-size: 1.5em;
`
const App = () => {
  // const [buttonText, setButtonText] = useState("loreim ipsum loreim ipsum")
  const [buttonText, setButtonText] = useState("loreim ipsum")
  const [parentSize, setParentSize] = useState(40)
  return (
    <div>
      <ParentContainer width={parentSize * 10}>
        <AutoSizedButton text={buttonText}></AutoSizedButton>
      </ParentContainer>
      <div>
        <div>
          <div>
            <label>
              <Input
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
              ></Input>
            </label>
          </div>
          <div>
            <label>
              <Input
                type="number"
                value={parentSize}
                onChange={(e) => setParentSize(e.target.value)}
              ></Input>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

render(<App />, document.querySelector("#root"))
