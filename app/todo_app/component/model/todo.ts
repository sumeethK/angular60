/**
 * Created by daljit on 29-Apr-17.
 */
export class Todo {

  _id: number;
  _title: string = '';
  _complete: boolean = false;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get complete(): boolean {
    return this._complete;
  }

  set complete(value: boolean) {
    this._complete = value;
  }
}
