
/* TOKENS */

enum TOKEN_TYPE {
  SELECTOR = 1,
  BODY_START = 2,
  BODY_END = 3
}

type TOKEN_SELECTOR = {
  type: TOKEN_TYPE.SELECTOR,
  index: number,
  indexEnd: number,
  selector: string
};

type TOKEN_BODY_START = {
  type: TOKEN_TYPE.BODY_START,
  index: number
};

type TOKEN_BODY_END = {
  type: TOKEN_TYPE.BODY_END,
  index: number
};

type TOKEN = TOKEN_SELECTOR | TOKEN_BODY_START | TOKEN_BODY_END;

/* AST */

type AST = ROOT_NODE;

type ROOT_NODE = {
  parent: null,
  children: NODE[]
};

type NODE = {
  parent: ROOT_NODE | NODE,
  index: number,
  indexEnd: number,
  selector: string,
  selectorIndex: number,
  selectorIndexEnd: number,
  body: string,
  bodyIndex: number,
  bodyIndexEnd: number,
  children: NODE[]
};

/* EXPORT */

export {TOKEN_TYPE, TOKEN_SELECTOR, TOKEN_BODY_START, TOKEN_BODY_END, TOKEN, AST, ROOT_NODE, NODE};
