import { TokenType, LiteralChecker, Token } from "./token-type"

class ExpNode {
  public op: string
  public left?: ExpNode
  public right?: ExpNode
  public literal?: string

  constructor(op: string, left?: ExpNode, right?: ExpNode, literal?: string) {
    this.op = op
    if (left) {
      this.left = left
    }
    if (right) {
      this.right = right
    }
    if (literal) {
      this.literal = literal
    }
  }

  isLiteral() {
    return this.op === TokenType.LITERAL
  }

  getLiteralValue() {
    return this.literal
  }

  static CreateAnd(left: ExpNode, right: ExpNode) {
    return new ExpNode(TokenType.AND, left, right)
  }

  static CreateNot(exp: ExpNode) {
    return new ExpNode(TokenType.OP_NOT, exp)
  }

  static CreateOr(left: ExpNode, right: ExpNode) {
    return new ExpNode(TokenType.OR, left, right)
  }

  static CreateLiteral(lit: string) {
    return new ExpNode(TokenType.LITERAL, undefined, undefined, lit)
  }
}

// AST generation
export function make(gen: IterableIterator<Token>): ExpNode {
  const data = gen.next().value

  if (!data) {
    // TO DO: Throw Syntax Error
    throw "Syntax Error"
  }

  switch (data.type) {
    case TokenType.LITERAL:
      return ExpNode.CreateLiteral(data.value)
    case TokenType.OP_NOT:
      return ExpNode.CreateNot(make(gen))
    case TokenType.AND: {
      const left = make(gen)
      const right = make(gen)
      return ExpNode.CreateAnd(right, left)
    }
    case TokenType.OR: {
      const left = make(gen)
      const right = make(gen)
      return ExpNode.CreateOr(right, left)
    }
  }

  throw "Syntax Error"
}

// AST Evaluation
export function evaluate(
  tree: ExpNode,
  literalEvaluator: LiteralChecker
): boolean {
  if (tree.isLiteral()) {
    return literalEvaluator(tree.getLiteralValue() as string)
  }

  if (tree.op === TokenType.OP_NOT) {
    return !evaluate(tree.left as ExpNode, literalEvaluator)
  }

  if (tree.op === TokenType.OR) {
    return (
      evaluate(tree.left as ExpNode, literalEvaluator) ||
      evaluate(tree.right as ExpNode, literalEvaluator)
    )
  }

  if (tree.op === TokenType.AND) {
    return (
      evaluate(tree.left as ExpNode, literalEvaluator) &&
      evaluate(tree.right as ExpNode, literalEvaluator)
    )
  }

  return false
}
