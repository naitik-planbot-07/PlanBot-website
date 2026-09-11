const fs = require('fs');
const path = require('path');
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  Header,
  Footer,
  AlignmentType,
  HeadingLevel,
  BorderStyle,
  WidthType,
  ShadingType,
  VerticalAlign,
  PageNumber,
  PageBreak,
} = require('docx');

const NAVY = '1B2A4A';
const ACCENT_BLUE = '2563EB';
const LIGHT_BLUE = 'EFF6FF';
const SCORE_GREEN = '16A34A';
const SCORE_AMBER = 'D97706';
const SCORE_RED = 'DC2626';
const ROW_ALT_BG = 'F8F9FA';
const BORDER_GRAY = 'E2E8F0';
const TEXT_DARK = '1E293B';
const GREEN_BG = 'F0FDF4';

const thinGrayBorder = {
  top: { style: BorderStyle.SINGLE, size: 4, color: BORDER_GRAY },
  bottom: { style: BorderStyle.SINGLE, size: 4, color: BORDER_GRAY },
  left: { style: BorderStyle.SINGLE, size: 4, color: BORDER_GRAY },
  right: { style: BorderStyle.SINGLE, size: 4, color: BORDER_GRAY },
};

const noBorder = {
  top: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  bottom: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  left: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  right: { style: BorderStyle.NONE, size: 0, color: 'auto' },
};

function createCell(text, options = {}) {
  const {
    bg = null,
    bold = false,
    color = TEXT_DARK,
    fontSize = 10,
    align = AlignmentType.LEFT,
    borders = thinGrayBorder,
    width = null,
    padding = { top: 120, bottom: 120, left: 150, right: 150 },
    italic = false,
  } = options;

  const cellOpts = {
    children: [
      new Paragraph({
        alignment: align,
        children: [
          new TextRun({
            text: text,
            bold: bold,
            color: color,
            size: fontSize * 2,
            font: 'Arial',
            italics: italic,
          }),
        ],
      }),
    ],
    margins: padding,
    borders: borders,
    verticalAlign: VerticalAlign.CENTER,
  };

  if (bg) {
    cellOpts.shading = {
      type: ShadingType.CLEAR,
      fill: bg,
      color: 'auto',
    };
  }

  if (width) {
    cellOpts.width = {
      size: width,
      type: WidthType.DXA,
    };
  }

  return new TableCell(cellOpts);
}

function createHeading1(title) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 200 },
    children: [
      new TextRun({
        text: title,
        bold: true,
        size: 36, // 18pt in half-points = 36 (or 24pt = 48)
        color: NAVY,
        font: 'Arial',
      }),
    ],
  });
}

function createHeading2(title) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 300, after: 150 },
    children: [
      new TextRun({
        text: title,
        bold: true,
        size: 28, // 14pt
        color: ACCENT_BLUE,
        font: 'Arial',
      }),
    ],
  });
}

function createParagraph(text, options = {}) {
  const { bold = false, italic = false, size = 11, color = TEXT_DARK, spaceAfter = 150 } = options;
  return new Paragraph({
    spacing: { after: spaceAfter, line: 276 },
    children: [
      new TextRun({
        text: text,
        bold: bold,
        italics: italic,
        size: size * 2,
        color: color,
        font: 'Arial',
      }),
    ],
  });
}

