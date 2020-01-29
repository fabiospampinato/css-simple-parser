# CSS Simple Parser

A (S)CSS parser that's tiny, blazing fast and (too) simple.

## Features

- **Tiny**: at ~1.5kb (min + gzip) this is about as small a CSS parser as you can get.
- **Blazing fast**: on a mid-2014 MBP it takes ~0.03ms, on average when benchmarking, to generate an AST for [this](https://github.com/fabiospampinato/css-simple-parser/blob/master/test/fixtures.js) ~500 lines CSS string, about 100x faster than PostCSS.
- **Nesting**: nested (S)CSS rules are supported.

## Caveats

The _big_ caveat is that this is not a full-blown CSS parser, it can only parse simple CSS strings with the limitations listed below, and it only provides an AST that gives you very little information, but if these limitations aren't a big deal for your use case then you found a tiny and blazing fast parser.

- Rule blocks' starting `{` characters must be placed at the end of their lines.
- Rule blocks' closing `}` characters must be placed in their own lines.
- Significant `;`, `{` and `}` characters must not have any extra whitespace characters after them.
- Newlines must be used consistently.
- Adjacent rule blocks can't share any lines.

Basically this parser only supports simple and ~beautified CSS.

## Install

```sh
npm install --save css-simple-parser
```

## Usage

### AST

The AST (Abstract Syntax Tree) provided by this library has the following shape:

```ts
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
```

### `Parser.parse`

This method computes an AST from the given CSS string.

```ts
import Parser from 'css-simple-parser';

const ast = Parser.parse ( '.foo {}' );
```

### `Parser.stringify`

This method computes a CSS string given an AST.

```ts
import Parser from 'css-simple-parser';

const ast = Parser.parse ( '.foo {}' ),
      css = Parser.stringify ( ast );
```

### `Parser.traverse`

This method calls a function with each node found in the AST, the AST is being traversed depth-first.

```ts
import Parser from 'css-simple-parser';

const ast = Parser.parse ( '.foo {}' );

Parser.traverse ( ast, node => {
  console.log ( node.selector );
});
```

## Related

- **[css-flatten](https://github.com/fabiospampinato/css-flatten)**: Flattens a nested CSS string, `&` placeholders are supported too.
- **[css-simple-minifier](https://github.com/fabiospampinato/css-simple-minifier)**: A CSS minifier that's tiny and very fast.

## License

MIT © Fabio Spampinato
