import { Reducer } from "./reducer"

export abstract class ExpNode {
  public abstract reduce<R>(reducer: Reducer<R>): R
}

export class NotNode extends ExpNode {
  private subExp: ExpNode

  constructor(subExp: ExpNode) {
    super()
    this.subExp = subExp
  }

  public reduce<R>(reducer: Reducer<R>): R {
    return reducer.not(this.subExp.reduce(reducer))
  }
}

export class AndNode extends ExpNode {
  private left: ExpNode
  private right: ExpNode

  constructor(left: ExpNode, right: ExpNode) {
    super()
    this.left = left
    this.right = right
  }

  public reduce<R>(reducer: Reducer<R>): R {
    return reducer.and(this.left.reduce(reducer), this.right.reduce(reducer))
  }
}

export class OrNode extends ExpNode {
  private left: ExpNode
  private right: ExpNode

  constructor(left: ExpNode, right: ExpNode) {
    super()
    this.left = left
    this.right = right
  }

  public reduce<R>(reducer: Reducer<R>): R {
    return reducer.or(this.left.reduce(reducer), this.right.reduce(reducer))
  }
}

export class LiteralNode extends ExpNode {
  private literal: string

  constructor(literal: string) {
    super()
    this.literal = literal
  }

  public reduce<R>(reducer: Reducer<R>): R {
    return reducer.litteral(this.literal)
  }
}