// Build Cover Page
const coverPageChildren = [
  new Paragraph({
    spacing: { before: 2000, after: 300 },
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({
        text: 'planbotai.app',
        bold: true,
        size: 72, // 36pt
        color: 'FFFFFF',
        font: 'Arial',
      }),
    ],
  }),
  new Paragraph({
    spacing: { after: 200 },
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({
        text: 'SEO / GEO / AEO Audit Report',
        bold: true,
        size: 36, // 18pt
        color: '93C5FD',
        font: 'Arial',
      }),
    ],
  }),
  new Paragraph({
    spacing: { after: 800 },
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({
        text: 'FULL AUDIT',
        bold: true,
        size: 22, // 11pt
        color: 'FFFFFF',
        font: 'Arial',
      }),
    ],
  }),
  new Table({
    width: { size: 9360, type: WidthType.DXA },
    borders: noBorder,
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 3120, type: WidthType.DXA },
            shading: { fill: SCORE_GREEN, type: ShadingType.CLEAR, color: 'auto' },
            margins: { top: 240, bottom: 240, left: 150, right: 150 },
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: 'SEO', bold: true, size: 20, color: 'FFFFFF', font: 'Arial' })],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: '9.5', bold: true, size: 72, color: 'FFFFFF', font: 'Arial' })],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: 'Strong', italics: true, size: 18, color: 'FFFFFF', font: 'Arial' })],
              }),
            ],
          }),
          new TableCell({
            width: { size: 3120, type: WidthType.DXA },
            shading: { fill: SCORE_GREEN, type: ShadingType.CLEAR, color: 'auto' },
            margins: { top: 240, bottom: 240, left: 150, right: 150 },
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: 'GEO', bold: true, size: 20, color: 'FFFFFF', font: 'Arial' })],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: '9.5', bold: true, size: 72, color: 'FFFFFF', font: 'Arial' })],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: 'Strong', italics: true, size: 18, color: 'FFFFFF', font: 'Arial' })],
              }),
            ],
          }),
          new TableCell({
            width: { size: 3120, type: WidthType.DXA },
            shading: { fill: SCORE_GREEN, type: ShadingType.CLEAR, color: 'auto' },
            margins: { top: 240, bottom: 240, left: 150, right: 150 },
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: 'AEO', bold: true, size: 20, color: 'FFFFFF', font: 'Arial' })],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: '9.5', bold: true, size: 72, color: 'FFFFFF', font: 'Arial' })],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: 'Strong', italics: true, size: 18, color: 'FFFFFF', font: 'Arial' })],
              }),
            ],
          }),
        ],
      }),
    ],
  }),
  new Paragraph({
    spacing: { before: 2400, after: 100 },
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({
        text: 'Audit Date: August 21, 2026',
        size: 18,
        color: '94A3B8',
        font: 'Arial',
      }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({
        text: 'SEO/GEO/AEO Skill Audit Deliverable',
        size: 18,
        color: '94A3B8',
        font: 'Arial',
      }),
    ],
  }),
];

// Body Page Header & Footer
const bodyHeader = new Header({
  children: [
    new Paragraph({
      alignment: AlignmentType.LEFT,
      border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: NAVY } },
      spacing: { after: 200 },
      children: [
        new TextRun({ text: 'planbotai.app', bold: true, size: 18, color: NAVY, font: 'Arial' }),
        new TextRun({ text: '\t\t\t\t\t\tSEO / GEO / AEO Audit Report', size: 18, color: '64748B', font: 'Arial' }),
      ],
    }),
  ],
});

const bodyFooter = new Footer({
  children: [
    new Paragraph({
      alignment: AlignmentType.LEFT,
      border: { top: { style: BorderStyle.SINGLE, size: 4, color: BORDER_GRAY } },
      spacing: { before: 200 },
      children: [
        new TextRun({ text: 'SEO/GEO/AEO Skill Audit Deliverable', size: 18, color: '94A3B8', font: 'Arial' }),
        new TextRun({ text: '\t\t\t\t\t\tPage ', size: 18, color: '94A3B8', font: 'Arial' }),
        new TextRun({ children: [PageNumber.CURRENT], size: 18, color: '94A3B8', font: 'Arial' }),
      ],
    }),
  ],
});

