"use client";

import * as React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface AnalyticsChartProps {
  data: { date: string; enrollments: number }[];
}

export function AnalyticsChart({ data }: AnalyticsChartProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-72 w-full animate-pulse rounded-xl bg-muted/30" />;
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="enrollmentGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366F1" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#14B8A6" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" opacity={0.15} vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-xl border border-border bg-card p-3 shadow-xl text-xs space-y-1">
                    <p className="font-semibold text-foreground">{label}</p>
                    <p className="text-brand-600 dark:text-brand-400 font-bold">
                      {payload[0].value} Enrollments
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Area
            type="monotone"
            dataKey="enrollments"
            stroke="#6366F1"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#enrollmentGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
