import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://csradrx.live/",
      lastModified: new Date(),
    },
  ];
}
