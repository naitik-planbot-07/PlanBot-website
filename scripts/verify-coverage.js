const fs = require('fs');
const path = require('path');

const sitemapXml = fs.readFileSync(path.join(__dirname, '../out/sitemap.xml'), 'utf8');
const locMatches = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);

const allSubmitted = [
  // First batch (59)
  'https://planbotai.app/blog/what-is-ai-planner-app-complete-guide',
  'https://planbotai.app/blog/planbot-vs-todoist',
  'https://planbotai.app/tools/daily-schedule-generator',
  'https://planbotai.app',
  'https://planbotai.app/tools',
  'https://planbotai.app/tools/exam-revision-calculator',
  'https://planbotai.app/features',
  'https://planbotai.app/tools/pomodoro-focus-calculator',
  'https://planbotai.app/pricing',
  'https://planbotai.app/compare/planbot-vs-motion',
  'https://planbotai.app/compare',
  'https://planbotai.app/compare/planbot-vs-notion',
  'https://planbotai.app/compare/planbot-vs-google-calendar',
  'https://planbotai.app/compare/planbot-vs-todoist',
  'https://planbotai.app/compare/planbot-vs-ticktick',
  'https://planbotai.app/use-cases/ai-planner-for-students-exams',
  'https://planbotai.app/use-cases',
  'https://planbotai.app/use-cases/ai-planner-for-working-professionals',
  'https://planbotai.app/blog/ai-planner-guide',
  'https://planbotai.app/use-cases/ai-planner-for-adhd-focus',
  'https://planbotai.app/blog',
  'https://planbotai.app/blog/how-to-create-jee-study-plan-with-ai',
  'https://planbotai.app/blog/upsc-daily-study-schedule-ai-planner',
  'https://planbotai.app/blog/clat-2027-preparation-ai-study-plan',
  'https://planbotai.app/blog/ssc-cgl-study-plan-ai-planner',
  'https://planbotai.app/blog/bank-po-study-plan-ai-planner',
  'https://planbotai.app/blog/cuet-2026-preparation-ai-study-plan',
  'https://planbotai.app/blog/time-blocking-ai-planner-guide',
  'https://planbotai.app/blog/best-ai-productivity-apps-2026',
  'https://planbotai.app/blog/best-productivity-apps-india-2026',
  'https://planbotai.app/blog/stop-procrastinating-ai-scheduling',
  'https://planbotai.app/blog/how-to-stop-procrastinating-ai-solution',
  'https://planbotai.app/blog/deep-work-focus-systems-ai',
  'https://planbotai.app/blog/build-unbreakable-habits-ai-gamification',
  'https://planbotai.app/blog/ai-productivity-hacks-college-students',
  'https://planbotai.app/blog/habit-stacking-ai-planner-routines',
  'https://planbotai.app/blog/i-let-ai-plan-my-day-for-30-days',
  'https://planbotai.app/author/naitik-baldaniya',
  'https://planbotai.app/about',
  'https://planbotai.app/blog/ai-planner-burnout-work-life-balance',
  'https://planbotai.app/contact',
  'https://planbotai.app/blog/ai-planning-busy-professionals-guide',
  'https://planbotai.app/blog/ai-planner-vs-todo-list',
  'https://planbotai.app/blog/ai-planners-vs-manual',
  'https://planbotai.app/blog/ai-routine-planner-for-freelancers',
  'https://planbotai.app/blog/automatic-daily-planner-vs-calendar',
  'https://planbotai.app/blog/ai-scheduling-workflow-automation',
  'https://planbotai.app/blog/how-ai-replaces-manual-task-management',
  'https://planbotai.app/blog/daily-review-ritual-ai-planner',
  'https://planbotai.app/blog/how-athletes-use-ai-training-plans',
  'https://planbotai.app/blog/how-planbot-ai-works',
  'https://planbotai.app/blog/how-entrepreneurs-use-ai-plan-day',
  'https://planbotai.app/blog/how-to-create-ai-powered-daily-routine',
  'https://planbotai.app/blog/morning-routine-optimization-ai',
  'https://planbotai.app/blog/planbot-god-tier-review',
  'https://planbotai.app/blog/planbot-adhd-focus',
  'https://planbotai.app/blog/plan-night-before-morning-routine',
  'https://planbotai.app/blog/planbot-review-2026-features-pricing',
  'https://planbotai.app/blog/planbot-vs-akiflow',
  // Second batch (23)
  'https://planbotai.app/blog/ai-scheduling-workflow-automation',
  'https://planbotai.app/blog/time-blocking-vs-ai-planning',
  'https://planbotai.app/privacy-policy',
  'https://planbotai.app/blog/neet-2027-study-plan-ai-guide',
  'https://planbotai.app/blog/planbot-vs-todo-apps-ai-planning-future',
  'https://planbotai.app/blog/planbot-vs-reclaim',
  'https://planbotai.app/blog/planbot-vs-notion',
  'https://planbotai.app/terms',
  'https://planbotai.app/blog/planbot-vs-motion',
  'https://planbotai.app/blog/gate-2027-preparation-ai-study-plan',
  'https://planbotai.app/blog/student-routine-generation-ai',
  'https://planbotai.app/blog/nda-2026-study-plan-ai-planner',
  'https://planbotai.app/blog/planbot-vs-ticktick',
  'https://planbotai.app/blog/planbot-vs-sunsama',
  'https://planbotai.app/blog/story-behind-planbot',
  'https://planbotai.app/blog/planbot-vs-free-productivity-apps',
  'https://planbotai.app/blog/time-management-working-professionals-india',
  'https://planbotai.app/account-deletion',
  'https://planbotai.app/blog/cat-2026-preparation-ai-study-plan',
  'https://planbotai.app/blog/why-planbot-is-best',
  'https://planbotai.app/refund-policy',
  'https://planbotai.app/blog/planbot-vs-google-calendar',
  'https://planbotai.app/blog/smart-planner-app-features-to-look-for'
];

const submittedSet = new Set(allSubmitted.map(u => u.replace(/\/$/, '')));
const missing = locMatches.filter(url => !submittedSet.has(url.replace(/\/$/, '')));

console.log(`Total URLs in sitemap: ${locMatches.length}`);
console.log(`Unique URLs submitted: ${submittedSet.size}`);
console.log(`Missing count: ${missing.length}`);
if (missing.length > 0) {
  console.log('Missing:');
  missing.forEach(m => console.log(m));
} else {
  console.log('🎉 100% COMPLETE! ZERO URLs remaining!');
}
