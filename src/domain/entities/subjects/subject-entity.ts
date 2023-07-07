import { randomUUID } from "node:crypto";

export type SubjectProps = {
  name: string;
  workLoad: number;
}

export class Subject {
  private readonly _id: string;
  private readonly _createdAt: Date;
  private _updatedAt: Date;

  private constructor(private readonly props: SubjectProps) {
    this._id = randomUUID();
    this._createdAt = new Date();
    this._updatedAt = new Date();
    Object.assign(this.props, props);
  }

  get id() {
    return this._id;
  }
  get name() {
    return this.props.name;
  }
  get workLoad() {
    return this.props.workLoad;
  }
  get createdAt() {
    return this._createdAt;
  }
  get updatedAt() {
    return this._updatedAt;
  }

  static create(props: SubjectProps) {
    const subject = new Subject(props);
    return subject;
  }

  public update(props: Partial<SubjectProps>) {
    Object.assign(this.props, props);
    this._updatedAt = new Date();
  }
}