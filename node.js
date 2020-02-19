const TokenType = require('./token-type');

class ExpNode {
  constructor(op, left, right, literal) {
    this.op = op;
    if (left) { this.left = left; }
    if (right) { this.right = right; }
    if (literal) { this.literal = literal; }
  }

  isLiteral() {
    return this.op === TokenType.LITERAL;
  }

  getLiteralValue() {
    return this.literal;
  }

  static CreateAnd(left, right) {
    return new ExpNode(TokenType.AND, left, right);
  }

  static CreateNot(exp) {
    return new ExpNode(TokenType.OP_NOT, exp);
  }

  static CreateOr(left, right) {
    return new ExpNode(TokenType.OR, left, right);
  }

  static CreateLiteral(lit) {
    return new ExpNode(TokenType.LITERAL, undefined, undefined, lit);
  }
}

// AST generation
const make = gen => {
  const data = gen.next().value;

  if (!data) {
    // TO DO: Throw Syntax Error
    return null;
  }

  switch (data.type) {
    case TokenType.LITERAL:
      return ExpNode.CreateLiteral(data.value);
    case TokenType.OP_NOT:
      return ExpNode.CreateNot(make(gen));
    case TokenType.AND: {
      const left = make(gen);
      const right = make(gen);
      return right ? ExpNode.CreateAnd(right, left) : ExpNode.CreateAnd(left);
    }
    case TokenType.OR: {
      const left = make(gen);
      const right = make(gen);
      return right ? ExpNode.CreateOr(right, left) : ExpNode.CreateOr(left);
    }
  }
  return null;
};

// AST Evaluation
const evaluate = (tree, literalEvaluator) => {
  if (tree.isLiteral()) {
    return literalEvaluator(tree.getLiteralValue());
  }

  if (tree.op === TokenType.OP_NOT) {
    return !evaluate(tree.left, literalEvaluator);
  }

  if (tree.op === TokenType.OR) {
    return (
      evaluate(tree.left, literalEvaluator) ||
      evaluate(tree.right, literalEvaluator)
    );
  }

  if (tree.op === TokenType.AND) {
    return (
      evaluate(tree.left, literalEvaluator) &&
      evaluate(tree.right, literalEvaluator)
    );
  }
};

module.exports = {
  make,
  evaluate
};
