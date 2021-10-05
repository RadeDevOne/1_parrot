/*
  Warnings:

  - Added the required column `bank` to the `PaymentResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PaymentResult" ADD COLUMN     "bank" TEXT NOT NULL;
