import { CourseRepository } from "../../../domain/repotisories/course-repository";
import { CourseInMemoryRepository } from "../../../infra/repositories/in-memory/course-in-memory-repository";
import { CreateCourseUseCase } from "./create-course-usecase";

describe('Create Course Usecase', () => {
  let courseRepository: CourseRepository;
  let createCourseUseCase: CreateCourseUseCase;

  beforeEach(() => {
    courseRepository = new CourseInMemoryRepository();
    createCourseUseCase = new CreateCourseUseCase(courseRepository);
  });

  it("should create the course data", async () => {
    // Arrange
    const course = {
      name: "Course Name",
      description: "Course Description",
    };

    // Act
    await createCourseUseCase.execute(course);

    // Assert
    const savedCourse = await courseRepository.findByName(course.name);
    expect(savedCourse).toMatchObject(course);
    expect(savedCourse?.id).toBeDefined();
    expect(savedCourse?.createdAt).toBeDefined();
    expect(savedCourse?.updatedAt).toBeDefined();
  });

  it("should throw an error if the course already exists", async () => {
    // Arrange
    const course = {
      name: "Course Name",
      description: "Course Description",
    };

    // Act
    await createCourseUseCase.execute(course);

    // Assert
    await expect(createCourseUseCase.execute(course)).rejects.toThrowError("Course already exists");
  });
});