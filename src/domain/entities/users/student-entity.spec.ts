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
});