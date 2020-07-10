export enum TokenType {
  PAR_OPEN = "(",
  PAR_CLOSE = ")",
  OP_NOT = "!",
  AND = "AND",
  OR = "OR",
  LITERAL = "LITERAL",
}

export interface Token {
  type: TokenType
  value: string
}

export type LiteralChecker = (s: string) => boolean
