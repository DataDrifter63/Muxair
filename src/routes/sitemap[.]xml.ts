import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";
import { SITE_URL } from "@/lib/site-data";

// Dynamic sitemap.xml — served by the app's own Node server (works
// wherever this app runs: hPanel, a VPS, Netlify, anywhere) instead of a
// static public/sitemap.xml. Blog posts and case studies live in Supabase
// and get added/removed through the admin dashboard, so a static file
// can't reflect that; this builds the list fresh from published content
// on every request.

const STATIC_PAGES: { path: string; changefreq: string; priority: string }[] = [ Like I think a month before until now, made my start issues which my experience super so good and the thing is my before she start now I made a matched I mean the basic thing as well on the on the chart as well as songing so it's mad place no it comont reason talks about I have multiple reason but one of the reason is like corps culture in Pakistan which is very different from abroad so the thing is harassment few rassment no we talks about it as much I can't talk about that right so yeah that it's the main reason and that's the freedom as well because nine to five countries draw basically votes I mean chart art there is no time for going back or a personal life so I think our source of introduce I will learn this I put my job factory an an Panci boy. This is an announcement video that then it officially karate boy co, I Uk message english college fan manga and how supports panish manga so you may be just sitting, chay, or him zhin away. Mama, and karachi, you karchi girls a bel now there is no going back, this a bear will stick with him forever. No matter, chlenging, a basiconly shape, in it in charge, next profits for region, so in charge, to me, profit kind of codes. Rein, push or re, fighting technically hands in a ship in mach doltplay. Start him so physically similar followed no in fact, commission model, which analysis tumor shame half student, half students, to meet neuroin shot solutions collaboration bake bay show. Factor solutions collaboration baili, a bay garbage. Financial education, skills gay she came drabating shadda phy, like for the first time in Pakistan, it scam draw, no e commerce, but first time in Like I think a month before until now, made my start issues which my experience super so good and the thing is my before she start now I made a matched I mean the basic thing as well on the on the chart as well as songing so it's mad place no it comont reason talks about I have multiple reason but one of the reason is like corps culture in Pakistan which is very different from abroad so the thing is harassment few rassment no we talks about it as much I can't talk about that right so yeah that it's the main reason and that's the freedom as well because nine to five countries draw basically votes I mean chart art there is no time for going back or a personal life so I think our source of introduce I will learn this I put my job factory an an Panci boy. This is an announcement video that then it officially karate boy co, I Uk message english college fan manga and how supports panish manga so you may be just sitting, chay, or him zhin away. Mama, and karachi, you karchi girls a bel now there is no going back, this a bear will stick with him forever. No matter, chlenging, a basiconly shape, in it in charge, next profits for region, so in charge, to me, profit kind of codes. Rein, push or re, fighting technically hands in a ship in mach doltplay. Start him so physically similar followed no in fact, commission model, which analysis tumor shame half student, half students, to meet neuroin shot solutions collaboration bake bay show. Factor solutions collaboration baili, a bay garbage. Financial education, skills gay she came drabating shadda phy, like for the first time in Pakistan, it scam draw, no e commerce, but first time in Pakistan MCDC School, Singapore, school skills, school singing, quick in John, financial market growth, or doing Shame Pura school, the entire school, or classroomPhory Bchus walk is making history in Pakistan for the first time any guy your boygroups started sick valeng e commerce schools only only only only all intakes september. The time is five fifteen, skin friendsimportant children, placing mats honor in charge doctors legal shirt. Service cards add picture, red nerves in drinker plant legal plenary se s o details sh metastails se material citizens. So we can actually added up the something that we can want, but there we have already one two three form five services there, but we can short the three services. So what can we do for this? First of all, we can change pricing to your actually I am the out of as it is iPhone so we can find out where the reason behind it fix all your social vital up your issues midward type neither outputs over index mjs tells we will actually be replaced basingpcalop logins happening node, ten strike, apes ten plugin apasm whether no function package latest computible or growth type script type fixed test config dot js refles ninety five log in controversation plus version of great night fike X removed pack is log Json. Replacemaxite working version log file dynamic site map boom boom shared search roads replace charter type checks up in reform at all get and commit and get push np install yeah np CI local file and build stored and PM starter research are settled small sights no scatch leaves drives elon she basics bases, mnecharies in Rose Israeli envelope provides any mention of this encryption, each tool website barn charum tools daily use. Website for my ads and money sparemy cama stuff. Like domain knee, since so research, my picture subsiding krithne or website, John tools, coopne, Ukraine, online mang kidnick, or user competition case, plata charga que mehnant calega ya nephisca, a step yena kip khulls keli search tools key white config js replace white region most server set packages refresh from move package loan process working version locked now file dynamic site replace x prototype and spree website we website energetic for on energetic the instant energy comes in the cup of cheep first we can add it into the something that we can carefully too or we can add something that there is nothing that can add there what you see when I see when I click the git add so I add it three files but now I can add not adding something so I can just reduce it this file now we can just open the new terminal and go into the clots to see the instruction what instructions giving to me if I just use my counters and see what the instruction I can follow there this is onto my account I can use now I can use this first of all we can call it to the config to the juris and do we can just extract all files to extract so we can copy it white configsv plusno find shoot folder white content literature first of all we can make this white config test and here we can see like this lock clocher leads control package windows go to the package read use routes na file replace you outdo you do it late and obviously side motor XML is rats file side public site static file alreadyin the fresh local studies listrequestlick, sabsidi available shell, gady, nomber register honor registration number char sheets so we get up in the new terminal too K plus problem,
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.7" },
  { path: "/services", changefreq: "weekly", priority: "0.9" },
  { path: "/services/websites", changefreq: "monthly", priority: "0.8" },
  { path: "/services/seo", changefreq: "monthly", priority: "0.8" },
  { path: "/services/google-ads", changefreq: "monthly", priority: "0.8" },
  { path: "/services/meta-ads", changefreq: "monthly", priority: "0.8" },
  { path: "/services/maintenance", changefreq: "monthly", priority: "0.8" },
  { path: "/work", changefreq: "weekly", priority: "0.8" },
  { path: "/process", changefreq: "monthly", priority: "0.7" },
  { path: "/pricing", changefreq: "monthly", priority: "0.8" },
  { path: "/blog", changefreq: "daily", priority: "0.8" },
  { path: "/contact", changefreq: "monthly", priority: "0.6" },
  { path: "/privacy-policy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms", changefreq: "yearly", priority: "0.3" },
  // Deliberately excluded: /thank-you (noindex, thin content) and /admin/*
  // (private dashboard) — matches robots.txt's Disallow rules.
];