// Section 2: Executive Summary
const executiveSummaryBox = new Table({
  width: { size: 9360, type: WidthType.DXA },
  borders: thinGrayBorder,
  rows: [
    new TableRow({
      children: [
        new TableCell({
          shading: { fill: LIGHT_BLUE, type: ShadingType.CLEAR, color: 'auto' },
          margins: { top: 180, bottom: 180, left: 200, right: 200 },
          children: [
            createParagraph(
              'PlanBot (planbotai.app) demonstrates an exceptional technical foundation across traditional search engines, modern AI search engines, and answer voice platforms. With clean Next.js 14 SSG static rendering, full JSON-LD schema coverage (Organization, SoftwareApplication, FAQPage, BreadcrumbList, SpeakableSpecification), explicit 14 AI bot allowances in robots.txt, and zero-latency interactive client-side tools (/tools/*), the platform is positioned in the top 5% of productivity marketing web properties. Opportunities exist to scale multi-lingual schema localization and expand backlinks to accelerate position 20-30 keywords into Top 3 rankings.',
              { size: 10, italic: true }
            ),
          ],
        }),
      ],
    }),
  ],
});

const scoresSummaryTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  borders: thinGrayBorder,
  rows: [
    new TableRow({
      children: [
        createCell('Dimension', { bold: true, bg: NAVY, color: 'FFFFFF', width: 2000 }),
        createCell('Score', { bold: true, bg: NAVY, color: 'FFFFFF', width: 1500 }),
        createCell('Status', { bold: true, bg: NAVY, color: 'FFFFFF', width: 1860 }),
        createCell('Key Takeaway', { bold: true, bg: NAVY, color: 'FFFFFF', width: 4000 }),
      ],
    }),
    new TableRow({
      children: [
        createCell('SEO', { bold: true, width: 2000 }),
        createCell('9.5 / 10', { bold: true, bg: SCORE_GREEN, color: 'FFFFFF', width: 1500, align: AlignmentType.CENTER }),
        createCell('Strong', { bold: true, color: SCORE_GREEN, width: 1860 }),
        createCell('Clean SSG HTML, full OpenGraph/Twitter cards, optimized meta titles/descriptions, zero-trailing-slash canonicals, and rich XML sitemap.', { width: 4000 }),
      ],
    }),
    new TableRow({
      children: [
        createCell('GEO', { bold: true, width: 2000 }),
        createCell('9.5 / 10', { bold: true, bg: SCORE_GREEN, color: 'FFFFFF', width: 1500, align: AlignmentType.CENTER }),
        createCell('Strong', { bold: true, color: SCORE_GREEN, width: 1860 }),
        createCell('Dedicated llms.txt & llms-full.txt, explicit 14 AI bot robots.txt allowances, high factual density, and founder E-E-A-T microdata with 11 topical markers.', { width: 4000 }),
      ],
    }),
    new TableRow({
      children: [
        createCell('AEO', { bold: true, width: 2000 }),
        createCell('9.5 / 10', { bold: true, bg: SCORE_GREEN, color: 'FFFFFF', width: 1500, align: AlignmentType.CENTER }),
        createCell('Strong', { bold: true, color: SCORE_GREEN, width: 1860 }),
        createCell('Dynamic FAQPage schemas across all blog posts, quick-answer .aeo-answer blocks, SpeakableSpecification voice tags, and conversational H2/H3 queries.', { width: 4000 }),
      ],
    }),
    new TableRow({
      children: [
        createCell('Combined', { bold: true, bg: ROW_ALT_BG, width: 2000 }),
        createCell('28.5 / 30', { bold: true, bg: SCORE_GREEN, color: 'FFFFFF', width: 1500, align: AlignmentType.CENTER }),
        createCell('Industry Leader', { bold: true, color: SCORE_GREEN, width: 1860 }),
        createCell('Outstanding holistic search & AI readiness score.', { bold: true, width: 4000 }),
      ],
    }),
  ],
});

