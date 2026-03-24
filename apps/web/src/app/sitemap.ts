import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://csradrx-web.vercel.app/",
      lastModified: new Date(),
    },
  ];
}
