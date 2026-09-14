import type { ResumeContent } from "@/types/resume";

export function generateCoverLetter(
  content: ResumeContent,
  { company, role }: { company: string; role: string }
): string {
  const { personalInfo: p, experience, skills } = content;
  const name = p.fullName || "Applicant";
  const topSkills = skills.slice(0, 3).join(", ");
  const latestRole = experience[0];

  const paragraphs = [
    `Dear Hiring Manager,`,
    `I am writing to express my interest in the ${role || "open"} position at ${company || "your company"}. With a background in ${p.headline || "my field"}${topSkills ? ` and hands-on experience with ${topSkills}` : ""}, I am confident I can contribute meaningfully to your team.`,
    latestRole
      ? `In my current role as ${latestRole.role}${latestRole.company ? ` at ${latestRole.company}` : ""}, I have ${latestRole.description || "delivered strong results and grown my skills"}.`
      : `Throughout my career, I have consistently focused on delivering high-quality work and growing my skill set.`,
    `I would welcome the opportunity to discuss how my experience aligns with your team's goals. Thank you for considering my application.`,
    `Sincerely,\n${name}`,
  ];

  return paragraphs.join("\n\n");
}
