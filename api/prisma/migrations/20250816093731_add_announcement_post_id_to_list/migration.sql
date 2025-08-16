/*
  Warnings:

  - Added the required column `announcementPostId` to the `List` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_List" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "theme" TEXT,
    "announcementPostId" INTEGER NOT NULL,
    "hostId" INTEGER NOT NULL,
    CONSTRAINT "List_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_List" ("hostId", "id", "name", "theme") SELECT "hostId", "id", "name", "theme" FROM "List";
DROP TABLE "List";
ALTER TABLE "new_List" RENAME TO "List";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