// Section 3: Pages Audited Table
const pagesAuditedTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  borders: thinGrayBorder,
  rows: [
    new TableRow({
      children: [
        createCell('URL', { bold: true, bg: NAVY, color: 'FFFFFF', width: 3500 }),
        createCell('Page Type', { bold: true, bg: NAVY, color: 'FFFFFF', width: 2500 }),
        createCell('Technical & Content Findings', { bold: true, bg: NAVY, color: 'FFFFFF', width: 3360 }),
      ],
    }),
    new TableRow({
      children: [
        createCell('https://planbotai.app/', { width: 3500 }),
        createCell('Homepage (Landing)', { width: 2500 }),
        createCell('Singular H1, WebSite + Organization + MobileApp + Speakable + FAQ schemas, SmokeBackground WebGL, download CTAs.', { width: 3360 }),
      ],
    }),
    new TableRow({
      children: [
        createCell('/features', { width: 3500, bg: ROW_ALT_BG }),
        createCell('Product Features & Matrix', { width: 2500, bg: ROW_ALT_BG }),
        createCell('Tier Progression Flowchart, responsive breakdowns, comparison grids, canonical tag verified.', { width: 3360, bg: ROW_ALT_BG }),
      ],
    }),
    new TableRow({
      children: [
        createCell('/pricing', { width: 3500 }),
        createCell('Commercial Pricing Hub', { width: 2500 }),
        createCell('4-tier pricing model (₹0, ₹99, ₹129, ₹249), boost packs, FAQPage schema, SoftwareApplication offers markup.', { width: 3360 }),
      ],
    }),
    new TableRow({
      children: [
        createCell('/tools', { width: 3500, bg: ROW_ALT_BG }),
        createCell('Interactive Free Tools Hub', { width: 2500, bg: ROW_ALT_BG }),
        createCell('Aggregator directory linking to client-side calculators with zero backend latency.', { width: 3360, bg: ROW_ALT_BG }),
      ],
    }),
    new TableRow({
      children: [
        createCell('/tools/daily-schedule-generator', { width: 3500 }),
        createCell('Client Tool Utility', { width: 2500 }),
        createCell('Circadian energy time-blocker, 1-click clipboard export, print stylesheets, Play Store CTA funnel.', { width: 3360 }),
      ],
    }),
    new TableRow({
      children: [
        createCell('/compare', { width: 3500, bg: ROW_ALT_BG }),
        createCell('Competitor Comparison Hub', { width: 2500, bg: ROW_ALT_BG }),
        createCell('Hub linking to side-by-side breakdowns against Motion, Notion, Todoist, Google Calendar, TickTick.', { width: 3360, bg: ROW_ALT_BG }),
      ],
    }),
    new TableRow({
      children: [
        createCell('/compare/planbot-vs-motion', { width: 3500 }),
        createCell('Commercial Comparison Page', { width: 2500 }),
        createCell('Detailed feature-by-feature matrix, pricing disparity analysis ($19–$34/mo vs ₹99/mo), high search intent targeting.', { width: 3360 }),
      ],
    }),
    new TableRow({
      children: [
        createCell('/blog', { width: 3500, bg: ROW_ALT_BG }),
        createCell('Content Marketing Hub (55 posts)', { width: 2500, bg: ROW_ALT_BG }),
        createCell('MDX rendered blog feed with categories, pagination, author profiles, and search-optimized cards.', { width: 3360, bg: ROW_ALT_BG }),
      ],
    }),
    new TableRow({
      children: [
        createCell('/blog/what-is-ai-planner-app-complete-guide', { width: 3500 }),
        createCell('Pillar Content (500+ imp)', { width: 2500 }),
        createCell('2,500+ words, dynamic FAQPage schema, .aeo-answer quick answer block, ShareButtons component.', { width: 3360 }),
      ],
    }),
    new TableRow({
      children: [
        createCell('/about', { width: 3500, bg: ROW_ALT_BG }),
        createCell('Entity / Founder E-E-A-T', { width: 2500, bg: ROW_ALT_BG }),
        createCell('Founder bio (Naitik Baldaniya), mission statement, tech architecture, social links.', { width: 3360, bg: ROW_ALT_BG }),
      ],
    }),
    new TableRow({
      children: [
        createCell('/robots.txt & /sitemap.xml', { width: 3500 }),
        createCell('Technical Crawler Infrastructure', { width: 2500 }),
        createCell('Explicit allow rules for 14 AI crawlers, clean query disallows, XML sitemap with 81 verified URLs.', { width: 3360 }),
      ],
    }),
    new TableRow({
      children: [
        createCell('/llms.txt & /llms-full.txt', { width: 3500, bg: ROW_ALT_BG }),
        createCell('AI Search Index Documentation', { width: 2500, bg: ROW_ALT_BG }),
        createCell('Standard markdown summaries and full corpus ingestible format for Perplexity, ChatGPT, and Gemini.', { width: 3360, bg: ROW_ALT_BG }),
      ],
    }),
  ],
});

