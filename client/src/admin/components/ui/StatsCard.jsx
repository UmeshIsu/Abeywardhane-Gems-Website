import { TrendingUp, TrendingDown } from 'lucide-react';

/**
 * Dashboard stats card.
 * @param {object} props
 * @param {string} props.title
 * @param {string|number} props.value
 * @param {string} [props.subtitle]
 * @param {React.ElementType} [props.icon]
 * @param {string} [props.trend] - e.g. '+12%'
 * @param {'up'|'down'} [props.trendDir]
 * @param {string} [props.color] - 'blue' | 'emerald' | 'amber' | 'purple' | 'rose'
 */
export default function StatsCard({
  title, value, subtitle, icon: Icon, trend, trendDir = 'up', color = 'blue'
}) {
  const colorMap = {
    blue:    { bg: 'bg-sapphire/10 dark:bg-sapphire/20',  text: 'text-sapphire', ring: 'ring-sapphire/20' },
    emerald: { bg: 'bg-emerald-50 dark:bg-emerald-900/20', text: 'text-emerald-600 dark:text-emerald-400', ring: 'ring-emerald-500/20' },
    amber:   { bg: 'bg-amber-50 dark:bg-amber-900/20',     text: 'text-amber-600 dark:text-amber-400', ring: 'ring-amber-500/20' },
    purple:  { bg: 'bg-purple-50 dark:bg-purple-900/20',   text: 'text-purple-600 dark:text-purple-400', ring: 'ring-purple-500/20' },
    rose:    { bg: 'bg-rose-50 dark:bg-rose-900/20',       text: 'text-rose-600 dark:text-rose-400', ring: 'ring-rose-500/20' },
  };

  const c = colorMap[color] || colorMap.blue;

  return (
    <div className="bg-white dark:bg-ink rounded-xl border border-line dark:border-ink-line p-5 hover:shadow-soft transition-shadow duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center ring-1 ${c.ring}`}>
          {Icon && <Icon className={`w-5 h-5 ${c.text}`} />}
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
            trendDir === 'up'
              ? 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-900/30'
              : 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/30'
          }`}>
            {trendDir === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {trend}
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-ink dark:text-white mb-1">
        {value}
      </div>
      <div className="text-sm text-muted">{title}</div>
      {subtitle && <div className="text-xs text-muted/60 mt-1">{subtitle}</div>}
    </div>
  );
}
