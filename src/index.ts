import Tokenizer from "./tokenizer"
import { PolishNotation, PolishGenerator } from "./polish"
import { evaluate, make } from "./node"

import { LiteralChecker } from "./token-type"

function ast(exp: string) {
  const tokens = Tokenizer(exp)
  const polish = PolishNotation(tokens)
  const gen = PolishGenerator(polish)
  return make(gen)
}

export default function parse(exp: string, literalChecker: LiteralChecker) {
  return evaluate(ast(exp), literalChecker)
}