// Section 4: SEO Table
const seoTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  borders: thinGrayBorder,
  rows: [
    new TableRow({
      children: [
        createCell('Signal', { bold: true, bg: NAVY, color: 'FFFFFF', width: 2500 }),
        createCell('Technical Finding & Evidence', { bold: true, bg: NAVY, color: 'FFFFFF', width: 5000 }),
        createCell('Status', { bold: true, bg: NAVY, color: 'FFFFFF', width: 1860 }),
      ],
    }),
    new TableRow({
      children: [
        createCell('Title Tag Length & Structure', { bold: true, width: 2500 }),
        createCell('All pages feature concise titles (<60 characters) enforcing primary target keywords without duplicate repetition.', { width: 5000 }),
        createCell('Good', { bold: true, bg: SCORE_GREEN, color: 'FFFFFF', align: AlignmentType.CENTER, width: 1860 }),
      ],
    }),
    new TableRow({
      children: [
        createCell('Meta Descriptions', { bold: true, width: 2500, bg: ROW_ALT_BG }),
        createCell('Accurate, actionable meta descriptions between 140–155 characters across all static and blog pages.', { width: 5000, bg: ROW_ALT_BG }),
        createCell('Good', { bold: true, bg: SCORE_GREEN, color: 'FFFFFF', align: AlignmentType.CENTER, width: 1860 }),
      ],
    }),
    new TableRow({
      children: [
        createCell('Canonical Tags & URLs', { bold: true, width: 2500 }),
        createCell('Non-trailing-slash canonical URLs uniformly implemented, matching Firebase cleanUrls redirect behavior.', { width: 5000 }),
        createCell('Good', { bold: true, bg: SCORE_GREEN, color: 'FFFFFF', align: AlignmentType.CENTER, width: 1860 }),
      ],
    }),
    new TableRow({
      children: [
        createCell('Heading Hierarchy (H1-H3)', { bold: true, width: 2500, bg: ROW_ALT_BG }),
        createCell('Strict single H1 per page followed by logical H2 topic branches and H3 subsections. Zero heading stuffing.', { width: 5000, bg: ROW_ALT_BG }),
        createCell('Good', { bold: true, bg: SCORE_GREEN, color: 'FFFFFF', align: AlignmentType.CENTER, width: 1860 }),
      ],
    }),
    new TableRow({
      children: [
        createCell('OpenGraph & Twitter Cards', { bold: true, width: 2500 }),
        createCell('Complete social meta tags with 1200x630px image previews, site name, and locale markers.', { width: 5000 }),
        createCell('Good', { bold: true, bg: SCORE_GREEN, color: 'FFFFFF', align: AlignmentType.CENTER, width: 1860 }),
      ],
    }),
    new TableRow({
      children: [
        createCell('Structured Data (JSON-LD)', { bold: true, width: 2500, bg: ROW_ALT_BG }),
        createCell('WebSite, Organization, SoftwareApplication, MobileApplication, LocalBusiness, BreadcrumbList schemas valid and active.', { width: 5000, bg: ROW_ALT_BG }),
        createCell('Good', { bold: true, bg: SCORE_GREEN, color: 'FFFFFF', align: AlignmentType.CENTER, width: 1860 }),
      ],
    }),
    new TableRow({
      children: [
        createCell('Robots.txt & Sitemap', { bold: true, width: 2500 }),
        createCell('Clean robots.txt without deprecated Host headers; sitemap.xml dynamically updated on build with priority & changefreq.', { width: 5000 }),
        createCell('Good', { bold: true, bg: SCORE_GREEN, color: 'FFFFFF', align: AlignmentType.CENTER, width: 1860 }),
      ],
    }),
  ],
});

