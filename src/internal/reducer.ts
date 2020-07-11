export type LiteralEvaluator = (s: string) => boolean

export abstract class Reducer<R> {
  public abstract litteral(literal: string): R
  public abstract not(sub: R): R
  public abstract or(left: R, right: R): R
  public abstract and(left: R, right: R): R
}

export class EvalReducer extends Reducer<boolean> {
  private literalEvaluator: LiteralEvaluator

  constructor(literalEvaluator: LiteralEvaluator) {
    super()
    this.literalEvaluator = literalEvaluator
  }

  public litteral(literal: string): boolean {
    return this.literalEvaluator(literal)
  }

  public not(sub: boolean): boolean {
    return !sub
  }

  public or(left: boolean, right: boolean): boolean {
    return left || right
  }

  public and(left: boolean, right: boolean): boolean {
    return left && right
  }
}

export class ToStringReducer extends Reducer<string> {
  public litteral(literal: string): string {
    return literal
  }

  public not(sub: string): string {
    return `NOT (${sub})`
  }

  public or(left: string, right: string): string {
    return `(${left}) OR (${right})`
  }

  public and(left: string, right: string): string {
    return `(${left}) AND (${right})`
  }
}
