import { randomUUID } from "node:crypto";
import { Subject } from "../subjects/subject-entity";

export type CourseProps = {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  subjects: Subject[];
}

export class Course {
  private constructor(private props: CourseProps) {
    Object.assign(this.props, props);
  }

  get id() {
    return this.props.id;
  }
  get name() {
    return this.props.name;
  }
  get description() {
    return this.props.description;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(props: Omit<CourseProps, "id" | "createdAt" | "updatedAt" | "subjects">) {
    const id = randomUUID();
    const createdAt = new Date();
    const updatedAt = new Date();
    const course = new Course({ ...props, id, createdAt, updatedAt, subjects: [] });
    return course;
  }

  public update(props: Partial<Omit<CourseProps, "id" | "createdAt" | "updatedAt" | "subjects">>) {
    Object.assign(this.props, props);
    this.props.updatedAt = new Date();
  }

  public static instance(props: CourseProps) {
    const course = new Course(props);
    return course;
  }

  public addSubject(subject: Subject) {
    this.props.subjects.push(subject);
  }

  public removeSubject(subject: Subject) {
    this.props.subjects = this.props.subjects.filter(s => s.id !== subject.id);
  }
}