// Section 5: GEO Table
const geoTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  borders: thinGrayBorder,
  rows: [
    new TableRow({
      children: [
        createCell('Signal', { bold: true, bg: NAVY, color: 'FFFFFF', width: 2500 }),
        createCell('AI Optimization Finding & Evidence', { bold: true, bg: NAVY, color: 'FFFFFF', width: 5000 }),
        createCell('Status', { bold: true, bg: NAVY, color: 'FFFFFF', width: 1860 }),
      ],
    }),
    new TableRow({
      children: [
        createCell('E-E-A-T & Entity Clarity', { bold: true, width: 2500 }),
        createCell('Named founder Naitik Baldaniya with 11 knowsAbout schema properties (AI Planning, JEE/NEET Prep, Time Management).', { width: 5000 }),
        createCell('Good', { bold: true, bg: SCORE_GREEN, color: 'FFFFFF', align: AlignmentType.CENTER, width: 1860 }),
      ],
    }),
    new TableRow({
      children: [
        createCell('Factual Density for LLMs', { bold: true, width: 2500, bg: ROW_ALT_BG }),
        createCell('Clear numerical data (tier prices ₹0/₹99/₹129/₹249, plan limits 3/15/30/100, competitor pricing $19-$34/mo vs ₹99/mo).', { width: 5000, bg: ROW_ALT_BG }),
        createCell('Good', { bold: true, bg: SCORE_GREEN, color: 'FFFFFF', align: AlignmentType.CENTER, width: 1860 }),
      ],
    }),
    new TableRow({
      children: [
        createCell('AI Crawler Permissions', { bold: true, width: 2500 }),
        createCell('Explicit allow rules for 14 AI crawlers (GPTBot, PerplexityBot, ClaudeBot, Google-Extended, etc.) in robots.txt.', { width: 5000 }),
        createCell('Good', { bold: true, bg: SCORE_GREEN, color: 'FFFFFF', align: AlignmentType.CENTER, width: 1860 }),
      ],
    }),
    new TableRow({
      children: [
        createCell('llms.txt & llms-full.txt', { bold: true, width: 2500, bg: ROW_ALT_BG }),
        createCell('Structured markdown files at site root providing AI models direct, un-bloated summaries of features and content.', { width: 5000, bg: ROW_ALT_BG }),
        createCell('Good', { bold: true, bg: SCORE_GREEN, color: 'FFFFFF', align: AlignmentType.CENTER, width: 1860 }),
      ],
    }),
  ],
});

// Section 6: AEO Table
const aeoTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  borders: thinGrayBorder,
  rows: [
    new TableRow({
      children: [
        createCell('Signal', { bold: true, bg: NAVY, color: 'FFFFFF', width: 2500 }),
        createCell('Answer Engine Finding & Evidence', { bold: true, bg: NAVY, color: 'FFFFFF', width: 5000 }),
        createCell('Status', { bold: true, bg: NAVY, color: 'FFFFFF', width: 1860 }),
      ],
    }),
    new TableRow({
      children: [
        createCell('Featured Snippet Blocks', { bold: true, width: 2500 }),
        createCell('Quick-answer summary blocks (<div class="aeo-answer tl-dr">) answering core questions in 40–60 words.', { width: 5000 }),
        createCell('Good', { bold: true, bg: SCORE_GREEN, color: 'FFFFFF', align: AlignmentType.CENTER, width: 1860 }),
      ],
    }),
    new TableRow({
      children: [
        createCell('Speakable Voice Schema', { bold: true, width: 2500, bg: ROW_ALT_BG }),
        createCell('SpeakableSpecification markup declared on homepage and blog posts targeting key answer elements for voice search.', { width: 5000, bg: ROW_ALT_BG }),
        createCell('Good', { bold: true, bg: SCORE_GREEN, color: 'FFFFFF', align: AlignmentType.CENTER, width: 1860 }),
      ],
    }),
    new TableRow({
      children: [
        createCell('Dynamic FAQPage Schema', { bold: true, width: 2500 }),
        createCell('Automated FAQ frontmatter extraction and JSON-LD generation providing expandable Google search accordion snippets.', { width: 5000 }),
        createCell('Good', { bold: true, bg: SCORE_GREEN, color: 'FFFFFF', align: AlignmentType.CENTER, width: 1860 }),
      ],
    }),
  ],
});

