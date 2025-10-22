// pages/api/resume/index.ts
// POST create/update resume - creates new resume or adds version to existing

import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      // Body should contain: { resumeId?: string, userId?: string|null, snapshot: ResumeDocument }
      const { resumeId, userId, snapshot } = req.body;

      if (!snapshot) {
        return res.status(400).json({ error: "Missing snapshot data" });
      }

      if (resumeId) {
        // Update: create a new version under the existing Resume
        const version = await prisma.resumeVersion.create({
          data: {
            resumeId,
            snapshot,
          },
        });

        // Update the resume's updatedAt timestamp
        await prisma.resume.update({
          where: { id: resumeId },
          data: { updatedAt: new Date() },
        });

        return res.status(200).json({
          resumeId,
          versionId: version.id,
          message: "Resume updated successfully",
        });
      } else {
        // Create new Resume + initial version
        const resume = await prisma.resume.create({
          data: {
            userId: userId ?? null,
            title:
              snapshot.meta?.headline ??
              snapshot.meta?.name ??
              "Untitled Resume",
            versions: {
              create: { snapshot },
            },
          },
          include: { versions: true },
        });

        return res.status(201).json({
          resumeId: resume.id,
          versionId: resume.versions[0].id,
          message: "Resume created successfully",
        });
      }
    } catch (err) {
      console.error("Error creating/updating resume:", err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  res.setHeader("Allow", ["POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
