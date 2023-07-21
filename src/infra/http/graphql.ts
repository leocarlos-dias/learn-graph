import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { SignUpUseCase } from "../../app/usecases/sign-up/sign-up-usecase";
import { SignInUseCase } from "../../app/usecases/sign-in/sign-in-usecase";
import { JwtService } from "../security/jwt-service";
import { SignInStudentDTO, SignUpStudentDTO, StudentDTO } from "../../app/dtos/student-dto";
import { CreateCourseUseCase } from "../../app/usecases/create-course/create-course-usecase";
import { CreateCourseDTO } from "../../app/dtos/course-dto";
import { CreateSubjectDTO } from "../../app/dtos/subject-dto";
import { AddSubjectUseCase } from "../../app/usecases/add-subject/add-subject-usecase";
import { EnrollInCourseUseCase } from "../../app/usecases/enroll-in-course/enroll-in-course-usecase";
import { StudentDatabaseRepository } from "../repositories/mysql/student-database-repository";
import { PrismaClient } from "@prisma/client";
import { CourseDatabaseRepository } from "../repositories/mysql/course-database-repository";
import { SubjectDatabaseRepository } from "../repositories/mysql/subject-database.repository";
import { GetAllStudentsUseCase } from "../../app/usecases/get-all-students/get-all-students-usecase";

async function main() {
	const typeDefs = `
    scalar Date
    scalar Void
    type Query {
      students: [Student!]!
    }
    type Subject {
      id: String!
      name: String!
      workLoad: Int!
      createdAt: Date!
      updatedAt: Date!
    }
    type Course {
      id: String!
      name: String!
      description: String!
      createdAt: Date!
      updatedAt: Date!
      subjects: [Subject]!
    }
    type Student {
      id: String!
      name: String!
      email: String!
      password: String!
      ra: String!
      courses: [Course]!
      createdAt: Date!
      updatedAt: Date!
    }
    type SignInOutput {
      token: String!
    }
    input SignUpInput {
      name: String!
      email: String!
      password: String! 
    }
    input SignInInput {
      email: String!
      password: String!
    }
    input CreateCourseInput {
      name: String!
      description: String!
    }
    input AddSubjectInput {
      courseId: String!
      subject: CreateSubjectInput!
    }
    input CreateSubjectInput {
      name: String!
      workLoad: Int!
    }
    input EnrollInCourseInput {
      courseId: String!
      studentId: String!
    }
    type Mutation {
      signUp(data: SignUpInput!): Student!
      signIn(data: SignInInput!): SignInOutput!
      createCourse(data: CreateCourseInput!): Course!
      addSubject(data: AddSubjectInput!): Course!
      enrollInCourse(data: EnrollInCourseInput!): Student!
    }
  `;

	const prismaClient = new PrismaClient();
	const studentRepository = new StudentDatabaseRepository(prismaClient);
	const courseRepository = new CourseDatabaseRepository(prismaClient);
	const subjectRepository = new SubjectDatabaseRepository(prismaClient);
	const jwtService = new JwtService();

	const resolvers = {
		Query: {
			students: async () => {
				const getAllStudents = new GetAllStudentsUseCase(studentRepository);
				return await getAllStudents.execute();
			},
		},
		Mutation: {
			signUp: async (_: unknown, { data: { email, name, password } }: { data: SignUpStudentDTO }): Promise<StudentDTO> => {
				const signUpUseCase = new SignUpUseCase(studentRepository);
				return await signUpUseCase.execute({ email, name, password });
			},
			signIn: async (_: unknown, { data: { email, password } }: { data: SignInStudentDTO }): Promise<{ token: string }> => {
				const signInUseCase = new SignInUseCase(studentRepository, jwtService);
				return await signInUseCase.execute({ email, password });
			},
			createCourse: async (_: unknown, { data: { name, description } }: { data: CreateCourseDTO }) => {
				const createCourseUseCase = new CreateCourseUseCase(courseRepository);
				return await createCourseUseCase.execute({ name, description });
			},
			addSubject: async (_: unknown, { data: { courseId, subject: { name, workLoad } } }: { data: { courseId: string, subject: CreateSubjectDTO } }) => {
				const addSubjectUseCase = new AddSubjectUseCase(courseRepository, subjectRepository);
				return await addSubjectUseCase.execute({ courseId, subject: { name, workLoad } });
			},
			enrollInCourse: async (_: unknown, { data: { courseId, studentId } }: { data: { courseId: string, studentId: string } }) => {
				const enrollInCourseUseCase = new EnrollInCourseUseCase(courseRepository, studentRepository);
				return await enrollInCourseUseCase.execute({ courseId, studentId });
			},
		}
	};
	const server = new ApolloServer({ typeDefs, resolvers });
	const { url } = await startStandaloneServer(server, {
		listen: { port: 3000 },
	});
	console.log(`🚀 Server ready at ${url}`);
}

main();