import { PrismaClient } from "@prisma/client";
import { StudentRepository } from "../../../domain/repotisories/student-repository";
import { StudentDTO } from "../../../app/dtos/student-dto";

export class StudentDatabaseRepository implements StudentRepository {
	constructor(private readonly prismaClient: PrismaClient) { }

	async findAll(): Promise<StudentDTO[]> {
		try {
			const students = await this.prismaClient.student.findMany({
				select: {
					id: true,
					name: true,
					email: true,
					password: true,
					ra: true,
					createdAt: true,
					updatedAt: true,
					courses: {
						select: {
							course: {
								select: {
									id: true,
									name: true,
									description: true,
									createdAt: true,
									updatedAt: true,
									subjects: {
										select: {
											subject: {
												select: {
													id: true,
													name: true,
													workLoad: true,
													createdAt: true,
													updatedAt: true,
												}
											}
										}
									}
								}
							}
						}
					}
				}
			});
			const output: StudentDTO[] = students.map(student => {
				return {
					...student, courses: student.courses.map(course => {
						return {
							...course.course, subjects: course.course.subjects.map(subject => {
								return subject.subject;
							})
						};
					})
				};
			});
			return output;
		} catch (error) {
			console.error(error);
			return [];
		} finally {
			this.prismaClient.$disconnect();
		}
	}
	async findByEmail(email: string): Promise<StudentDTO | null> {
		try {
			const student = await this.prismaClient.student.findFirst({
				where: {
					email
				},
				select: {
					id: true,
					name: true,
					email: true,
					password: true,
					ra: true,
					createdAt: true,
					updatedAt: true,
					courses: {
						where: {
							student: {
								email
							}
						},
						select: {
							course: {
								select: {
									id: true,
									name: true,
									description: true,
									createdAt: true,
									updatedAt: true,
									subjects: {
										select: {
											subject: {
												select: {
													id: true,
													name: true,
													workLoad: true,
													createdAt: true,
													updatedAt: true,
												}
											}
										}
									}
								}
							}
						}
					}
				}
			});
			if (!student) return null;
			const output: StudentDTO = {
				...student, courses: student.courses.map(course => {
					return {
						...course.course, subjects: course.course.subjects.map(subject => {
							return subject.subject;
						})
					};
				})
			};
			return output;
		} catch (error) {
			console.error(error);
			return null;
		} finally {
			this.prismaClient.$disconnect();
		}
	}
	async findById(id: string): Promise<StudentDTO | null> {
		try {
			const student = await this.prismaClient.student.findUnique({
				where: {
					id
				},
				select: {
					id: true,
					name: true,
					email: true,
					password: true,
					ra: true,
					createdAt: true,
					updatedAt: true,
					courses: {
						where: {
							studentId: id
						},
						select: {
							course: {
								select: {
									id: true,
									name: true,
									description: true,
									createdAt: true,
									updatedAt: true,
									subjects: {
										select: {
											subject: {
												select: {
													id: true,
													name: true,
													workLoad: true,
													createdAt: true,
													updatedAt: true,
												}
											}
										}
									}
								}
							}
						}
					}
				}
			});
			if (!student) return null;
			const output: StudentDTO = {
				...student, courses: student.courses.map(course => {
					return {
						...course.course, subjects: course.course.subjects.map(subject => {
							return subject.subject;
						})
					};
				})
			};
			return output;
		} catch (error) {
			console.error(error);
			return null;
		} finally {
			this.prismaClient.$disconnect();
		}
	}
	async create(student: StudentDTO): Promise<void> {
		await this.prismaClient.student.create({
			data: {
				id: student.id,
				name: student.name,
				email: student.email,
				password: student.password,
				ra: student.ra,
				createdAt: student.createdAt,
				updatedAt: student.updatedAt,
			}
		});
	}
	async save(student: StudentDTO): Promise<void> {
		console.log(student.courses, "SAVE");
	}
}