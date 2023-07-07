import { Course } from "./course-entity";

describe('Course Entity', () => {

  it('should create a course', () => {
    // Arrange
    const course = {
      name: 'Course 1',
      description: 'Description 1',
    };

    // Act
    const courseEntity = Course.create(course);

    // Assert
    expect(courseEntity).toBeInstanceOf(Course);
    expect(courseEntity).toMatchObject(course);
    expect(courseEntity.createdAt).toBeInstanceOf(Date);
    expect(courseEntity.updatedAt).toBeInstanceOf(Date);      
  });

  it('should update a course', () => {
    // Arrange
    const course = {
      name: 'Course 1',
      description: 'Description 1',
    };

    // Act
    const courseEntity = Course.create(course);
    courseEntity.update({ name: 'Course 2' });

    // Assert
    expect(courseEntity).toBeInstanceOf(Course);
    expect(courseEntity).toMatchObject({
      ...course,
      name: 'Course 2',
    });
    expect(courseEntity.createdAt).toBeInstanceOf(Date);
    expect(courseEntity.updatedAt).toBeInstanceOf(Date);
  });
});