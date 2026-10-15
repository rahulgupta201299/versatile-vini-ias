/**
 * Article → PDF (Download this Article as PDF).
 * Layout follows the reference: logo + rule, title, date • site, cover, body, related posts,
 * "Source / For personal use only" + footer copyright, "Page x of y" on every page.
 */
import fs from "node:fs/promises";
import path from "node:path";
import React from "react";
import sharp from "sharp";
import { Document, Font, Image, Link, Page, StyleSheet, Text, View, renderToBuffer } from "@react-pdf/renderer";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import type { BlogPost } from "@/types";

/* eslint-disable jsx-a11y/alt-text -- react-pdf <Image> has no alt prop */

const SITE_URL = "https://viniias.com";
const RED = "#FE0034";
const INK = "#1F1F23";
const BODY = "#3F3F46";
const MUTED = "#71717A";
const LINE = "#E4E4E7";

const FONT_DIR = path.join(process.cwd(), "src/lib/pdf-fonts");
Font.register({
  family: "Reddit Sans",
  fonts: [
    { src: path.join(FONT_DIR, "RedditSans-Regular.ttf"), fontWeight: 400 },
    { src: path.join(FONT_DIR, "RedditSans-SemiBold.ttf"), fontWeight: 600 },
    { src: path.join(FONT_DIR, "RedditSans-Bold.ttf"), fontWeight: 700 },
  ],
});
Font.registerHyphenationCallback((word) => [word]); // no mid-word hyphenation

const s = StyleSheet.create({
  page: { paddingTop: 40, paddingBottom: 56, paddingHorizontal: 44, fontFamily: "Reddit Sans", fontSize: 10.5, color: BODY, lineHeight: 1.6 },
  brand: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: 10, borderBottomWidth: 1.5, borderBottomColor: RED, marginBottom: 18 },
  logo: { width: 84, height: 35 },
  brandSite: { fontSize: 9, color: MUTED },
  title: { fontSize: 20, fontWeight: 700, color: INK, lineHeight: 1.35 },
  meta: { marginTop: 6, fontSize: 9, color: MUTED },
  cover: { marginTop: 14, width: "100%", borderRadius: 6 },
  coverFallback: { marginTop: 14, height: 120, borderRadius: 6, backgroundColor: "#13294B", justifyContent: "center", paddingHorizontal: 18 },
  coverFallbackText: { color: "#FFFFFF", fontSize: 26, fontWeight: 700 },
  excerpt: { marginTop: 14, fontSize: 11, color: INK },
  h2: { marginTop: 16, marginBottom: 4, fontSize: 13.5, fontWeight: 700, color: INK },
  p: { marginTop: 6 },
  li: { flexDirection: "row", marginTop: 4, paddingLeft: 4 },
  bullet: { width: 12, color: RED, fontWeight: 700 },
  quote: { marginTop: 10, padding: 10, borderLeftWidth: 3, borderLeftColor: RED, backgroundColor: "#FFF5F7", color: INK, fontWeight: 600 },
  sectionTitle: { marginTop: 20, marginBottom: 6, fontSize: 13.5, fontWeight: 700, color: INK },
  faqQ: { marginTop: 8, fontWeight: 700, color: INK },
  faqA: { marginTop: 2 },
  table: { marginTop: 18, borderWidth: 1, borderColor: LINE },
  tableHead: { padding: 6, backgroundColor: "#FAFAFA", borderBottomWidth: 1, borderBottomColor: LINE, textAlign: "center", fontWeight: 700, fontSize: 9.5, color: INK },
  tableRow: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: LINE },
  tableCell: { flex: 1, padding: 6, textAlign: "center", fontSize: 9, fontWeight: 600, color: RED, textDecoration: "none" },
  endStrong: { fontWeight: 700, color: INK },
  end: { marginTop: 24, paddingTop: 10, borderTopWidth: 1, borderTopColor: LINE, fontSize: 8.5, color: MUTED, lineHeight: 1.7 },
  footer: { position: "absolute", bottom: 24, left: 44, fontSize: 8.5, color: MUTED },
});

