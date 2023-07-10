-- CreateTable
CREATE TABLE `students` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `ra` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `students_email_key`(`email`),
    UNIQUE INDEX `students_ra_key`(`ra`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `courses` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subjects` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `workLoad` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `course_student` (
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `courseId` INTEGER NOT NULL,
    `studentId` INTEGER NOT NULL,

    PRIMARY KEY (`courseId`, `studentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `course_subject` (
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `courseId` INTEGER NOT NULL,
    `subjectId` INTEGER NOT NULL,

    PRIMARY KEY (`courseId`, `subjectId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `course_student` ADD CONSTRAINT `course_student_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `course_student` ADD CONSTRAINT `course_student_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `students`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `course_subject` ADD CONSTRAINT `course_subject_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `course_subject` ADD CONSTRAINT `course_subject_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `subjects`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
