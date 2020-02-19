# Logical Expression Parser (Fork)
This is a logical expression parser for JavaScript, it can parse a logical expression into a AST object and evaluates the result using your token checking function.

## Supported logical operators
1. `OR`
1. `AND`
1. `()` Parentheses

## How it works
1. The parser parse and tokenize the expression, for example one of your function requires `REGISTED AND (SPECIAL OR INVITED)`
1. Parser then will pass `REGISTED`, `SPECIAL` and `INVITED` into your token checking function to get a boolean result
1. Finaly the parser will evaluates the final result

## Example
```javascript
const LEP = require('@jeanbenitez/lep');

const requirements = 'REGISTED AND (SPECIAL OR INVITED)';
const listA = ['REGISTED', 'INVITED'];
const listB = ['SPECIAL', 'EXPERT'];

const resultA = LEP.parse(requirements, t => listA.includes(t));
const resultB = LEP.parse(requirements, t => listB.includes(t));
console.log({ resultA, resultB });
// { resultA: true, resultB: false }

// Getting AST only
const ast = LEP.ast(requirements);
console.log({ ast });
/*
  {
    ast: ExpNode {
      op: 'AND',
      left: ExpNode {
        op: 'LITERAL',
        literal: 'REGISTED'
      },
      right: ExpNode {
        op: 'OR',
        left: [ExpNode],
        right: [ExpNode]
      }
    }
  }
*/
```