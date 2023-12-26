import { MacroNode } from "#/classes/MacroNode";
import React, { createContext, useState } from "react";
type MacroMapType = { [key: string]: MacroNode };
type MacroMapContextProps = {
  value: MacroMapType;
  update: (newMap: MacroMapType) => void;
};

export const MacroMapContext = createContext<MacroMapContextProps | undefined>(undefined);

export default function MacroMapContextProvider({ children }: React.PropsWithChildren) {
  const [value, setValue] = useState<MacroMapType>(
    JSON.parse(localStorage.getItem("macro") || "{}")
  );
  const update = (newMap: MacroMapType) => {
    setValue(newMap);
  };
  return (
    <MacroMapContext.Provider value={{ value, update }}>
      {children}
    </MacroMapContext.Provider>
  );
}
