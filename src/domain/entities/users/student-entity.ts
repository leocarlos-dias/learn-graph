import { randomUUID } from "node:crypto";

export type StudentProps = {
  name: string;
  email: string;
  password: string;
}

export class Student {
  private readonly _id: string;
  private readonly _ra: string;
  private readonly _createdAt: Date;
  private _updatedAt: Date;

  private constructor(private readonly props: StudentProps) {
    this._id = randomUUID();
    this._createdAt = new Date();
    this._updatedAt = new Date();
    this._ra = `2023${Math.floor(Math.random() * 1000000).toString()}`;

    Object.assign(this.props, props);
  }

  get id(): string {
    return this._id;
  }
  get name(): string {
    return this.props.name;
  }
  get email(): string {
    return this.props.email;
  }
  get password(): string {
    return this.props.password;
  }
  get ra(): string {
    return this._ra;
  }
  get createdAt(): Date {
    return this._createdAt;
  }
  get updatedAt(): Date {
    return this._updatedAt;
  }

  public static create(props: StudentProps) {
    const student = new Student(props);
    return student;
  }

  public update(props: Partial<StudentProps>) {
    Object.assign(this.props, props);
    this._updatedAt = new Date();
  }
}