import { randomUUID } from "node:crypto";

export type CourseProps = {
  name: string;
  description: string;

}

export class Course {
  private readonly _id: string;
  private readonly _createdAt: Date;
  private _updatedAt: Date;

  private constructor(private readonly props: CourseProps) {
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
  get description() {
    return this.props.description;
  }
  get createdAt() {
    return this._createdAt;
  }
  get updatedAt() {
    return this._updatedAt;
  }

  static create(props: CourseProps) {
    const course = new Course(props);
    return course;
  }

  public update(props: Partial<CourseProps>) {
    Object.assign(this.props, props);
    this._updatedAt = new Date();
  }
}