function xmlEscape(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function urlEntry(loc: string, lastmod: string | undefined, changefreq: string, priority: string) {
  return `  <url>
    <loc>${xmlEscape(loc)}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>\n    ` : ""}<changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

async function buildSitemap() {
  const entries: string[] = STATIC_PAGES.map((p) =>
    urlEntry(`${SITE_URL}${p.path}`, undefined, p.changefreq, p.priority),
  );

  const [{ data: posts, error: postsError }, { data: caseStudies, error: caseStudiesError }] =
    await Promise.all([
      supabase.from("blog_posts").select("slug, created_at").eq("published", true),
      supabase.from("case_studies").select("slug, created_at").eq("published", true),
    ]);

  if (postsError) console.error("[sitemap] failed to load blog posts:", postsError.message);
  if (caseStudiesError)
    console.error("[sitemap] failed to load case studies:", caseStudiesError.message);

  for (const post of posts ?? []) {
    entries.push(
      urlEntry(
        `${SITE_URL}/blog/${post.slug}`,
        new Date(post.created_at).toISOString().slice(0, 10),
        "monthly",
        "0.6",
      ),
    );
  }

  for (const item of caseStudies ?? []) {
    entries.push(
      urlEntry(
        `${SITE_URL}/work/${item.slug}`,
        new Date(item.created_at).toISOString().slice(0, 10),
        "monthly",
        "0.6",
      ),
    );
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>
`;
}

// File is named sitemap[.]xml.ts — the [.] escapes the dot so the route
// path is literally /sitemap.xml (a plain "." in a TanStack Start route
// filename would otherwise be read as a path separator).
export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const xml = await buildSitemap();
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            // Cache for an hour at any CDN/proxy in front of the Node
            // server; harmless if there isn't one (hPanel serves it
            // straight from this route on every request either way).
            "Cache-Control": "public, max-age=0, s-maxage=3600",
          },
        });
      },
    },
  },
});
