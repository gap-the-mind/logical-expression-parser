import { ExpNode, LiteralNode, NotNode, AndNode, OrNode } from "./node"

enum TokenType {
  PAR_OPEN = "(",
  PAR_CLOSE = ")",
  OP_NOT = "!",
  AND = "AND",
  OR = "OR",
  LITERAL = "LITERAL",
}

interface Token {
  type: TokenType
  value: string
}

export function ast(exp: string): ExpNode {
  const tokens = tokenizer(exp)
  const polish = polishNotation(tokens)
  const gen = polishGenerator(polish)
  return make(gen)
}

function make(gen: IterableIterator<Token>): ExpNode {
  const data = gen.next().value

  if (!data) {
    throw new Error("Syntax Error")
  }

  switch (data.type) {
    case TokenType.LITERAL:
      return new LiteralNode(data.value)

    case TokenType.OP_NOT:
      return new NotNode(make(gen))

    case TokenType.AND: {
      const left = make(gen)
      const right = make(gen)
      return new AndNode(right, left)
    }

    case TokenType.OR: {
      const left = make(gen)
      const right = make(gen)
      return new OrNode(right, left)
    }

    default:
      throw new Error("Syntax Error")
  }
}

function tokenizer(exp: string) {
  let literal = ""
  const tokens: Token[] = []

  const addToken = (type: TokenType, value: string) =>
    tokens.push({ type, value })

  const addTokenFromLiteral = () => {
    if (literal !== "") {
      const code = literal.trim().toUpperCase()
      switch (code) {
        case TokenType.AND:
        case TokenType.OR:
          addToken(code, literal)
          break
        default:
          addToken(TokenType.LITERAL, literal)
      }
      literal = ""
    }
  }

  for (const char of exp) {
    switch (char) {
      case TokenType.PAR_OPEN:
      case TokenType.PAR_CLOSE:
        // case TokenType.OP_NOT:
        addTokenFromLiteral()
        addToken(char, char)
        break
      default:
        if (/\s/g.test(char)) {
          addTokenFromLiteral()
        } else {
          literal += char
        }
    }
  }

  addTokenFromLiteral()

  return tokens
}

function polishNotation(tokens: Token[]) {
  const queue: Token[] = []
  const stack: Token[] = []

  tokens.forEach((token) => {
    switch (token.type) {
      case TokenType.LITERAL:
        queue.unshift(token)
        break
      case TokenType.AND:
      case TokenType.OR:
      case TokenType.OP_NOT:
      case TokenType.PAR_OPEN:
        stack.push(token)
        break
      case TokenType.PAR_CLOSE:
        while (
          stack.length &&
          stack[stack.length - 1].type !== TokenType.PAR_OPEN
        ) {
          queue.unshift(stack.pop() as Token)
        }

        stack.pop()

        if (stack.length && stack[stack.length - 1].type === TokenType.OP_NOT) {
          queue.unshift(stack.pop() as Token)
        }
        break
      default:
        break
    }
  })

  const result = (stack.length && [...stack.reverse(), ...queue]) || queue

  return result
}

function* polishGenerator(polish: Token[]): IterableIterator<Token> {
  for (let index = 0; index < polish.length - 1; index++) {
    yield polish[index]
  }

  return polish[polish.length - 1]
}
