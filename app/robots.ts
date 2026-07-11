import { MetadataRoute } from "next";
import { headers } from "next/headers";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers();
  const host = headersList.get("host") ?? "";
  const isCustomDomain = host === "www.protezioneciviledipignano.it" || host === "protezioneciviledipignano.it";

  if (isCustomDomain) {
    return {
      rules: { userAgent: "*", allow: "/" },
      sitemap: "https://www.protezioneciviledipignano.it/sitemap.xml",
    };
  }

  return {
    rules: { userAgent: "*", disallow: "/" },
  };
}
