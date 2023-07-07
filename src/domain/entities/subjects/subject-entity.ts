import { randomUUID } from "node:crypto";

export type SubjectProps = {
  id: string;
  name: string;
  workLoad: number;
  createdAt: Date;
  updatedAt: Date;
}

export class Subject {
  private constructor(private props: SubjectProps) {
    Object.assign(this.props, props);
  }

  get id() {
    return this.props.id;
  }
  get name() {
    return this.props.name;
  }
  get workLoad() {
    return this.props.workLoad;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(props: Omit<SubjectProps, "id" | "createdAt" | "updatedAt">) {
    const id = randomUUID();
    const createdAt = new Date();
    const updatedAt = new Date();
    const subject = new Subject({ ...props, id, createdAt, updatedAt });
    return subject;
  }

  public update(props: Partial<Omit<SubjectProps, "id" | "createdAt" | "updatedAt">>) {
    Object.assign(this.props, props);
    this.props.updatedAt = new Date();
  }

  public static instance(props: SubjectProps) {
    const subject = new Subject(props);
    return subject;
  }
}