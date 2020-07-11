import Tokenizer from "./internal/tokenizer"
import { PolishNotation, PolishGenerator } from "./internal/polish"
import { evaluate, make, ExpNode } from "./internal/node"

import { LiteralChecker } from "./internal/token-type"

function ast(exp: string): ExpNode {
  const tokens = Tokenizer(exp)
  const polish = PolishNotation(tokens)
  const gen = PolishGenerator(polish)
  return make(gen)
}

export { evaluate, ast, ExpNode, LiteralChecker }
