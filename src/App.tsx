import { Input } from "./App.styles";
import useSerialKeyboard from "#hooks/useKeyboard";
import {
  createContext,
  FocusEventHandler,
  KeyboardEventHandler,
  SyntheticEvent,
  useState,
} from "react";
import KeyCode from "#/types/KeyCode";
import Keyboard from "#components/Keyboard/Keyboard";
import MacroEditor from "#components/MacroEditor/MacroEditor";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Spacing from "./components/Spacing/Spacing";
import MacroMapContextProvider from "./contexts/macroMapContext";

function App() {
  const { requestPort, port, press, release, keyStateMap } = useSerialKeyboard();

  const onKeyboard: KeyboardEventHandler<HTMLInputElement> = async (e) => {
    if (!Object.keys(KeyCode).includes(e.code)) return;
    const code = e.code as KeyCode;
    if (e.type === "keydown") press(code);
    else release(code);
    e.preventDefault();
  };

  const onFocus: FocusEventHandler<HTMLInputElement> = (e) => {
    if (port?.usbProductId) return;
    alert("포트를 선택해주세요");
    e.target.blur();
  };

  const [value, setValue] = useState(0);

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <MacroMapContextProvider>
      <div className="App">
        {/* <div style={{ display: "flex" }}>
          <div>
            <button onClick={requestPort}>포트 선택</button>
            <p>{`productId: ${port?.usbProductId}`}</p>
            <p>{`vendorId: ${port?.usbVendorId}`}</p>
          </div>
          <MacroEditor />
          <Input
            onFocus={onFocus}
            onKeyDown={onKeyboard}
            onKeyUp={onKeyboard}
            value="클릭 후 입력"
          ></Input>
        </div>
        <Keyboard keyStateMap={keyStateMap} /> */}
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="매크로 편집" />
              <Tab label="키 매핑" />
              <Tab label="키보드" />
            </Tabs>
            <Spacing size={10} />
            {[<MacroEditor />, <MacroEditor />, <MacroEditor />][value]}
          </Box>
        </Box>
      </div>
    </MacroMapContextProvider>
  );
}

export default App;
