
/* IMPORT */

import parse from './parse';
import stringify from './stringify';
import traverse from './traverse';
import type {AST, ROOT_NODE, NODE} from './types';

/* MAIN */

const Parser = { parse, stringify, traverse };

/* EXPORT */

export default Parser;
export type {AST, ROOT_NODE, NODE};
