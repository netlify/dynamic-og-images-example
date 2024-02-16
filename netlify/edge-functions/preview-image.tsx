import type { Config, Context } from "@netlify/edge-functions";
import { ImageResponse } from "https://deno.land/x/og_edge/mod.ts";
// @ts-ignore
import React from "https://esm.sh/react@18.2.0";
import { NetlifyDevelopersLogo } from "./assets/NetlifyDevelopersLogo.tsx";
import { PreviewBackgroundImage } from "./assets/PreviewBackgroundImage.tsx";

export default async (request: Request, context: Context) => {
  const { collectionType, slug } = context.params;

  const { origin } = new URL(request.url);
  const sitemapDataResponse = await fetch(origin + "/sitemap-data.json");
  const sitemapData = await sitemapDataResponse.json();

  const entry = sitemapData[collectionType]?.find((entry: any) => entry.slug === slug);

  if (!entry) {
    return new Response("Not found", { status: 404 });
  }

  const { title, description, ogImageTitle, ogImageDescription } = entry;

  const boldFontFileResponse = await fetch(new URL(origin + "/fonts/pacaembu/PacaembuNetlify-Bold.woff"));
  const mediumFontFileResponse = await fetch(new URL(origin + "/fonts/pacaembu/PacaembuNetlify-Medium.woff"));
  const pacaembuBold = await boldFontFileResponse.arrayBuffer();
  const pacaembuMedium = await mediumFontFileResponse.arrayBuffer();

  const image = new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", fontFamily: "Pacaembu" }}>
        <PreviewBackgroundImage />
        <NetlifyDevelopersLogo />
        <div
          style={{
            color: "#ffffff",
            padding: "0 48px",
            marginTop: "164px",
            fontSize: 80,
            fontWeight: 700,
          }}
        >
          {ogImageTitle || title}
        </div>
        {(ogImageDescription || description) && (
          <div
            style={{
              color: "#ffffff",
              padding: "0 48px",
              marginTop: "36px",
              lineHeight: 1.35,
              fontSize: 36,
              fontWeight: 300,
            }}
          >
            {ogImageDescription || description}
          </div>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Pacaembu", data: pacaembuBold, weight: 700, style: "normal" },
        { name: "Pacaembu", data: pacaembuMedium, weight: 300, style: "normal" },
      ],
    }
  );

  return image;
};

export const config: Config = {
  path: "/preview-image/:collectionType/:slug",
};
