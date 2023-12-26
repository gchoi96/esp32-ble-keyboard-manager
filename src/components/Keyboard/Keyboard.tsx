import KeyCode from "#types/KeyCode";
import KeyStateMap from "#types/KeyStateMap";
import { KeyS, KeyM, KeyL, KeyXL, KeyXXL, Row } from "#components/Keyboard/Keyboard.styles";

const functionKeys = [
  KeyCode.F1,
  KeyCode.F2,
  KeyCode.F3,
  KeyCode.F4,
  KeyCode.F5,
  KeyCode.F6,
  KeyCode.F7,
  KeyCode.F8,
  KeyCode.F9,
  KeyCode.F10,
];

const digitKeys = [
  KeyCode.Digit1,
  KeyCode.Digit2,
  KeyCode.Digit3,
  KeyCode.Digit4,
  KeyCode.Digit5,
  KeyCode.Digit6,
  KeyCode.Digit7,
  KeyCode.Digit8,
  KeyCode.Digit9,
  KeyCode.Digit0,
];

const qLineKeys = [
  KeyCode.KeyQ,
  KeyCode.KeyW, 
  KeyCode.KeyE, 
  KeyCode.KeyR, 
  KeyCode.KeyT, 
  KeyCode.KeyY, 
  KeyCode.KeyU, 
  KeyCode.KeyI, 
  KeyCode.KeyO, 
  KeyCode.KeyP
];

const aLineKeys = [
  KeyCode.KeyA,
  KeyCode.KeyS,
  KeyCode.KeyD,
  KeyCode.KeyF,
  KeyCode.KeyG,
  KeyCode.KeyH,
  KeyCode.KeyJ,
  KeyCode.KeyK,
  KeyCode.KeyL
]

const zLineKeys = [
  KeyCode.KeyZ,
  KeyCode.KeyX,
  KeyCode.KeyC,
  KeyCode.KeyV,
  KeyCode.KeyB,
  KeyCode.KeyN,
  KeyCode.KeyM
]

interface KeyboardProps {
  keyStateMap: KeyStateMap;
}
function Keyboard({ keyStateMap }: KeyboardProps) {
  return (
    <div>
      <div>
        <Row>
          <KeyS isPressed={keyStateMap.Escape}>ESC</KeyS>
          {functionKeys.map((el) => (
            <KeyS isPressed={keyStateMap[el]} key={el}>
              {el}
            </KeyS>
          ))}
          <KeyS />
          <KeyS />
          <KeyS />
          <KeyS />
          <KeyS />
        </Row>
        <Row>
          <KeyS isPressed={keyStateMap.Backquote}>{"`~"}</KeyS>
          {digitKeys.map((el) => (
            <KeyS isPressed={keyStateMap[el]} key={el}>
              {el[el.length - 1]}
            </KeyS>
          ))}
          <KeyS isPressed={keyStateMap.Minus}>-_</KeyS>
          <KeyS isPressed={keyStateMap.Equal}>=+</KeyS>
          <KeyL isPressed={keyStateMap.Backspace}>backspace</KeyL>
          <KeyS isPressed={keyStateMap.Delete}>Del</KeyS>
          <KeyS isPressed={keyStateMap.Insert}>Ins</KeyS>
        </Row>
        <Row>
          <KeyM isPressed={keyStateMap.Tab}>Tab</KeyM>
          {qLineKeys.map((el) => (
            <KeyS isPressed={keyStateMap[el]} key={el}>
              {el[el.length - 1]}
            </KeyS>
          ))}
          <KeyS isPressed={keyStateMap.BracketLeft}>[</KeyS>
          <KeyS isPressed={keyStateMap.BracketRight}>]</KeyS>
          <KeyM isPressed={keyStateMap.Backslash}>\</KeyM>
          <KeyS isPressed={keyStateMap.Home}>Hm</KeyS>
          <KeyS isPressed={keyStateMap.End}>End</KeyS>
        </Row>
        <Row>
          <KeyL isPressed={keyStateMap.CapsLock}>Caps Lock</KeyL>
          {aLineKeys.map((el) => (
            <KeyS isPressed={keyStateMap[el]} key={el}>
              {el[el.length - 1]}
            </KeyS>
          ))}
          <KeyS isPressed={keyStateMap.Semicolon}>;</KeyS>
          <KeyS isPressed={keyStateMap.Quote}>'</KeyS>
          <KeyL isPressed={keyStateMap.Enter}>ENTER</KeyL>
          <KeyS isPressed={keyStateMap.PageUp}>PgUp</KeyS>
        </Row>
        <Row>
          <KeyXL isPressed={keyStateMap.ShiftLeft}>Shift</KeyXL>
          {zLineKeys.map((el) => (
            <KeyS isPressed={keyStateMap[el]} key={el}>
              {el[el.length - 1]}
            </KeyS>
          ))}
          <KeyS isPressed={keyStateMap.Comma}>,</KeyS>
          <KeyS isPressed={keyStateMap.Period}>.</KeyS>
          <KeyS isPressed={keyStateMap.Slash}>/</KeyS>
          <KeyM isPressed={keyStateMap.ShiftRight}>Shift</KeyM>
          <KeyS isPressed={keyStateMap.ArrowUp}>↑</KeyS>
          <KeyS isPressed={keyStateMap.PageDown}>PgDn</KeyS>
        </Row>
        <Row>
          <KeyS isPressed={keyStateMap.ControlLeft}>Ctrl</KeyS>
          <KeyS isPressed={keyStateMap.MetaLeft}>Win</KeyS>
          <KeyS isPressed={keyStateMap.AltLeft}>Alt</KeyS>
          <KeyXXL isPressed={keyStateMap.Space}>Space</KeyXXL>
          <KeyS isPressed={keyStateMap.MetaRight}>한/영</KeyS>
          <KeyS />
          <KeyS isPressed={keyStateMap.ArrowLeft}>←</KeyS>
          <KeyS isPressed={keyStateMap.ArrowDown}>↓</KeyS>
          <KeyS isPressed={keyStateMap.ArrowRight}>→</KeyS>
        </Row>
      </div>
    </div>
  );
}

export default Keyboard;
