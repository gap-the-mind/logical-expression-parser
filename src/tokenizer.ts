import { TokenType, Token } from "./token-type"

export default (exp: string) => {
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
