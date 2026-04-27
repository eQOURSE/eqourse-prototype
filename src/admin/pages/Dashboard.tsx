import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { Card } from "@/components/ui/card";
import { adminApi } from "../lib/api";
import type { AnalyticsSummary } from "../lib/types";
import PageHeader from "../components/PageHeader";
import { Mail, Rocket, FileText, BookOpen, FolderTree, TrendingUp, TrendingDown } from "lucide-react";

const PIE_COLORS = ["#0ea5a4", "#6366f1", "#f59e0b", "#ec4899", "#14b8a6"];

const interestLabel: Record<string, string> = {
  "ai-data": "AI / Data Services",
  edtech: "EdTech",
  localization: "Localization",
  other: "Other",
};

export default function Dashboard() {
  const [data, setData] = useState<AnalyticsSummary | null>(null);

  useEffect(() => {
    adminApi.getAnalytics().then(setData);
  }, []);

  if (!data) {
    return (
      <div className="p-8">
        <PageHeader title="Dashboard" description="Loading analytics…" />
      </div>
    );
  }

  const kpis = [
    {
      label: "Contact Queries",
      value: data.totals.contactQueries,
      delta: data.deltas.contactQueries,
      icon: Mail,
      to: "/admin/contact-queries",
      tone: "text-blue-600 bg-blue-50",
    },
    {
      label: "Free-Pilot Queries",
      value: data.totals.pilotQueries,
      delta: data.deltas.pilotQueries,
      icon: Rocket,
      to: "/admin/pilot-queries",
      tone: "text-violet-600 bg-violet-50",
    },
    {
      label: "Blog Posts",
      value: data.totals.blogs,
      icon: FileText,
      to: "/admin/blogs",
      tone: "text-emerald-600 bg-emerald-50",
    },
    {
      label: "Case Studies",
      value: data.totals.caseStudies,
      icon: BookOpen,
      to: "/admin/case-studies",
      tone: "text-amber-600 bg-amber-50",
    },
    {
      label: "Samples",
      value: data.totals.samples,
      icon: FolderTree,
      to: "/admin/sample-categories",
      tone: "text-pink-600 bg-pink-50",
    },
  ];

  return (
    <div className="p-8 space-y-6">
      <PageHeader title="Dashboard" description="Last 30 days at a glance." />

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpis.map((k) => (
          <Link key={k.label} to={k.to}>
            <Card className="p-5 hover:shadow-md transition-shadow h-full">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${k.tone} mb-3`}>
                <k.icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold">{k.value}</div>
              <div className="text-sm text-muted-foreground">{k.label}</div>
              {typeof k.delta === "number" && (
                <div
                  className={`mt-2 text-xs flex items-center gap-1 ${
                    k.delta >= 0 ? "text-emerald-600" : "text-red-600"
                  }`}
                >
                  {k.delta >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {Math.abs(k.delta).toFixed(1)}% vs last period
                </div>
              )}
            </Card>
          </Link>
        ))}
      </div>

      {/* Charts row 1: queries over time */}
      <Card className="p-6">
        <div className="mb-4">
          <h3 className="font-semibold">Queries received — last 30 days</h3>
          <p className="text-sm text-muted-foreground">Daily volume of contact and free-pilot submissions.</p>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.queriesOverTime}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0ea5a4" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="#0ea5a4" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="date"
                tickFormatter={(d) => d.slice(5)}
                fontSize={11}
                tick={{ fill: "#6b7280" }}
              />
              <YAxis fontSize={11} tick={{ fill: "#6b7280" }} allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="contact" name="Contact" stroke="#0ea5a4" fill="url(#g1)" strokeWidth={2} />
              <Area type="monotone" dataKey="pilot" name="Free Pilot" stroke="#6366f1" fill="url(#g2)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="mb-4">
            <h3 className="font-semibold">Free-Pilot interest by service</h3>
            <p className="text-sm text-muted-foreground">Where prospects want to start.</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.serviceInterestBreakdown.map((b) => ({
                    name: interestLabel[b.label] ?? b.label,
                    value: b.count,
                  }))}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                  label={(entry) => `${entry.name} (${entry.value})`}
                >
                  {data.serviceInterestBreakdown.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <div className="mb-4">
            <h3 className="font-semibold">Query status funnel</h3>
            <p className="text-sm text-muted-foreground">How queries move through your team.</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data.statusFunnel.map((s) => ({
                  status: s.status.replace("_", " "),
                  count: s.count,
                }))}
                layout="vertical"
                margin={{ left: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" fontSize={11} allowDecimals={false} />
                <YAxis type="category" dataKey="status" fontSize={11} width={90} />
                <Tooltip />
                <Bar dataKey="count" fill="#0ea5a4" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
