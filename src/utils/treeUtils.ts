interface NodeType<T> {
  children: T[];
}

const createTreeArray = <T extends NodeType<T>>(rootNode: T) => {
  const table: (T | null)[][] = [[rootNode]];
  let max = 1;
  const dfs = (node: T, row: number, col: number) => {
    if (table.length < row) table.push(new Array<T>());
    table[row - 1][col - 1] = node;
    if (!node.children.length) return;
    dfs(node.children[0], row, col + 1);
    for (let i = 1; i < node.children.length; i++) {
      const child = node.children[i];
      console.log(max);
      dfs(child, ++max, col + 1);
    }
  };
  dfs(rootNode, 1, 1);
  const maxLength = Math.max(...table.map((el) => el.length));
  for (let i = 0; i < table.length; i++) {
    for (let j = 0; j < maxLength; j++) {
      if (table[i][j]) continue;
      table[i][j] = null;
    }
  }
  return table;
};

export { createTreeArray };
