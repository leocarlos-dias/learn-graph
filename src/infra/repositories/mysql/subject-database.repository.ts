import { PrismaClient } from "@prisma/client";
import { SubjectRepository } from "../../../domain/repotisories/subject-repository";
import { SubjectDTO } from "../../../app/dtos/subject-dto";

export class SubjectDatabaseRepository implements SubjectRepository {
	constructor(private readonly prismaClient: PrismaClient) { }
	async findByName(name: string): Promise<SubjectDTO | null> {
		try {
			const subject = await this.prismaClient.subject.findFirst({
				where: {
					name
				},
			});
			if (!subject) return null;
			return subject;
		} catch (error) {
			console.error(error);
			return null;
		} finally {
			this.prismaClient.$disconnect();
		}
	}
	async findById(id: string): Promise<SubjectDTO | null> {
		try {
			const subject = await this.prismaClient.subject.findUnique({
				where: {
					id
				},
			});
			if (!subject) return null;
			return subject;
		} catch (error) {
			console.error(error);
			return null;
		} finally {
			this.prismaClient.$disconnect();
		}
	}
	async create(subject: SubjectDTO): Promise<void> {
		try {
			await this.prismaClient.subject.create({
				data: {
					id: subject.id,
					name: subject.name,
					workLoad: subject.workLoad,
					createdAt: subject.createdAt,
					updatedAt: subject.updatedAt,
				}
			});
		} catch (error) {
			console.error(error);
		} finally {
			this.prismaClient.$disconnect();
		}
	}
	async save(subject: SubjectDTO): Promise<void> {
		console.log(JSON.stringify(subject) + "SAVED");
	}
}