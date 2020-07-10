const Tokenizer = require('./tokenizer');
const Polish = require('./polish');
const Node = require('./node');

const ast = (exp) => {
  const tokens = Tokenizer(exp);
  const polish = Polish.PolishNotation(tokens);
  const gen = Polish.PolishGenerator(polish);
  return Node.make(gen);
};

const parse = (exp, literalChecker) => Node.evaluate(ast(exp), literalChecker);

module.exports = { ast, parse };
