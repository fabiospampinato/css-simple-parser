
/* IMPORT */

import {describe} from 'ava-spec';
import minify from 'css-simple-minifier';
import {default as Parser} from '../dist';
import {INPUT, OUTPUT, AST} from './fixtures';

/* CSS SIMPLE PARSER */

describe ( 'CSS Simple Parser', () => {

  describe ( 'parse', it => {

    it ( 'converts a CSS string into an AST', t => { // `Parser.traverse` is being tested implicitly here

      const ast = Parser.parse ( INPUT );

      Parser.traverse ( ast, node => { // Cleaning up the AST, so that the fixture one is much easier to write
        ['parent', 'index', 'indexEnd', 'selectorIndex', 'selectorIndexEnd', 'bodyIndex', 'bodyIndexEnd'].forEach ( key => {
          delete node[key];
        });
      });

      t.deepEqual ( ast, AST );

    });

  });

  describe ( 'stringify', it => {

    it ( 'converts an AST into a CSS string', t => {

      const ast = Parser.parse ( INPUT ),
            css = Parser.stringify ( ast );

      t.is ( minify ( css ), OUTPUT );

    });

  });

});
