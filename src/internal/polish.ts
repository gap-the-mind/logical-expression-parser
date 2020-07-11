import { Token, TokenType } from "./token-type"

export function PolishNotation(tokens: Token[]) {
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

export function* PolishGenerator(polish: Token[]): IterableIterator<Token> {
  for (let index = 0; index < polish.length - 1; index++) {
    yield polish[index]
  }

  return polish[polish.length - 1]
}
