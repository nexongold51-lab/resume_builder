import type { ResumeContent } from "@/types/resume";

export const SAMPLE_RESUME: ResumeContent = {
  personalInfo: {
    fullName: "Alex Morgan",
    headline: "Senior Product Designer",
    email: "alex.morgan@email.com",
    phone: "+1 555 0100",
    location: "San Francisco, CA",
    website: "alexmorgan.design",
    linkedin: "linkedin.com/in/alexmorgan",
    photoUrl: "",
  },
  summary:
    "Product designer with 8+ years of experience building intuitive, accessible interfaces for consumer and B2B products.",
  skills: ["Figma", "Design Systems", "User Research", "Prototyping", "TypeScript"],
  experience: [
    {
      id: "1",
      company: "Northwind Labs",
      role: "Senior Product Designer",
      location: "Remote",
      startDate: "2021",
      endDate: "",
      current: true,
      description: "Led design for the core platform used by 2M+ monthly active users.",
    },
    {
      id: "2",
      company: "Bluepeak",
      role: "Product Designer",
      location: "San Francisco, CA",
      startDate: "2018",
      endDate: "2021",
      current: false,
      description: "Shipped 20+ features across web and mobile, improving activation by 35%.",
    },
  ],
  education: [
    {
      id: "1",
      school: "University of California, Berkeley",
      degree: "B.A.",
      field: "Cognitive Science",
      startDate: "2014",
      endDate: "2018",
      description: "",
    },
  ],
  projects: [],
  certifications: ["Certified UX Professional"],
  languages: ["English", "Spanish"],
  achievements: ["Speaker at Design+Research Conference 2023"],
  references: [],
};
