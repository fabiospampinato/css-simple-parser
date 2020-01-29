
/* IMPORT */

import {NODE, AST} from './types';

/* STRINGIFY NODE */

function stringifyNode ( node: NODE ): string {

  return `${node.selector}{${node.body}${stringifyChildren ( node.children )}}`;

}

/* STRINGIFY CHILDREN */

function stringifyChildren ( children: NODE[] ): string {

  let css = '';

  for ( let i = 0, l = children.length; i < l; i++ ) {

    css += stringifyNode ( children[i] );

  }

  return css;

}

/* STRINGIFY */

function stringify ( ast: AST ): string {

  return stringifyChildren ( ast.children );

}

/* EXPORT */

export default stringify;
