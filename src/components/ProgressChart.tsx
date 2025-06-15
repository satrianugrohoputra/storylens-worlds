
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

// Animated "Chapters Completed" bar chart, highlights bookmarks
export const ProgressChart: React.FC<{ completed: number; total: number; bookmarks: string[] }> = ({
  completed, total, bookmarks
}) => {
  const data = Array.from({ length: total }).map((_, i) => ({
    name: `Ch ${i + 1}`,
    done: i < completed ? 1 : 0.32,
    bookmarked: bookmarks.includes(`chapter-${i+1}`),
  }));
  return (
    <div className="w-full max-w-xl mx-auto py-4 px-2 rounded-lg bg-gradient-to-r from-indigo-950/70 to-blue-800/60 shadow-lg border border-indigo-500/40">
      <div className="flex justify-between items-center pb-1">
        <span className="font-semibold text-indigo-100 text-base">Chapters Completed</span>
        <span className="text-indigo-200/70 text-sm">{completed} / {total}</span>
      </div>
      <ResponsiveContainer width="100%" height={52}>
        <BarChart data={data} margin={{ left: 0, right: 0, top: 6, bottom: 0 }}>
          <XAxis dataKey="name" hide />
          <YAxis hide />
          <Tooltip
            content={({ active, payload }) =>
              active && payload ? (
                <div className="bg-indigo-800 text-indigo-100 px-2 py-1 rounded shadow">{payload[0].payload.name}</div>
              ) : null
            }
            cursor={{ fill: "rgba(129,140,248,0.08)" }}
            wrapperStyle={{ zIndex: 20 }}
          />
          <Bar dataKey="done" radius={5} isAnimationActive>
            {data.map((entry, i) => (
              <Cell
                key={i}
                fill={entry.done === 1
                  ? entry.bookmarked
                    ? "#facc15"
                    : "#a5b4fc"
                  : entry.bookmarked
                    ? "#fde68a"
                    : "#334155"}
                stroke={entry.bookmarked ? "#fbbf24" : '#4f46e5'}
                strokeWidth={entry.bookmarked ? 2 : 1}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
