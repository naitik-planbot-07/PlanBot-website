import sys
from fpdf import FPDF
from fpdf.enums import XPos, YPos

class AuditPDF(FPDF):
    def header(self):
        if self.page_no() > 1:
            self.set_font("Helvetica", "B", 9)
            self.set_text_color(27, 42, 74) # Navy #1B2A4A
            self.cell(90, 8, "planbotai.app", align="L", new_x=XPos.RIGHT, new_y=YPos.TOP)
            self.set_font("Helvetica", "", 9)
            self.set_text_color(100, 116, 139)
            self.cell(90, 8, "SEO / GEO / AEO Audit Report", align="R", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
            self.ln(2)
            self.set_draw_color(27, 42, 74)
            self.set_line_width(0.5)
            self.line(10, self.get_y(), 200, self.get_y())
            self.ln(4)

    def footer(self):
        if self.page_no() > 1:
            self.set_y(-15)
            self.set_draw_color(226, 232, 240)
            self.set_line_width(0.3)
            self.line(10, self.get_y(), 200, self.get_y())
            self.ln(2)
            self.set_font("Helvetica", "", 8)
            self.set_text_color(148, 163, 184)
            self.cell(90, 8, "SEO/GEO/AEO Skill Audit Deliverable", align="L", new_x=XPos.RIGHT, new_y=YPos.TOP)
            self.cell(90, 8, f"Page {self.page_no()}", align="R", new_x=XPos.LMARGIN, new_y=YPos.NEXT)

def generate_pdf():
    pdf = AuditPDF(orientation="P", unit="mm", format="A4")
    pdf.set_auto_page_break(auto=True, margin=20)
    
    # ---------------- PAGE 1: COVER ----------------
    pdf.add_page()
    
    # Navy background rectangle
    pdf.set_fill_color(27, 42, 74) # #1B2A4A
    pdf.rect(0, 0, 210, 297, "F")
    
    pdf.set_y(50)
    pdf.set_font("Helvetica", "B", 30)
    pdf.set_text_color(255, 255, 255)
    pdf.cell(190, 15, "planbotai.app", align="C", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    
    pdf.set_font("Helvetica", "B", 16)
    pdf.set_text_color(147, 197, 253) # Light Blue
    pdf.cell(190, 10, "SEO / GEO / AEO Audit Report", align="C", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    
    pdf.set_font("Helvetica", "B", 11)
    pdf.set_text_color(255, 255, 255)
    pdf.cell(190, 10, "FULL AUDIT", align="C", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    
    pdf.ln(15)
    
    # Score cards
    card_w = 55
    card_h = 45
    start_x = 22.5
    y_pos = pdf.get_y()
    
    scores = [
        ("SEO", "9.5", "Strong"),
        ("GEO", "9.5", "Strong"),
        ("AEO", "9.5", "Strong")
    ]
    
    for i, (dim, score, status) in enumerate(scores):
        cx = start_x + i * 58
        pdf.set_fill_color(22, 163, 74) # #16A34A Score Green
        pdf.rect(cx, y_pos, card_w, card_h, "F")
        
        pdf.set_xy(cx, y_pos + 6)
        pdf.set_font("Helvetica", "B", 12)
        pdf.set_text_color(255, 255, 255)
        pdf.cell(card_w, 6, dim, align="C", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        
        pdf.set_xy(cx, y_pos + 15)
        pdf.set_font("Helvetica", "B", 24)
        pdf.cell(card_w, 14, score, align="C", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        
        pdf.set_xy(cx, y_pos + 31)
        pdf.set_font("Helvetica", "I", 10)
        pdf.cell(card_w, 6, status, align="C", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        
    pdf.set_xy(10, 240)
    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(148, 163, 184)
    pdf.cell(190, 6, "Audit Date: August 21, 2026", align="C", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    pdf.cell(190, 6, "SEO/GEO/AEO Skill Audit Deliverable", align="C", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    
    # ---------------- PAGE 2: EXECUTIVE SUMMARY & AUDITED PAGES ----------------
    pdf.add_page()
    pdf.set_text_color(27, 42, 74)
    
    pdf.set_font("Helvetica", "B", 16)
    pdf.cell(190, 10, "Executive Summary", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    
    pdf.set_fill_color(239, 246, 255) # Light blue box #EFF6FF
    pdf.set_draw_color(226, 232, 240)
    pdf.set_font("Helvetica", "I", 9.5)
    pdf.set_text_color(30, 41, 59)
    summary_text = (
        "PlanBot (planbotai.app) demonstrates an exceptional technical foundation across traditional search engines, "
        "modern AI search engines, and answer voice platforms. With clean Next.js 14 SSG static rendering, full JSON-LD schema "
        "coverage (Organization, SoftwareApplication, FAQPage, BreadcrumbList, SpeakableSpecification), explicit 14 AI bot allowances "
        "in robots.txt, and zero-latency interactive client-side tools (/tools/*), the platform is positioned in the top 5% of productivity "
        "marketing web properties. Opportunities exist to expand targeted competitor capture matrices and high-relevance backlink acquisition."
    )
    pdf.multi_cell(190, 6, summary_text, border=1, fill=True)
    pdf.ln(4)
    
    # Scores table
    pdf.set_font("Helvetica", "B", 9)
    pdf.set_fill_color(27, 42, 74)
    pdf.set_text_color(255, 255, 255)
    pdf.cell(30, 7, "Dimension", 1, 0, "C", True)
    pdf.cell(25, 7, "Score", 1, 0, "C", True)
    pdf.cell(30, 7, "Status", 1, 0, "C", True)
    pdf.cell(105, 7, "Key Takeaway", 1, 1, "C", True)
    
    rows = [
        ("SEO", "9.5 / 10", "Strong", "Clean SSG HTML, optimized meta titles/desc, zero-trailing-slash canonicals, rich XML sitemap."),
        ("GEO", "9.5 / 10", "Strong", "Dedicated llms.txt & llms-full.txt, 14 AI bot allowances, founder E-E-A-T microdata with 11 markers."),
        ("AEO", "9.5 / 10", "Strong", "Dynamic FAQPage schemas on blog posts, quick-answer .aeo-answer blocks, Speakable voice tags."),
        ("Combined", "28.5 / 30", "Leader", "Exceptional holistic score across traditional search, generative AI engines, and voice answer systems.")
    ]
    
    for dim, score, stat, take in rows:
        pdf.set_font("Helvetica", "B" if dim == "Combined" else "", 8.5)
        pdf.set_text_color(30, 41, 59)
        pdf.cell(30, 7, dim, 1, 0, "L")
        pdf.set_font("Helvetica", "B", 8.5)
        pdf.set_fill_color(22, 163, 74)
        pdf.set_text_color(255, 255, 255)
        pdf.cell(25, 7, score, 1, 0, "C", True)
        pdf.set_text_color(22, 163, 74)
        pdf.cell(30, 7, stat, 1, 0, "C")
        pdf.set_font("Helvetica", "", 8)
        pdf.set_text_color(30, 41, 59)
        pdf.cell(105, 7, take, 1, 1, "L")
        
    pdf.ln(6)
    
    pdf.set_font("Helvetica", "B", 14)
    pdf.set_text_color(27, 42, 74)
    pdf.cell(190, 8, "Pages Audited (Full Site Scope)", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    
    pdf.set_font("Helvetica", "B", 8.5)
    pdf.set_fill_color(27, 42, 74)
    pdf.set_text_color(255, 255, 255)
    pdf.cell(60, 6, "URL", 1, 0, "L", True)
    pdf.cell(45, 6, "Page Type", 1, 0, "L", True)
    pdf.cell(85, 6, "Findings & Detected Architecture", 1, 1, "L", True)
    
    pages = [
        ("https://planbotai.app/", "Homepage (Landing)", "Singular H1, WebSite + Org + MobileApp + Speakable + FAQ schemas."),
        ("/features", "Product Matrix", "Tier Progression Flowchart, responsive breakdowns, comparison table."),
        ("/pricing", "Pricing Hub", "4-tier pricing model (Free, Rs.99, Rs.129, Rs.249), SoftwareApplication offers."),
        ("/tools", "Free Tools Hub", "Hub linking to 3 interactive client-side productivity utilities with zero backend latency."),
        ("/tools/daily-schedule-generator", "Tool Utility", "Circadian energy time-blocker, 1-click clipboard export, print CSS."),
        ("/compare", "Competitor Hub", "Side-by-side matrices vs Motion, Notion, Todoist, Google Calendar, TickTick."),
        ("/compare/planbot-vs-motion", "Comparison Page", "Feature matrix, pricing disparity analysis ($19-$34/mo vs Rs.99/mo)."),
        ("/blog", "Content Hub", "MDX blog directory with 55 search-optimized articles."),
        ("/blog/what-is-ai-planner-...", "Pillar Content", "2,500+ words, dynamic FAQPage schema, .aeo-answer quick answer block."),
        ("/about", "Founder E-E-A-T", "Founder bio (Naitik Baldaniya), mission, tech stack, social profile links."),
        ("/robots.txt & /sitemap.xml", "Crawler Config", "14 AI bots allowed, query param disallows, 81 verified sitemap URLs."),
        ("/llms.txt & /llms-full.txt", "AI Search Index", "Structured summaries and full corpus ingestible format for Perplexity & GPT.")
    ]
    
    for url, ptype, find in pages:
        pdf.set_font("Helvetica", "", 8)
        pdf.set_text_color(30, 41, 59)
        pdf.cell(60, 5.5, url, 1, 0, "L")
        pdf.cell(45, 5.5, ptype, 1, 0, "L")
        pdf.cell(85, 5.5, find, 1, 1, "L")
        
    # ---------------- PAGE 3: DETAILED SIGNAL ANALYSES ----------------
    pdf.add_page()
    
    pdf.set_font("Helvetica", "B", 14)
    pdf.set_text_color(27, 42, 74)
    pdf.cell(190, 8, "SEO Analysis (Score: 9.5 / 10)", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    
    pdf.set_font("Helvetica", "B", 8.5)
    pdf.set_fill_color(27, 42, 74)
    pdf.set_text_color(255, 255, 255)
    pdf.cell(45, 6, "Signal", 1, 0, "L", True)
    pdf.cell(120, 6, "Technical Finding & Evidence", 1, 0, "L", True)
    pdf.cell(25, 6, "Status", 1, 1, "C", True)
    
    seo_signals = [
        ("Title Tag Constraints", "All pages maintain concise titles (<60 chars) targeting primary keywords.", "Good"),
        ("Meta Descriptions", "Actionable descriptions between 140-155 characters across all routes.", "Good"),
        ("Canonical URLs", "Non-trailing-slash canonicals aligned with Firebase cleanUrls redirect logic.", "Good"),
        ("Heading Hierarchy", "Single H1 per page with logical H2/H3 subsections. Zero keyword stuffing.", "Good"),
        ("Social Metadata", "Complete OpenGraph and Twitter cards with 1200x630px high-DPI logo preview.", "Good"),
        ("JSON-LD Schemas", "WebSite, Organization, SoftwareApplication, MobileApp, FAQPage, BreadcrumbList.", "Good")
    ]
    for sig, find, stat in seo_signals:
        pdf.set_font("Helvetica", "B", 8)
        pdf.set_text_color(30, 41, 59)
        pdf.cell(45, 5.5, sig, 1, 0, "L")
        pdf.set_font("Helvetica", "", 8)
        pdf.cell(120, 5.5, find, 1, 0, "L")
        pdf.set_font("Helvetica", "B", 8)
        pdf.set_fill_color(22, 163, 74)
        pdf.set_text_color(255, 255, 255)
        pdf.cell(25, 5.5, stat, 1, 1, "C", True)
        
    pdf.ln(4)
    pdf.set_font("Helvetica", "B", 14)
    pdf.set_text_color(27, 42, 74)
    pdf.cell(190, 8, "GEO Analysis (Score: 9.5 / 10)", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    
    geo_signals = [
        ("E-E-A-T & Entity Clarity", "Named founder Naitik Baldaniya with 11 knowsAbout schema properties.", "Good"),
        ("Factual Density", "Clear numerical data (tier prices Free/Rs.99/Rs.129/Rs.249, plan limits 3/15/30/100).", "Good"),
        ("AI Bot Permissions", "Explicit allow rules for 14 AI crawlers (GPTBot, PerplexityBot, ClaudeBot, etc.).", "Good"),
        ("llms.txt Infrastructure", "Structured summaries and full markdown corpus at /llms.txt and /llms-full.txt.", "Good")
    ]
    for sig, find, stat in geo_signals:
        pdf.set_font("Helvetica", "B", 8)
        pdf.set_text_color(30, 41, 59)
        pdf.cell(45, 5.5, sig, 1, 0, "L")
        pdf.set_font("Helvetica", "", 8)
        pdf.cell(120, 5.5, find, 1, 0, "L")
        pdf.set_font("Helvetica", "B", 8)
        pdf.set_fill_color(22, 163, 74)
        pdf.set_text_color(255, 255, 255)
        pdf.cell(25, 5.5, stat, 1, 1, "C", True)
        
    pdf.ln(4)
    pdf.set_font("Helvetica", "B", 14)
    pdf.set_text_color(27, 42, 74)
    pdf.cell(190, 8, "AEO Analysis (Score: 9.5 / 10)", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    
    aeo_signals = [
        ("Featured Snippet Blocks", "Quick-answer summary blocks (<div class='aeo-answer tl-dr'>) answering queries.", "Good"),
        ("Speakable Voice Schema", "SpeakableSpecification markup targeting key answer elements for voice search.", "Good"),
        ("Dynamic FAQPage Schema", "Automated FAQ frontmatter extraction providing rich Google accordion snippets.", "Good")
    ]
    for sig, find, stat in aeo_signals:
        pdf.set_font("Helvetica", "B", 8)
        pdf.set_text_color(30, 41, 59)
        pdf.cell(45, 5.5, sig, 1, 0, "L")
        pdf.set_font("Helvetica", "", 8)
        pdf.cell(120, 5.5, find, 1, 0, "L")
        pdf.set_font("Helvetica", "B", 8)
        pdf.set_fill_color(22, 163, 74)
        pdf.set_text_color(255, 255, 255)
        pdf.cell(25, 5.5, stat, 1, 1, "C", True)

    # ---------------- PAGE 4: RECOMMENDATIONS & WHAT'S WORKING ----------------
    pdf.add_page()
    
    pdf.set_font("Helvetica", "B", 14)
    pdf.set_text_color(27, 42, 74)
    pdf.cell(190, 8, "Priority Recommendations Matrix", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    
    pdf.set_font("Helvetica", "B", 8.5)
    pdf.set_fill_color(27, 42, 74)
    pdf.set_text_color(255, 255, 255)
    pdf.cell(32, 6, "Priority", 1, 0, "C", True)
    pdf.cell(90, 6, "Actionable Item", 1, 0, "L", True)
    pdf.cell(24, 6, "Dimension", 1, 0, "C", True)
    pdf.cell(22, 6, "Effort", 1, 0, "C", True)
    pdf.cell(22, 6, "Impact", 1, 1, "C", True)
    
    recs = [
        ("Quick Win", (22, 163, 74), "Add direct contextual links from high-impression articles to /tools/*.", "SEO", "Low", "High"),
        ("High", (234, 88, 12), "Add comparison pages for Reclaim.ai & Akiflow to capture comparison traffic.", "GEO/SEO", "Medium", "High"),
        ("Medium", (217, 119, 6), "Add WebPage schema to /tools/* linking to SoftwareApplication.", "AEO/SEO", "Low", "Medium"),
        ("Quick Win", (22, 163, 74), "Optimize introduction hooks for keywords around Position 24 ('ai planning').", "SEO", "Low", "High")
    ]
    for prio, color, item, dim, eff, imp in recs:
        pdf.set_font("Helvetica", "B", 8)
        pdf.set_fill_color(*color)
        pdf.set_text_color(255, 255, 255)
        pdf.cell(32, 6, prio, 1, 0, "C", True)
        pdf.set_font("Helvetica", "", 7.5)
        pdf.set_text_color(30, 41, 59)
        pdf.cell(90, 6, item, 1, 0, "L")
        pdf.cell(24, 6, dim, 1, 0, "C")
        pdf.cell(22, 6, eff, 1, 0, "C")
        pdf.cell(22, 6, imp, 1, 1, "C")
        
    pdf.ln(6)
    pdf.set_font("Helvetica", "B", 14)
    pdf.set_text_color(27, 42, 74)
    pdf.cell(190, 8, "What Is Working Exceptionally Well", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    
    strengths = [
        ("Next.js 14 SSG Static HTML Output", "All 86 routes render instantly to pure static HTML without crawler JavaScript rendering hurdles."),
        ("Comprehensive JSON-LD Schemas", "WebSite, Organization, SoftwareApplication, MobileApp, LocalBusiness, Breadcrumbs, FAQPage."),
        ("AI Search Readiness (GEO)", "Dedicated llms.txt & llms-full.txt endpoints combined with explicit 14 AI bot robots.txt allowances."),
        ("Interactive Client-Side Free Tools", "3 zero-latency tools in /tools/* generating high engagement, dwell time, and natural backlinks.")
    ]
    for title, desc in strengths:
        pdf.set_fill_color(240, 253, 244) # Green tint #F0FDF4
        pdf.set_font("Helvetica", "B", 8.5)
        pdf.set_text_color(22, 163, 74)
        pdf.cell(60, 6, title, 1, 0, "L", True)
        pdf.set_font("Helvetica", "", 8)
        pdf.set_text_color(30, 41, 59)
        pdf.cell(130, 6, desc, 1, 1, "L", True)
        
    pdf.ln(6)
    pdf.set_font("Helvetica", "B", 14)
    pdf.set_text_color(27, 42, 74)
    pdf.cell(190, 8, "Glossary", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    pdf.set_font("Helvetica", "", 8.5)
    pdf.set_text_color(30, 41, 59)
    pdf.multi_cell(190, 5, "- SEO (Search Engine Optimization): Traditional ranking optimization for Google & Bing (metadata, speed, crawlability, canonicals).\n- GEO (Generative Engine Optimization): Optimization for AI search engines (ChatGPT, Perplexity, Gemini, Claude) focused on factual citations and E-E-A-T.\n- AEO (Answer Engine Optimization): Formatting strategies for Google featured snippets, FAQ accordions, and voice search assistants.")
    
    out_file = "reports/seo-audit-planbotai-app-2026-08-21.pdf"
    pdf.output(out_file)
    print("PDF report successfully generated at:", out_file)

if __name__ == "__main__":
    generate_pdf()
