import { Course } from "../../../domain/entities/courses/course-entity";
import { Student } from "../../../domain/entities/students/student-entity";
import { CourseRepository } from "../../../domain/repotisories/course-repository";
import { StudentRepository } from "../../../domain/repotisories/student-repository";
import { CourseInMemoryRepository } from "../../../infra/repositories/in-memory/course-in-memory-repository";
import { StudentInMemoryRepository } from "../../../infra/repositories/in-memory/student-in-memory-repository";
import { EnrollInCourseUseCase } from "./enroll-in-course-usecase";

describe("Enroll In Course Usecase", () => {
  let courseRepository: CourseRepository;
  let studentRepository: StudentRepository;
  let enrollInCourseUseCase: EnrollInCourseUseCase;

  beforeEach(() => {
    courseRepository = new CourseInMemoryRepository();
    studentRepository = new StudentInMemoryRepository();
    enrollInCourseUseCase = new EnrollInCourseUseCase(courseRepository, studentRepository);
  });

  it("should enroll the student in the course", async () => {
    // Arrange
    const course = {
      name: "Course Name",
      description: "Course Description",
    };
    const student = {
      name: "John Doe",
      email: "jonhdoe@example.com",
      password: "123456",
    };

    await studentRepository.create(Student.create(student));
    await courseRepository.create(Course.create(course));

    const savedStudent = await studentRepository.findByEmail(student.email);
    const savedCourse = await courseRepository.findByName(course.name);

    // Act
    await enrollInCourseUseCase.execute({
      courseId: savedCourse!.id,
      studentId: savedStudent!.id,
    });

    // Assert
    expect(savedStudent?.courses).toHaveLength(1);
    expect(savedStudent?.courses[0]).toMatchObject(course);
  });

  it("should throw an error if the course does not exist", async () => {
    // Arrange
    const student = {
      name: "John Doe",
      email: "jonhdoe@example.com",
      password: "123456",
    };

    await studentRepository.create(Student.create(student));
    const savedStudent = await studentRepository.findByEmail(student.email);

    // Act & Assert
    await expect(enrollInCourseUseCase.execute({ courseId: "invalid-course-id", studentId: savedStudent!.id })).rejects.toThrowError("Course does not exists");
  });

  it("should throw an error if the student does not exist", async () => {
    // Arrange
    const course = {
      name: "Course Name",
      description: "Course Description",
    };

    await courseRepository.create(Course.create(course));
    const savedCourse = await courseRepository.findByName(course.name);

    // Act & Assert
    await expect(enrollInCourseUseCase.execute({ courseId: savedCourse!.id, studentId: "invalid-student-id" })).rejects.toThrowError("Student does not exists");
  });

  it("should throw an error if the student is already enrolled in the course", async () => {
    // Arrange
    const course = {
      name: "Course Name",
      description: "Course Description",
    };
    const student = {
      name: "John Doe",
      email: "jonhdoe@example.com",
      password: "123456",
    };

    await studentRepository.create(Student.create(student));
    await courseRepository.create(Course.create(course));

    const savedStudent = await studentRepository.findByEmail(student.email);
    const savedCourse = await courseRepository.findByName(course.name);

    await enrollInCourseUseCase.execute({
      courseId: savedCourse!.id,
      studentId: savedStudent!.id,
    });

    // Act & Assert
    await expect(enrollInCourseUseCase.execute({ courseId: savedCourse!.id, studentId: savedStudent!.id })).rejects.toThrowError("Student is already enrolled in this course");
  });
});