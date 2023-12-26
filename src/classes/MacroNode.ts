import KeyAction from "#types/KeyAction";
import KeyCode from "#types/KeyCode";

class MacroNode {
  parent?: MacroNode;
  children: MacroNode[] = [];
  isLastNode:{state: boolean} = {state: false}
  constructor(parent?: MacroNode) {
    if (parent) this.parent = parent;
  }

  appendChild(child: MacroNode) {
    this.children.push(child);
  }

  removeChild(target: MacroNode) {
    this.children = this.children.filter((el) => el !== target);
  }

  setLastNode(value: boolean) {
    this.isLastNode.state = value
  }
}

class DelayNode extends MacroNode {
  min = 0;
  max = 0;
  constructor(min: number, max: number, parent?: MacroNode) {
    super(parent);
    this.max = max;
    this.min = min;
  }
}

class KeyNode extends MacroNode {
  code: KeyCode;
  action: KeyAction;
  constructor(code: KeyCode, action: KeyAction, parent?: MacroNode) {
    super(parent);
    this.code = code;
    this.action = action;
  }
}

class SubMacroNode extends MacroNode {
  rootNode: MacroNode;
  name: string;
  constructor(name: string, rootNode: MacroNode, parent?: MacroNode) {
    super(parent);
    this.rootNode = rootNode;
    this.name = name;
  }
}

export { DelayNode, KeyNode, MacroNode, SubMacroNode };
