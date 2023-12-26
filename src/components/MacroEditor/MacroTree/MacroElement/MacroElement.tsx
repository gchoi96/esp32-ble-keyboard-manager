import { MacroNode, DelayNode, KeyNode, SubMacroNode } from "#classes/MacroNode";
import Chip from "@mui/material/Chip";
import { Fragment, memo } from "react";
interface Props {
  node: MacroNode;
  onClick: (node: MacroNode) => void;
}

function MacroElement({ node, ...props }: Props) {
  const onClick = () => props.onClick(node);
  return (
    <Fragment>
      {node instanceof DelayNode && (
        <Chip
          color={node.isLastNode.state ? "error" :"primary"}
          sx={{ width: 100 }}
          label={`${node.min}-${node.max}`}
          variant="outlined"
          onClick={onClick}
        />
      )}
      {node instanceof KeyNode && (
        <Chip
          color={node.isLastNode.state ? "error" :"primary"}
          sx={{ width: 100 }}
          label={`${node.action}-${node.code}`}
          onClick={onClick}
        />
      )}{
        node instanceof SubMacroNode && (
          <Chip
            color={node.isLastNode.state ? "error" :"primary"}
            sx={{ width: 100 }}
            label={`${node.name}`}
            onClick={onClick}
          />
        ) 
      }
    </Fragment>
  );
}

function DummyNode() {
  return <div style={{ width: "100px" }} />;
}

export { DummyNode };

export default memo(MacroElement);
