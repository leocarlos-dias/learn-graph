import { Course } from "../courses/course-entity";
import { Student } from "./student-entity";

describe("Student Entity", () => {
  it("should create a student entity", () => {
    // Arrange
    const student = {
      name: "Jonh Doe",
      email: "jonhdoe@mail.com",
      password: "123",
    };

    // Act
    const studentEntity = Student.create(student);

    // Assert
    expect(studentEntity).toBeInstanceOf(Student);
    expect(studentEntity).toMatchObject(student);
    expect(studentEntity.ra).toMatch(/2023\d{6}/);
    expect(studentEntity.createdAt).toBeInstanceOf(Date);
    expect(studentEntity.updatedAt).toBeInstanceOf(Date);
  });

  it("should update a student entity", () => {
    // Arrange
    const student = {
      name: "Jonh Doe",
      email: "jonhdoe@mail.com",
      password: "123",
    };

    // Act
    const studentEntity = Student.create(student);
    studentEntity.update({ name: "Jonh Doe 2" });

    // Assert
    expect(studentEntity).toBeInstanceOf(Student);
    expect(studentEntity).toMatchObject({
      ...student,
      name: "Jonh Doe 2",
    });
    expect(studentEntity.ra).toMatch(/2023\d{6}/);
    expect(studentEntity.createdAt).toBeInstanceOf(Date);
    expect(studentEntity.updatedAt).toBeInstanceOf(Date);
  });

  it("should instance a student entity", () => {
    // Arrange
    const student = {
      id: "123",
      name: "Jonh Doe",
      email: "jonhdoe@mail.com",
      password: "123",
      ra: "2023123456",
      createdAt: new Date(),
      updatedAt: new Date(),
      courses: []
    };

    // Act
    const studentEntity = Student.instance(student);

    // Assert
    expect(studentEntity).toBeInstanceOf(Student);
    expect(studentEntity).toMatchObject(student);
  });

  it("should enroll a student in a course", () => {
    // Arrange
    const student = {
      name: "Jonh Doe",
      email: "jonhdoe@mail.com",
      password: "123",
    };

    const course = {
      name: "Course 1",
      description: "Course 1 description",
    };

    const studentEntity = Student.create(student);
    const courseEntity = Course.create(course);

    // Act
    studentEntity.enrollInCourse(courseEntity);

    // Assert
    expect(studentEntity.courses).toHaveLength(1);
    expect(studentEntity.courses[0]).toMatchObject(courseEntity);
  });

  it("should unenroll a student in a course", () => {
    // Arrange
    const student = {
      name: "Jonh Doe",
      email: "jonhdoe@mail.com",
      password: "123",
    };

    const course = {
      name: "Course 1",
      description: "Course 1 description",
    };

    const studentEntity = Student.create(student);
    const courseEntity = Course.create(course);

    // Act
    studentEntity.enrollInCourse(courseEntity);

    // Assert
    expect(studentEntity.courses).toHaveLength(1);
    expect(studentEntity.courses[0]).toMatchObject(courseEntity);

    // Act
    studentEntity.withdrawFromCourse(courseEntity);

    // Assert
    expect(studentEntity.courses).toHaveLength(0);
  });

  it("should throw an error when trying to enroll a student in a course that he is already enrolled", () => {
    // Arrange
    const student = {
      name: "Jonh Doe",
      email: "jonhedoe@mail.com",
      password: "123",
    };

    const course = {
      name: "Course 1",
      description: "Course 1 description",
    };

    const studentEntity = Student.create(student);
    const courseEntity = Course.create(course);
    studentEntity.enrollInCourse(courseEntity);

    // Act & Assert
    expect(() => studentEntity.enrollInCourse(courseEntity)).toThrowError("Student is already enrolled in this course");
  });

  it("should throw an error when trying to unenroll a student in a course that he is not enrolled", () => {
    // Arrange
    const student = {
      name: "Jonh Doe",
      email: "jonhdoe@example.com",
      password: "123",
    };

    const course = {
      name: "Course 1",
      description: "Course 1 description",
    };

    const studentEntity = Student.create(student);
    const courseEntity = Course.create(course);

    // Act & Assert
    expect(() => studentEntity.withdrawFromCourse(courseEntity)).toThrowError("Student is not enrolled in this course");
  });
});