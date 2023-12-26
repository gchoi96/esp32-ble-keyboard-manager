import { useCallback, useContext, useState } from "react";
import CreateNodeModal from "#/components/MacroEditor/CreateNodeModal/CreateNodeModal";
import { MacroNode } from "#classes/MacroNode";
import Stack from "@mui/material/Stack";
import { MouseEventHandler } from "react";
import MacroTree from "./MacroTree/MacroTree";
import { Container } from "./MacroEditor.style";
import ControlPanel from "./ControlPanel/ControlPanel";
import SaveModal from "./SaveModal/SaveModal";
import { MacroMapContext } from "#contexts/macroMapContext";

type MacroEditorAction =
  | "selectParentNode"
  | "selectRemoveNode"
  | "selectLastNode"
  | "none";

function MacroEditor() {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [saveModalVisible, setSaveModalVisible] = useState(false);

  const [macroNodes, setMacroNodes] = useState<MacroNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<MacroNode | undefined>();
  const [action, setAction] = useState<MacroEditorAction>("none");

  const macroMapContext = useContext(MacroMapContext);

  const onClickAddButton: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      if (!macroNodes.length) {
        setAddModalVisible(true);
        return;
      }
      setAction("selectParentNode");
      e.stopPropagation();
    },
    [macroNodes]
  );

  const onClickRemoveButton: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      if (!macroNodes.length) {
        alert("노드가 없습니다.");
        return;
      }
      setAction("selectRemoveNode");
      e.stopPropagation();
    },
    [macroNodes]
  );

  const onClickLastButton: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      if (!macroNodes.length) {
        alert("노드가 없습니다.");
        return;
      }
      setAction("selectLastNode");
      e.stopPropagation();
    },
    [macroNodes]
  );

  const closeAddModal = useCallback(() => {
    setAddModalVisible(false);
  }, []);

  const closeSaveModal = useCallback(() => {
    setSaveModalVisible(false);
  }, []);

  const removeNode = useCallback(
    (node: MacroNode) => {
      const queue = [node];
      while (queue.length) {
        const curr = queue.shift();
        setMacroNodes((prev) => prev.filter((node) => node !== curr));
        curr?.children.forEach((child) => queue.push(child));
      }
      setMacroNodes((prev) => prev.filter((_node) => _node !== node));
      macroNodes.forEach((el) => el.removeChild(node));
    },
    [macroNodes]
  );

  const onClickSaveButton = useCallback(() => {
    setSaveModalVisible(true);
  }, []);

  const setLastNode = useCallback(
    (node: MacroNode) => {
      macroNodes.forEach((node) => {
        node.setLastNode(false);
      });
      node.setLastNode(true);
    },
    [macroNodes]
  );

  const onClickNode = (node: MacroNode) => {
    switch (action) {
      case "selectParentNode":
        setSelectedNode(node);
        setAddModalVisible(true);
        break;
      case "selectRemoveNode":
        removeNode(node);
        break;
      case "selectLastNode":
        setLastNode(node);
        break;
      default:
        break;
    }
  };

  const appendNode = (newNode: MacroNode) => {
    setMacroNodes((prev) => [...prev, newNode]);
    if (!selectedNode) return;
    selectedNode.appendChild(newNode);
    closeAddModal();
  };

  const saveMacro = (name: string) => {
    const prev = JSON.parse(localStorage.getItem("macro") || "{}");
    localStorage.setItem("macro", JSON.stringify({ ...prev, [name]: macroNodes[0] }));
    macroMapContext?.update({...macroMapContext.value, [name]: macroNodes[0]});
    // setMacroMapState();
    closeSaveModal();
  };

  return (
    <Container action={action} onClick={() => setAction("none")}>
      <Stack direction="row" spacing={3}>
        <ControlPanel
          width="20%"
          onClickAddButton={onClickAddButton}
          onClickSaveButton={onClickSaveButton}
          onClickRemoveButton={onClickRemoveButton}
          onClickLastButton={onClickLastButton}
        />
        <MacroTree width="95%" nodes={macroNodes} onClickNode={onClickNode} />
        <CreateNodeModal
          appendNode={appendNode}
          open={addModalVisible}
          handleClose={closeAddModal}
        />
        <SaveModal
          open={saveModalVisible}
          handleClose={closeSaveModal}
          handleSave={saveMacro}
        />
      </Stack>
    </Container>
  );
}

export default MacroEditor;
