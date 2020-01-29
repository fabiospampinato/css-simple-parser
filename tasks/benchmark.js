
/* IMPORT */

const {default: Parser} = require ( '../dist' ),
      {default: tokenizer} = require ( '../dist/tokenizer' ),
      {INPUT} = require ( '../test/fixtures' ),
      benchmark = require ( 'benchloop' );

/* BENCHMARK */

benchmark.defaultOptions = Object.assign ( benchmark.defaultOptions, {
  iterations: 10000,
  log: 'compact'
});

const AST = Parser.parse ( INPUT );

benchmark ({
  name: 'tokenizer',
  fn: () => {
    tokenizer ( INPUT );
  }
});

benchmark ({
  name: 'parse',
  fn: () => {
    Parser.parse ( INPUT );
  }
});

benchmark ({
  name: 'stringify',
  fn: () => {
    Parser.stringify ( AST );
  }
});

benchmark ({
  name: 'traverse',
  fn: () => {
    Parser.traverse ( AST, () => {} );
  }
});

benchmark.summary ();
