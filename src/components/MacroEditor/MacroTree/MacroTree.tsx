import EdgeBorder from "#types/EdgeBorder";
import { MacroNode } from "#classes/MacroNode";
import { createTreeArray } from "#utils/treeUtils";
import Stack from "@mui/material/Stack";
import { Fragment } from "react";
import Edge from "./Edge/Edge";
import MacroElement, { DummyNode } from "./MacroElement/MacroElement";
import { useCallback } from "react";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  nodes: MacroNode[];
  onClickNode: (node: MacroNode) => void;
  width?: number | string;
}

type GetEdgeProps = (
  tree: (MacroNode | null)[][],
  rIdx: number,
  cIdx: number
) => EdgeBorder;

function MacroTree({ nodes, onClickNode, width, ...props }: Props) {
  const getDummyEdgeBorder: GetEdgeProps = useCallback((tree, rIdx, cIdx) => {
    let [hasBottomNode, hasTopNode] = [false, false];
    for (let i = rIdx + 1; i < tree.length; i++) {
      if (!tree[i][cIdx]) continue;
      if (cIdx < 1 || tree[i][cIdx - 1]) break;
      hasBottomNode = true;
      break;
    }
    for (let i = 0; i < rIdx; i++) {
      if (!tree[i][cIdx]) continue;
      hasTopNode = true;
      break;
    }
    const draw = hasBottomNode && hasTopNode;
    return { top: draw, bottom: draw, right: false };
  }, []);

  const getNodeEdgeBorder: GetEdgeProps = useCallback((tree, rIdx, cIdx) => {
    const right = true;
    const left = !!tree[rIdx][cIdx - 1];
    const top = !left;
    let bottom = false;
    for (let i = rIdx + 1; i < tree.length; i++) {
      if (!tree[i][cIdx]) continue;
      if (cIdx < 1 || tree[i][cIdx - 1]) break;
      bottom = true;
      break;
    }
    return { left, top, bottom, right };
  }, []);

  return (
    <Stack spacing={0} width={width} maxWidth={width} overflow="auto" {...props}>
      {nodes.length > 0 &&
        createTreeArray(nodes[0]).map((row, rIdx, tree) => (
          <Stack direction="row" alignItems="center">
            {row.map((node, cIdx) => (
              <Fragment>
                {cIdx > 0 && (
                  <Edge
                    border={(tree[rIdx][cIdx] ? getNodeEdgeBorder : getDummyEdgeBorder)(
                      tree,
                      rIdx,
                      cIdx
                    )}
                  />
                )}
                {node ? (
                  <MacroElement node={node} onClick={onClickNode} />
                ) : (
                  <DummyNode />
                )}
              </Fragment>
            ))}
          </Stack>
        ))}
    </Stack>
  );
}

export default MacroTree;
