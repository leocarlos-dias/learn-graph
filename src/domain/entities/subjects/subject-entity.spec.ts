import { Subject } from "./subject-entity";

describe('Subject Entity', () => {
  it('should be able to create a new subject', () => {
    // Arrange
    const subject = {
      name: 'subject 1',
      workLoad: 60
    }

    // Act
    const subjectEntity = Subject.create(subject);

    // Assert
    expect(subjectEntity).toBeInstanceOf(Subject);
    expect(subjectEntity).toMatchObject(subject);
    expect(subjectEntity.createdAt).toBeInstanceOf(Date);
    expect(subjectEntity.updatedAt).toBeInstanceOf(Date);
  });

  it('should be able to update a subject', () => {
    // Arrange
    const subject = {
      name: 'subject 1',
      workLoad: 60
    }

    // Act
    const subjectEntity = Subject.create(subject);
    subjectEntity.update({ name: 'subject 2' });

    // Assert
    expect(subjectEntity).toBeInstanceOf(Subject);
    expect(subjectEntity).toMatchObject({
      ...subject,
      name: 'subject 2',
    });
    expect(subjectEntity.createdAt).toBeInstanceOf(Date);
    expect(subjectEntity.updatedAt).toBeInstanceOf(Date);
  });
});