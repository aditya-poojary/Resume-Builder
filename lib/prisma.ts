import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Log database URL (masked for security)
const dbUrl = process.env.DATABASE_URL || "";
const maskedUrl = dbUrl.replace(/:([^:@]+)@/, ":****@");
console.log("🔵 [PRISMA] Initializing with DATABASE_URL:", maskedUrl);
console.log("🔵 [PRISMA] Environment:", process.env.NODE_ENV);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
  console.log("✅ [PRISMA] Client initialized in development mode");
} else {
  console.log("✅ [PRISMA] Client initialized in production mode");
}