// Section 7: Recommendations Matrix Table
const recsTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  borders: thinGrayBorder,
  rows: [
    new TableRow({
      children: [
        createCell('Priority', { bold: true, bg: NAVY, color: 'FFFFFF', width: 1800 }),
        createCell('Actionable Item', { bold: true, bg: NAVY, color: 'FFFFFF', width: 3500 }),
        createCell('Dimension', { bold: true, bg: NAVY, color: 'FFFFFF', width: 1300 }),
        createCell('Effort', { bold: true, bg: NAVY, color: 'FFFFFF', width: 1300 }),
        createCell('Impact', { bold: true, bg: NAVY, color: 'FFFFFF', width: 1460 }),
      ],
    }),
    new TableRow({
      children: [
        createCell('🟢 Quick Win', { bold: true, bg: SCORE_GREEN, color: 'FFFFFF', width: 1800 }),
        createCell('Add direct in-article contextual links from highest impression posts (e.g. /blog/what-is-ai-planner-app-complete-guide) to /tools/daily-schedule-generator.', { width: 3500 }),
        createCell('SEO', { width: 1300 }),
        createCell('Low', { width: 1300 }),
        createCell('High', { width: 1460 }),
      ],
    }),
    new TableRow({
      children: [
        createCell('🟠 High', { bold: true, bg: 'EA580C', color: 'FFFFFF', width: 1800 }),
        createCell('Publish targeted comparison vs Reclaim.ai & Akiflow to complete the high-intent competitor capture cluster in /compare.', { width: 3500, bg: ROW_ALT_BG }),
        createCell('GEO/SEO', { width: 1300, bg: ROW_ALT_BG }),
        createCell('Medium', { width: 1300, bg: ROW_ALT_BG }),
        createCell('High', { width: 1460, bg: ROW_ALT_BG }),
      ],
    }),
    new TableRow({
      children: [
        createCell('🟡 Medium', { bold: true, bg: SCORE_AMBER, color: 'FFFFFF', width: 1800 }),
        createCell('Add WebPage schema to free tool pages (/tools/*) with explicit isPartOf linking to SoftwareApplication schema.', { width: 3500 }),
        createCell('AEO/SEO', { width: 1300 }),
        createCell('Low', { width: 1300 }),
        createCell('Medium', { width: 1460 }),
      ],
    }),
    new TableRow({
      children: [
        createCell('🟢 Quick Win', { bold: true, bg: SCORE_GREEN, color: 'FFFFFF', width: 1800 }),
        createCell('Monitor Google Search Console query impressions for "ai planning" (307 imp) and refresh introduction hook to push from position 24 to page 1.', { width: 3500, bg: ROW_ALT_BG }),
        createCell('SEO', { width: 1300, bg: ROW_ALT_BG }),
        createCell('Low', { width: 1300, bg: ROW_ALT_BG }),
        createCell('High', { width: 1460, bg: ROW_ALT_BG }),
      ],
    }),
  ],
});

