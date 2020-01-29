
/* IMPORT */

import tokenizer from './tokenizer';
import {TOKEN_TYPE, ROOT_NODE, NODE, AST} from './types';

const {SELECTOR, BODY_START, BODY_END} = TOKEN_TYPE;

/* GET NODE BODY */

function getNodeBody ( node: NODE, css: string ): string { // Extracting the textual body of a node, excluding children nodes

  const {children} = node;

  let body = '',
      start = node.bodyIndex;

  for ( let i = 0, l = children.length; i < l; i++ ) {

    const child = children[i];

    body += css.slice ( start, child.index );

    start = child.indexEnd + 1;

  }

  body += css.slice ( start, node.bodyIndexEnd );

  return body;

}

/* PARSE */

function parse ( css: string ): AST {

  const tokens = tokenizer ( css ),
        AST: ROOT_NODE = { parent: null, children: [] };

  let parent: ROOT_NODE | NODE = AST,
      index = 0;

  while ( true ) {

    if ( !parent ) throw new Error ( 'Parent node not found' );

    const token = tokens[index];

    if ( !token ) break;

    if ( token.type === SELECTOR ) {

      const tokenBodyStart = tokens[index + 1];

      if ( !tokenBodyStart || tokenBodyStart.type !== BODY_START ) throw new Error ( 'Found "selector" token without expected subsequent "body_start" token' );

      const node: NODE = {
        parent,
        index: token.index,
        indexEnd: -1,
        selector: token.selector,
        selectorIndex: token.index,
        selectorIndexEnd: token.indexEnd,
        body: '',
        bodyIndex: tokenBodyStart.index,
        bodyIndexEnd: -1,
        children: []
      };

      parent.children.push ( node );

      parent = node;
      index += 2;

    } else if ( token.type === BODY_END ) {

      const node = parent as unknown as NODE; //TSC

      node.indexEnd = token.index + 2;
      node.bodyIndexEnd = token.index + 1;
      node.body = getNodeBody ( node, css );

      parent = node.parent;
      index += 1;

    } else {

      throw new Error ( `Unexpected token of type: "${token.type}"` );

    }

  }

  return AST;

}

/* EXPORT */

export default parse;
