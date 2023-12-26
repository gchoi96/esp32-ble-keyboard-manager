import { useCallback, useState, useMemo } from "react";

const useSerial = ({ baudRate = 115200 }) => {
  const [port, setPort] = useState<Partial<SerialPortInfo>>();
  const [writer, setWriter] = useState<WritableStreamDefaultWriter>();
  const encoder = useMemo(() => new TextEncoder(), []);

  const requestPort = useCallback(async () => {
    const port = await navigator.serial.requestPort();
    setPort(port.getInfo());
    await port.open({ baudRate });
    setWriter(port.writable.getWriter());
  }, [baudRate]);

  const write = useCallback(
    async (data: Uint8Array) => {
      if(!writer) return;
      return writer.write(data);
    },
    [writer]
  );

  return { port, requestPort, write, encoder };
};

export default useSerial;
