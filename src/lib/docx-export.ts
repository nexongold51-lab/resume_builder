import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import type { ResumeContent } from "@/types/resume";

function heading(text: string): Paragraph {
  return new Paragraph({ text, heading: HeadingLevel.HEADING_2, spacing: { before: 200, after: 100 } });
}

export async function buildResumeDocx(content: ResumeContent, isPremium: boolean): Promise<Buffer> {
  const { personalInfo: p } = content;
  const children: Paragraph[] = [];

  if (!isPremium) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: "Created with ResumePro AI -  Free Plan", italics: true, color: "999999" })],
        spacing: { after: 200 },
      })
    );
  }

  children.push(new Paragraph({ text: p.fullName || "Your Name", heading: HeadingLevel.TITLE }));
  if (p.headline) children.push(new Paragraph({ text: p.headline }));
  const contact = [p.email, p.phone, p.location, p.website, p.linkedin].filter(Boolean).join(" | ");
  if (contact) children.push(new Paragraph({ text: contact, spacing: { after: 200 } }));

  if (content.summary) {
    children.push(heading("Summary"));
    children.push(new Paragraph({ text: content.summary }));
  }

  if (content.skills.length > 0) {
    children.push(heading("Skills"));
    children.push(new Paragraph({ text: content.skills.join(", ") }));
  }

  if (content.experience.length > 0) {
    children.push(heading("Experience"));
    for (const exp of content.experience) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: `${exp.role}${exp.company ? ` -${exp.company}` : ""}`, bold: true }),
            new TextRun({ text: `  (${exp.startDate} - ${exp.current ? "Present" : exp.endDate})`, italics: true }),
          ],
        })
      );
      if (exp.description) children.push(new Paragraph({ text: exp.description }));
    }
  }

  if (content.education.length > 0) {
    children.push(heading("Education"));
    for (const edu of content.education) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: `${edu.degree}${edu.field ? ` in ${edu.field}` : ""}`, bold: true }),
            new TextRun({ text: `  ${edu.school}` }),
          ],
        })
      );
    }
  }

  if (content.projects.length > 0) {
    children.push(heading("Projects"));
    for (const proj of content.projects) {
      children.push(new Paragraph({ children: [new TextRun({ text: proj.name, bold: true })] }));
      if (proj.description) children.push(new Paragraph({ text: proj.description }));
    }
  }

  if (content.certifications.length > 0) {
    children.push(heading("Certifications"));
    children.push(new Paragraph({ text: content.certifications.join(", ") }));
  }

  if (content.languages.length > 0) {
    children.push(heading("Languages"));
    children.push(new Paragraph({ text: content.languages.join(", ") }));
  }

  if (content.achievements.length > 0) {
    children.push(heading("Achievements"));
    children.push(new Paragraph({ text: content.achievements.join(", ") }));
  }

  if (content.references.length > 0) {
    children.push(heading("References"));
    for (const ref of content.references) {
      children.push(new Paragraph({ text: `${ref.name}${ref.role ? ` -${ref.role}` : ""}${ref.contact ? ` (${ref.contact})` : ""}` }));
    }
  }

  const doc = new Document({ sections: [{ children }] });
  return Packer.toBuffer(doc);
}
