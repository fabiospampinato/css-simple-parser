
/* IMPORT */

import indexAll from 'string-indexes';
import {TOKEN_TYPE, TOKEN} from './types';

const {SELECTOR, BODY_START, BODY_END} = TOKEN_TYPE;

/* MERGE TOKENS */

function mergeTokensSorted ( t1: TOKEN[], t2: TOKEN[] ): TOKEN[] { // Optimized sorting algorithm for merging presorted token arrays

  let length = t1.length + t2.length,
      i = t1.length - 1,
      j = t2.length - 1;

  const merged = new Array ( length );

  while ( length > 0 ) {

    merged[--length] = ( j < 0 || ( i >= 0 && t1[i].index > t2[j].index ) ) ? t1[i--] : t2[j--];

  }

  return merged;

}

function mergeTokensSortedEvenOdd ( t1: TOKEN[], t2: TOKEN[] ): TOKEN[] { // Optimized sorting algorithim for merging presorted token arrays where "t1[i]" should always be placed before "t2[i]", basically it intertwines the arrays

  const length = t1.length,
        merged = new Array ( length * 2 );

  for ( let i = 0, j = 0; i < length; i++, j += 2 ) {

    merged[j] = t1[i];
    merged[j + 1] = t2[i];

  }

  return merged;

}

/* FIND SELECTOR START INDEX */

function findSelectorStartIndex ( tokens: TOKEN[], tokenIndexStart = 0, limit: number ): [number, number] {

  let lastIndex = 0,
      lastTokenIndex = tokenIndexStart;

  for ( let i = tokenIndexStart, l = tokens.length; i < l; i++ ) {

    const token = tokens[i],
          index = token.index;

    if ( index >= limit ) break;

    lastIndex = ( token.type === BODY_START ) ? index : index + 1;
    lastTokenIndex = i + 1;

  }

  return [lastIndex, lastTokenIndex];

}

/* TOKENIZER */

function tokenizer ( css: string ): TOKEN[] {

  /* VARIABLES */

  const startIndexes = indexAll ( css, '{' ),
        endIndexes = indexAll ( css, '}' ),
        selectorTokens: TOKEN[] = new Array ( startIndexes.length ),
        startTokens: TOKEN[] = new Array ( startIndexes.length ),
        endTokens: TOKEN[] = new Array ( endIndexes.length );

  let selectorIndex = 0,
      startIndex = 0,
      endIndex = 0;

  /* BODY_START */

  for ( let i = 0, l = startIndexes.length; i < l; i++ ) {

    startTokens[startIndex++] = {
      type: BODY_START,
      index: startIndexes[i] + 1 // Start index
    };

  }

  /* BODY_END */

  for ( let i = 0, l = endIndexes.length; i < l; i++ ) {

    endTokens[endIndex++] = {
      type: BODY_END,
      index: endIndexes[i] // End index
    };

  }

  /* SELECTOR */

  let prevStartTokenIndex = 0,
      prevEndTokenIndex = 0;

  for ( let i = 0, l = startIndexes.length; i < l; i++ ) {

    const indexEnd = startIndexes[i],
          findStartData = findSelectorStartIndex ( startTokens, prevStartTokenIndex, indexEnd ),
          findEndData = findSelectorStartIndex ( endTokens, prevEndTokenIndex, indexEnd );

    prevStartTokenIndex = findStartData[1];
    prevEndTokenIndex = findEndData[1];

    let index = ( findStartData[0] >= findEndData[0] ) ? findStartData[0] : findEndData[0],
        selector = css.slice ( index, indexEnd ),
        semicolonIndex = index + selector.lastIndexOf ( ';', indexEnd ) + 1;

    if ( semicolonIndex > index ) {
      index = semicolonIndex;
      selector = css.slice ( index, indexEnd );
    }

    selectorTokens[selectorIndex++] = {
      type: SELECTOR,
      index,
      indexEnd,
      selector
    };

  }

  /* RETURN */

  return mergeTokensSorted ( mergeTokensSortedEvenOdd ( selectorTokens, startTokens ), endTokens );

}

/* EXPORT */

export default tokenizer;
