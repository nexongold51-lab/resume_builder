import { z } from "zod";

export const personalInfoSchema = z.object({
  fullName: z.string().default(""),
  headline: z.string().default(""),
  email: z.string().default(""),
  phone: z.string().default(""),
  location: z.string().default(""),
  website: z.string().default(""),
  linkedin: z.string().default(""),
  photoUrl: z.string().default(""),
});

export const experienceItemSchema = z.object({
  id: z.string(),
  company: z.string().default(""),
  role: z.string().default(""),
  location: z.string().default(""),
  startDate: z.string().default(""),
  endDate: z.string().default(""),
  current: z.boolean().default(false),
  description: z.string().default(""),
});

export const educationItemSchema = z.object({
  id: z.string(),
  school: z.string().default(""),
  degree: z.string().default(""),
  field: z.string().default(""),
  startDate: z.string().default(""),
  endDate: z.string().default(""),
  description: z.string().default(""),
});

export const projectItemSchema = z.object({
  id: z.string(),
  name: z.string().default(""),
  link: z.string().default(""),
  description: z.string().default(""),
});

export const referenceItemSchema = z.object({
  id: z.string(),
  name: z.string().default(""),
  role: z.string().default(""),
  contact: z.string().default(""),
});

export const resumeContentSchema = z.object({
  personalInfo: personalInfoSchema,
  summary: z.string().default(""),
  skills: z.array(z.string()).default([]),
  experience: z.array(experienceItemSchema).default([]),
  education: z.array(educationItemSchema).default([]),
  projects: z.array(projectItemSchema).default([]),
  certifications: z.array(z.string()).default([]),
  languages: z.array(z.string()).default([]),
  achievements: z.array(z.string()).default([]),
  references: z.array(referenceItemSchema).default([]),
});

export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type ExperienceItem = z.infer<typeof experienceItemSchema>;
export type EducationItem = z.infer<typeof educationItemSchema>;
export type ProjectItem = z.infer<typeof projectItemSchema>;
export type ReferenceItem = z.infer<typeof referenceItemSchema>;
export type ResumeContent = z.infer<typeof resumeContentSchema>;

export function emptyResumeContent(): ResumeContent {
  return {
    personalInfo: {
      fullName: "",
      headline: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      linkedin: "",
      photoUrl: "",
    },
    summary: "",
    skills: [],
    experience: [],
    education: [],
    projects: [],
    certifications: [],
    languages: [],
    achievements: [],
    references: [],
  };
}