/** Public image → PNG/JPEG buffer react-pdf can embed (WebP is converted). */
async function loadImage(publicPath: string) {
  try {
    const file = await fs.readFile(path.join(process.cwd(), "public", publicPath.replace(/^\//, "")));
    if (/\.(png|jpe?g)$/i.test(publicPath)) return file;
    return await sharp(file).jpeg({ quality: 85 }).toBuffer();
  } catch {
    return null;
  }
}

const longDate = (iso: string) => new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "Asia/Kolkata" }).format(new Date(iso));

type Related = Pick<BlogPost, "category" | "slug" | "title">;

export async function renderBlogPdf(post: BlogPost, categoryName: string, related: Related[]) {
  const [logo, cover] = await Promise.all([loadImage("/images/logo.png"), post.cover ? loadImage(post.cover) : Promise.resolve(null)]);
  const url = `${SITE_URL}/exams/${post.category}/${post.slug}`;
  const rows: Related[][] = [];
  for (let i = 0; i < related.length; i += 2) rows.push(related.slice(i, i + 2));

  const doc = (
    <Document title={post.title} author={post.author} subject={post.excerpt} creator="Vini IAS" producer="Vini IAS">
      <Page size="A4" style={s.page}>
        <View style={s.brand}>
          {logo ? <Image src={logo} style={s.logo} /> : <Text style={{ fontSize: 16, fontWeight: 700, color: RED }}>Vini IAS</Text>}
          <Text style={s.brandSite}>viniias.com</Text>
        </View>

        <Text style={s.title}>{post.title}</Text>
        <Text style={s.meta}>
          {longDate(post.publishedAt)} • {post.author} • viniias.com
        </Text>

        {cover ? (
          <Image src={cover} style={s.cover} />
        ) : (
          <View style={s.coverFallback}>
            <Text style={s.coverFallbackText}>{categoryName}</Text>
          </View>
        )}

        {post.content[0]?.type === "p" && post.content[0].text === post.excerpt ? null : <Text style={s.excerpt}>{post.excerpt}</Text>}

        {post.content.map((b, i) => {
          if (b.type === "h2") return <Text key={i} style={s.h2} minPresenceAhead={40}>{b.text}</Text>;
          if (b.type === "ul")
            return (
              <View key={i} style={{ marginTop: 4 }}>
                {b.items.map((it) => (
                  <View key={it} style={s.li} wrap={false}>
                    <Text style={s.bullet}>•</Text>
                    <Text style={{ flex: 1 }}>{it}</Text>
                  </View>
                ))}
              </View>
            );
          if (b.type === "quote") return <Text key={i} style={s.quote} wrap={false}>{b.text}</Text>;
          return <Text key={i} style={s.p}>{b.text}</Text>;
        })}

        {post.faqs.length > 0 && (
          <View>
            <Text style={s.sectionTitle} minPresenceAhead={60}>Frequently Asked Questions</Text>
            {post.faqs.map((f) => (
              <View key={f.q} wrap={false}>
                <Text style={s.faqQ}>{f.q}</Text>
                <Text style={s.faqA}>{f.a}</Text>
              </View>
            ))}
          </View>
        )}

        {rows.length > 0 && (
          <View style={s.table} wrap={false}>
            <Text style={s.tableHead}>Other Related Posts</Text>
            {rows.map((row, i) => (
              <View key={i} style={[s.tableRow, i === rows.length - 1 ? { borderBottomWidth: 0 } : {}]}>
                {row.map((r, j) => (
                  <Link key={r.slug} src={`${SITE_URL}/exams/${r.category}/${r.slug}`} style={[s.tableCell, j === 0 && row.length > 1 ? { borderRightWidth: 1, borderRightColor: LINE } : {}]}>
                    {r.title}
                  </Link>
                ))}
              </View>
            ))}
          </View>
        )}

        <View style={s.end} wrap={false}>
          <Text>
            Source: <Link src={url} style={{ color: MUTED }}>{url}</Link>
          </Text>
          <Text style={s.endStrong}>© Vini IAS. For personal use only.</Text>
          <Text style={s.endStrong}>Copyright © Vini Educentre Pvt. LTD. | All rights Reserved.</Text>
        </View>

        <Text style={s.footer} fixed>Vini IAS • viniias.com</Text>
      </Page>
    </Document>
  );
  return addPageNumbers(await renderToBuffer(doc));
}

/** "Page x of y" bottom-right on every page (react-pdf's render-prop numbering doesn't run inside Next's bundle). */
async function addPageNumbers(buffer: Buffer) {
  const pdf = await PDFDocument.load(buffer);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const pages = pdf.getPages();
  pages.forEach((page, i) => {
    const label = `Page ${i + 1} of ${pages.length}`;
    const size = 8.5;
    page.drawText(label, { x: page.getWidth() - 44 - font.widthOfTextAtSize(label, size), y: 33, size, font, color: rgb(0x71 / 255, 0x71 / 255, 0x7a / 255) });
  });
  return Buffer.from(await pdf.save());
}
