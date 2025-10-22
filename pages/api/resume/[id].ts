// pages/api/resume/[id].ts
// GET resume by ID - returns the latest snapshot

import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Missing or invalid resume id" });
  }

  if (req.method === "GET") {
    try {
      // Fetch resume and its latest version
      const resume = await prisma.resume.findUnique({
        where: { id },
        include: {
          versions: {
            orderBy: { createdAt: "desc" },
            take: 1,
          },
        },
      });

      if (!resume) {
        return res.status(404).json({ error: "Resume not found" });
      }

      const latest = resume.versions?.[0];
      return res.status(200).json({
        resumeId: resume.id,
        title: resume.title,
        snapshot: latest?.snapshot ?? null,
        createdAt: latest?.createdAt,
        updatedAt: resume.updatedAt,
      });
    } catch (err) {
      console.error("Error fetching resume:", err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  res.setHeader("Allow", ["GET"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
