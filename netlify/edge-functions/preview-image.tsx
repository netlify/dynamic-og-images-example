import type { Config, Context } from "@netlify/edge-functions";
import { ImageResponse } from "https://deno.land/x/og_edge/mod.ts";
import React from "https://esm.sh/react@18.2.0";
import { Logo } from "./assets/Logo.tsx";
import { BackgroundImage } from "./assets/BackgroundImage.tsx";

const FONTS = [
  {
    name: "Pacaembu",
    weight: 700,
    style: "normal",
    filePath: "pacaembu/PacaembuNetlify-Bold.woff",
  },
  {
    name: "Pacaembu",
    weight: 300,
    style: "normal",
    filePath: "pacaembu/PacaembuNetlify-Medium.woff",
  },
];

const STYLES = {
  wrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#000000",
    color: "#ffffff",
    fontFamily: "Pacaembu",
  },
  title: {
    padding: "0 48px",
    marginTop: "164px",
    fontSize: 80,
    fontWeight: 700,
  },
  description: {
    padding: "0 48px",
    marginTop: "36px",
    lineHeight: 1.35,
    fontSize: 36,
    fontWeight: 300,
  },
};

async function loadFonts(origin: string) {
  return await Promise.all(
    FONTS.map(async (font) => {
      const { name, weight, style, filePath } = font;
      const url = [origin, "fonts", filePath].join("/");
      const fontFileResponse = await fetch(url);
      const data = await fontFileResponse.arrayBuffer();
      return { name, weight, style, data };
    })
  );
}

async function getPageFromSitemap(slug: string, origin: string) {
  const sitemapDataResponse = await fetch(origin + "/sitemap-data.json");
  const sitemapData = await sitemapDataResponse.json();
  return sitemapData.find((entry: any) => entry.slug === slug);
}

export default async (request: Request, context: Context) => {
  const { origin } = new URL(request.url);
  const { slug } = context.params;

  const page = await getPageFromSitemap(slug, origin);
  if (!page) return new Response("Not found", { status: 404 });

  const fonts = await loadFonts(origin);

  const image = new ImageResponse(
    (
      <div style={STYLES.wrapper}>
        <BackgroundImage />
        <Logo />
        <div style={STYLES.title}>{page.title}</div>
        <div style={STYLES.description}>{page.description}</div>
      </div>
    ),
    { width: 1200, height: 630, fonts }
  );

  return image;
};

export const config: Config = { path: "/preview-image/:slug" };
