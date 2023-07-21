import { PrismaClient } from "@prisma/client";
import { CourseProps } from "../../../domain/entities/courses/course-entity";
import { CourseRepository } from "../../../domain/repotisories/course-repository";
import { CourseDTO } from "../../../app/dtos/course-dto";

export class CourseDatabaseRepository implements CourseRepository {
	constructor(private readonly prismaClient: PrismaClient) { }
	async findByName(name: string): Promise<CourseDTO | null> {
		try {
			const course = await this.prismaClient.course.findFirst({
				where: {
					name
				},
				select: {
					id: true,
					name: true,
					description: true,
					createdAt: true,
					updatedAt: true,
					subjects: {
						where: {
							course: {
								name
							}
						},
						select: {
							subject: true
						}
					}
				}
			});
			if (!course) return null;
			const output: CourseDTO = {
				...course, subjects: course.subjects.map(subject => {
					return subject.subject;
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
	async findById(id: string): Promise<CourseDTO | null> {
		try {
			const course = await this.prismaClient.course.findUnique({
				where: {
					id
				},
				select: {
					id: true,
					name: true,
					description: true,
					createdAt: true,
					updatedAt: true,
					subjects: {
						where: {
							courseId: id
						},
						select: {
							subject: true
						}
					}
				}
			});
			if (!course) return null;
			const output: CourseDTO = {
				...course, subjects: course.subjects.map(subject => {
					return subject.subject;
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
	async create(course: CourseDTO): Promise<void> {
		await this.prismaClient.course.create({
			data: {
				id: course.id,
				name: course.name,
				description: course.description,
				createdAt: course.createdAt,
				updatedAt: course.updatedAt,
			}
		});
	}
	async save(course: CourseProps): Promise<void> {
		await this.prismaClient.course.update({
			where: {
				id: course.id
			},
			data: {
				name: course.name,
				description: course.description,
				createdAt: course.createdAt,
				updatedAt: course.updatedAt,
				subjects: {
					createMany: {
						skipDuplicates: true,
						data: course.subjects.map(subject => {
							return {
								subjectId: subject.id,
							};
						})
					}
				}
			}
		});
	}
}