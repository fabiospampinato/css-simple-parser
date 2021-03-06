
/* IMPORT */

import {describe} from 'ava-spec';
import minify from 'css-simple-minifier';
import {default as Parser} from '../dist';
import {INPUT, OUTPUT, AST} from './fixtures';

/* CSS SIMPLE PARSER */

describe ( 'CSS Simple Parser', () => {

  describe ( 'parse', it => {

    it ( 'converts beautified CSS strings into an AST', t => { // `Parser.traverse` is being tested implicitly here

      const ast = Parser.parse ( INPUT );

      Parser.traverse ( ast, node => { // Cleaning up the AST, so that the fixture one is much easier to write
        ['parent', 'index', 'indexEnd', 'selectorIndex', 'selectorIndexEnd', 'bodyIndex', 'bodyIndexEnd'].forEach ( key => {
          delete node[key];
        });
      });

      t.deepEqual ( ast, AST );

    });

    it ( 'supports minified CSS strings too', t => {

      t.is ( minify ( Parser.stringify ( Parser.parse ( OUTPUT ) ) ), OUTPUT );

    });

    it ( 'supports empty CSS blocks', t => {

      t.is ( minify ( Parser.stringify ( Parser.parse ( '.bar{}' ) ) ), '.bar{}' );

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
