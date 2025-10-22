// pages/api/share.ts
// POST create share link - creates a new version with a unique slug for public sharing

import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";
import { v4 as uuidv4 } from "uuid";

// Generate a short slug for sharing (8 characters)
function makeSlug(): string {
  return uuidv4().split("-")[0];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { resumeId, snapshot } = req.body;

    if (!resumeId || !snapshot) {
      return res.status(400).json({ error: "Missing resumeId or snapshot" });
    }

    // Generate unique slug (retry if collision occurs)
    let slug = makeSlug();
    let attempts = 0;
    const maxAttempts = 5;

    while (attempts < maxAttempts) {
      try {
        // Create a new version with slug set (this is the share snapshot)
        const version = await prisma.resumeVersion.create({
          data: {
            resumeId,
            slug,
            snapshot,
          },
        });

        const publicUrl = `${
          process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
        }/r/${slug}`;

        return res.status(201).json({
          slug,
          publicUrl,
          versionId: version.id,
          message: "Share link created successfully",
        });
      } catch (error: any) {
        // If slug collision (unique constraint violation), generate new slug and retry
        if (error.code === "P2002" && attempts < maxAttempts - 1) {
          slug = makeSlug();
          attempts++;
          continue;
        }
        throw error;
      }
    }

    return res
      .status(500)
      .json({ error: "Failed to generate unique share link" });
  } catch (err) {
    console.error("Error creating share link:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
