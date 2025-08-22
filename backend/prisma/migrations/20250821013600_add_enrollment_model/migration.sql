/*
  Warnings:

  - You are about to drop the column `progress` on the `Enrollment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Enrollment" DROP COLUMN "progress",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "public"."EnrollmentLesson" (
    "id" SERIAL NOT NULL,
    "enrollmentId" INTEGER NOT NULL,
    "lessonId" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EnrollmentLesson_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EnrollmentLesson_enrollmentId_lessonId_key" ON "public"."EnrollmentLesson"("enrollmentId", "lessonId");

-- AddForeignKey
ALTER TABLE "public"."EnrollmentLesson" ADD CONSTRAINT "EnrollmentLesson_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "public"."Enrollment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EnrollmentLesson" ADD CONSTRAINT "EnrollmentLesson_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "public"."Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
