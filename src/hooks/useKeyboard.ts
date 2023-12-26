import { useState, useCallback } from "react";
import useSerial from "#hooks/useSerial";
import keyMap from "#constants/keyMap";
import KeyCode from "#types/KeyCode";
import KeyStateMap from "#types/KeyStateMap";

const useSerialKeyboard = () => {
  const { port, requestPort, write, encoder } = useSerial({ baudRate: 115200 });
  const [keyStateMap, setKeyStateMap] = useState<KeyStateMap>(
    Object.keys(KeyCode).reduce((acc, cur) => {
      const code = cur as KeyCode;
      acc[code] = false;
      return acc;
    }, {} as KeyStateMap)
  );

  const sendKeyEvent = useCallback(
    async (isPressed: boolean, code: KeyCode) => {
      const data = encoder.encode(keyMap[code] + (isPressed ? "d" : "u"));
      await write(data);
    },
    [encoder, write]
  );

  const press = useCallback(
    async (code: KeyCode) => {
      sendKeyEvent(true, code);
      setKeyStateMap((prev) => ({ ...prev, [code]: true }));
    },
    [sendKeyEvent]
  );

  const release = useCallback(
    async (code: KeyCode) => {
      sendKeyEvent(false, code);
      setKeyStateMap((prev) => ({ ...prev, [code]: false }));
    },
    [sendKeyEvent]
  );

  return { requestPort, port, press, release, keyStateMap };
};

export default useSerialKeyboard;
