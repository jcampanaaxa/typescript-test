namespace ErrorClass {
  export class NoStackError extends Error {
    public originalStack: string;

    constructor(message: string) {
      super(message);

      this.originalStack = this.stack;
      this.stack = null;
    }
  }
}
