import Tokenizer from "./tokenizer"
import { PolishNotation, PolishGenerator } from "./polish"
import { evaluate, make } from "./node"

import { LiteralChecker } from "./token-type"

const ast = (exp: string) => {
  const tokens = Tokenizer(exp)
  const polish = PolishNotation(tokens)
  const gen = PolishGenerator(polish)
  return make(gen)
}

export const parse = (exp: string, literalChecker: LiteralChecker) =>
  evaluate(ast(exp), literalChecker)
