const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=cpm.planbot';

export default function DownloadBanner() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 glass-panel border-t border-glass-border py-3 px-4 md:hidden">
      <div className="flex items-center justify-between gap-3 max-w-7xl mx-auto">
        <p className="text-xs text-text-secondary leading-tight">
          📱 PlanBot is an Android app.
          <br />
          <span className="text-text-dim">Download to start planning.</span>
        </p>
        <a
          href={PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 px-4 py-2 rounded-lg text-xs font-semibold text-white"
          style={{ background: 'linear-gradient(135deg, #1E90FF, #00C6FF)' }}
        >
          Get App
        </a>
      </div>
    </div>
  );
}
