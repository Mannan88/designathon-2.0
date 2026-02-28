export const links = {
  social: {
    twitter: "https://x.com/gdgc_ace",
    website: "https://www.gdgcace.in/",
    linkedin:
      "https://www.linkedin.com/company/google-developer-student-club-ace",
    instagram: "https://www.instagram.com/gdgc_ace",
  },
  registration: "https://www.gdgcace.in/",
  downloadGuidelines: "https://www.gdgcace.in/",
  discord: "https://discord.gg/gdgcace",
  gdgcWebsite: "https://www.gdgcace.in/",
} as const;

export type SocialPlatform = keyof typeof links.social;
