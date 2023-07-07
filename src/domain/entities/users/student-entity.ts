import { randomUUID } from "node:crypto";
import { Course } from "../courses/course-entity";

export type StudentProps = {
  id: string;
  name: string;
  email: string;
  password: string;
  ra: string;
  courses: Course[];
  createdAt: Date;
  updatedAt: Date;
}

export class Student {

  private constructor(private props: StudentProps) {
    Object.assign(this.props, props);
  }

  get id(): string {
    return this.props.id;
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
    return this.props.ra;
  }
  get createdAt(): Date {
    return this.props.createdAt;
  }
  get updatedAt(): Date {
    return this.props.updatedAt;
  }
  get courses(): Course[] {
    return this.props.courses;
  }

  public static create(props: Omit<StudentProps, "id" | "ra" | "courses" |"createdAt" | "updatedAt">) {
    const id = randomUUID();
    const createdAt = new Date();
    const updatedAt = new Date();
    const ra = `2023${Math.floor(Math.random() * 1000000).toString()}`;
    const student = new Student({ ...props, id, ra, createdAt, updatedAt, courses: [] });
    return student;
  }

  public static instance(props: StudentProps) {
    const student = new Student(props);
    return student;
  }

  public update(props: Partial<Omit<StudentProps, "id" | "ra" | "createdAt" | "updatedAt" | "courses">>) {
    Object.assign(this.props, props);
    this.props.updatedAt = new Date();
  }

  public enrollInCourse(course: Course) {
    const isEnrolled = this.props.courses.some(c => c.id === course.id);
    if (isEnrolled) {
      throw new Error("Student is already enrolled in this course");
    }
    this.props.courses.push(course);
  }

  public withdrawFromCourse(course: Course) {
    const isEnrolled = this.props.courses.some(c => c.id === course.id);
    if (!isEnrolled) {
      throw new Error("Student is not enrolled in this course");
    }
    this.props.courses = this.props.courses.filter(c => c.id !== course.id);
  }
}