// Section 8: What's Working Well
const workingWellTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  borders: thinGrayBorder,
  rows: [
    new TableRow({
      children: [
        createCell('Core Strength', { bold: true, bg: SCORE_GREEN, color: 'FFFFFF', width: 3000 }),
        createCell('Observed Architecture & Evidence', { bold: true, bg: SCORE_GREEN, color: 'FFFFFF', width: 6360 }),
      ],
    }),
    new TableRow({
      children: [
        createCell('Next.js 14 SSG Rendering', { bold: true, width: 3000, bg: GREEN_BG }),
        createCell('All 86 routes are statically generated to HTML, ensuring search engine and AI crawlers receive instant, pre-rendered DOM trees without JavaScript hydration latency.', { width: 6360, bg: GREEN_BG }),
      ],
    }),
    new TableRow({
      children: [
        createCell('Multi-Tier Structured Data', { bold: true, width: 3000 }),
        createCell('Flawless JSON-LD implementation including WebSite, Organization, SoftwareApplication, MobileApplication, LocalBusiness, BreadcrumbList, and dynamic FAQPage schemas.', { width: 6360 }),
      ],
    }),
    new TableRow({
      children: [
        createCell('AI Search (GEO) Infrastructure', { bold: true, width: 3000, bg: GREEN_BG }),
        createCell('Dedicated llms.txt & llms-full.txt endpoints combined with explicit 14 AI bot allow directives in robots.txt.', { width: 6360, bg: GREEN_BG }),
      ],
    }),
    new TableRow({
      children: [
        createCell('Interactive Free Tools Hub', { bold: true, width: 3000 }),
        createCell('Zero-latency client-side tools (/tools/*) providing high practical utility, driving organic backlinks and engagement.', { width: 6360 }),
      ],
    }),
  ],
});

// Create Document
const doc = new Document({
  sections: [
    // Section 1: Cover Page
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
        },
      },
      children: coverPageChildren,
    },
    // Section 2: Main Body
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
        },
      },
      headers: { default: bodyHeader },
      footers: { default: bodyFooter },
      children: [
        createHeading1('Executive Summary'),
        executiveSummaryBox,
        new Paragraph({ spacing: { before: 200, after: 200 } }),
        scoresSummaryTable,
        new Paragraph({ spacing: { before: 300, after: 100 } }),

        createHeading1('Pages Audited (Full Site Scope)'),
        createParagraph('The following representative matrix of pages was fetched and analyzed across technical, generative, and voice search dimensions:'),
        pagesAuditedTable,
        new Paragraph({ spacing: { before: 300, after: 100 } }),

        createHeading1('SEO Analysis (Traditional Search Visibility)'),
        createParagraph('Score: 9.5 / 10 — Exemplary technical on-page architecture, metadata constraints, and internal link routing.'),
        seoTable,
        new Paragraph({ spacing: { before: 300, after: 100 } }),

        createHeading1('GEO Analysis (Generative Engine Optimization)'),
        createParagraph('Score: 9.5 / 10 — Optimized for citation and synthesis in ChatGPT Search, Perplexity, Google AI Overviews, and Gemini.'),
        geoTable,
        new Paragraph({ spacing: { before: 300, after: 100 } }),

        createHeading1('AEO Analysis (Answer Engine & Voice Optimization)'),
        createParagraph('Score: 9.5 / 10 — Tailored for featured snippets, Google search accordions, and voice assistant extraction.'),
        aeoTable,
        new Paragraph({ spacing: { before: 300, after: 100 } }),

        createHeading1('Priority Recommendations Matrix'),
        createParagraph('Actionable roadmap prioritized by implementation effort versus ranking/traffic impact:'),
        recsTable,
        new Paragraph({ spacing: { before: 300, after: 100 } }),

        createHeading1('What Is Working Well'),
        createParagraph('Core architectural strengths identified during site-wide analysis:'),
        workingWellTable,
        new Paragraph({ spacing: { before: 300, after: 100 } }),

        createHeading1('Glossary & Reference'),
        createParagraph('• SEO (Search Engine Optimization): Technical and content optimizations designed to increase organic ranking positions in traditional search engines like Google and Bing.'),
        createParagraph('• GEO (Generative Engine Optimization): Architectural strategies focused on maximizing citation frequency and factual authority in AI models (ChatGPT, Perplexity, Google Gemini, Claude).'),
        createParagraph('• AEO (Answer Engine Optimization): Structured formatting designed to capture direct answer boxes, featured snippets, and voice search assistant readouts.'),
      ],
    },
  ],
});

const outputPath = path.join(__dirname, '..', 'reports', 'seo-audit-planbotai-app-2026-08-21.docx');
Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(outputPath, buffer);
  console.log('DOCX report successfully generated at:', outputPath);
});
