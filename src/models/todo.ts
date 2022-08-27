export interface ITodo {
  id: number;
  text: string;
};

export class Todo {
  id: number;
  text: string;

  constructor(text: string) {
    this.id = Math.random();
    this.text = text;
  }
};