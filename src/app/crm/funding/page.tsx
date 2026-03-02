"use client";

import { useState, useEffect, useCallback } from "react";
import { Database, Search, Download, TrendingUp, DollarSign, Building2, Layers, Check } from "lucide-react";

interface FundingRound {
  id: number;
  company_name: string;
  round_type: string;
  amount_usd: number | null;
  date: string | null;
  investors: string[];
  category_tags: string[];
  source: string;
  source_url: string | null;
  company_website: string | null;
  imported: boolean;
}

interface FundingStats {
  totalRounds: number;
  totalFunding: number;
  avgRoundSize: number;
  uniqueCompanies: number;
}

function formatUsd(amount: number | null) {
  if (!amount) return "—";
  if (amount >= 1_000_000_000) return `$${(amount / 1_000_000_000).toFixed(1)}B`;
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(0)}K`;
  return `$${amount.toFixed(0)}`;
}

export default function FundingPage() {
  const [data, setData] = useState<FundingRound[]>([]);
  const [stats, setStats] = useState<FundingStats | null>(null);
  const [roundTypes, setRoundTypes] = useState<string[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [roundType, setRoundType] = useState("");
  const [importing, setImporting] = useState<number | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (roundType) params.set("round_type", roundType);
    params.set("page", page.toString());
    params.set("limit", "25");

    const res = await fetch(`/api/crm/funding?${params}`);
    const json = await res.json();
    setData(json.data);
    setTotal(json.total);
    setTotalPages(json.totalPages);
    setRoundTypes(json.roundTypes);
    setLoading(false);
  }, [search, roundType, page]);

  const fetchStats = useCallback(async () => {
    const res = await fetch("/api/crm/funding/stats");
    const json = await res.json();
    setStats(json);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);
  useEffect(() => { fetchStats(); }, [fetchStats]);

  const handleImport = async (id: number) => {
    setImporting(id);
    try {
      const res = await fetch(`/api/crm/funding/${id}/import`, { method: "POST" });
      if (res.ok) {
        fetchData();
      } else {
        const json = await res.json();
        alert(json.error || "Import failed");
      }
    } catch {
      alert("Import failed");
    }
    setImporting(null);
  };

  const statCards = stats ? [
    { label: "Total Rounds", value: stats.totalRounds.toString(), icon: Layers, color: "text-accent" },
    { label: "Total Funding", value: formatUsd(stats.totalFunding), icon: DollarSign, color: "text-accent-alt" },
    { label: "Avg Round", value: formatUsd(stats.avgRoundSize), icon: TrendingUp, color: "text-yellow-400" },
    { label: "Companies", value: stats.uniqueCompanies.toString(), icon: Building2, color: "text-purple-400" },
  ] : [];

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Database size={24} className="text-accent" />
        <h1 className="font-display font-bold text-2xl text-heading">Funding Data</h1>
        <span className="text-muted text-sm ml-auto">{total} rounds</span>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {statCards.map((s) => (
            <div key={s.label} className="glass-card rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <s.icon size={16} className={s.color} />
                <span className="text-xs text-muted uppercase tracking-wide">{s.label}</span>
              </div>
              <p className={`text-2xl font-bold font-display ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-dim" />
          <input
            type="text"
            placeholder="Search companies..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-9 pr-4 py-2 bg-raised border border-edge rounded-lg text-heading text-sm placeholder:text-dim focus:outline-none focus:border-accent/50 transition-colors"
          />
        </div>
        <select
          value={roundType}
          onChange={(e) => { setRoundType(e.target.value); setPage(1); }}
          className="px-3 py-2 bg-raised border border-edge rounded-lg text-heading text-sm focus:outline-none focus:border-accent/50 transition-colors"
        >
          <option value="">All Rounds</option>
          {roundTypes.map((rt) => (
            <option key={rt} value={rt}>{rt}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-edge">
                <th className="text-left px-4 py-3 text-xs text-muted uppercase tracking-wide font-medium">Company</th>
                <th className="text-left px-4 py-3 text-xs text-muted uppercase tracking-wide font-medium">Round</th>
                <th className="text-right px-4 py-3 text-xs text-muted uppercase tracking-wide font-medium">Amount</th>
                <th className="text-left px-4 py-3 text-xs text-muted uppercase tracking-wide font-medium">Date</th>
                <th className="text-left px-4 py-3 text-xs text-muted uppercase tracking-wide font-medium hidden lg:table-cell">Categories</th>
                <th className="text-right px-4 py-3 text-xs text-muted uppercase tracking-wide font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-muted">Loading...</td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-muted">No funding rounds found</td>
                </tr>
              ) : (
                data.map((round) => (
                  <tr key={round.id} className="border-b border-edge/50 hover:bg-card/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-medium text-heading">{round.company_name}</div>
                      {round.company_website && (
                        <a href={round.company_website} target="_blank" rel="noopener noreferrer" className="text-xs text-accent hover:underline">
                          {new URL(round.company_website).hostname}
                        </a>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full text-xs bg-accent/10 text-accent border border-accent/20">
                        {round.round_type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-heading">{formatUsd(round.amount_usd)}</td>
                    <td className="px-4 py-3 text-muted">{round.date || "—"}</td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {round.category_tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-1.5 py-0.5 rounded text-xs bg-card text-muted border border-edge">
                            {tag}
                          </span>
                        ))}
                        {round.category_tags.length > 3 && (
                          <span className="text-xs text-dim">+{round.category_tags.length - 3}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {round.imported ? (
                        <span className="px-3 py-1 rounded-md text-xs font-medium bg-card text-dim border border-edge cursor-default inline-flex items-center">
                          <Check size={12} className="inline mr-1" />Imported
                        </span>
                      ) : (
                        <button
                          onClick={() => handleImport(round.id)}
                          disabled={importing === round.id}
                          className="px-3 py-1 rounded-md text-xs font-medium bg-accent-alt/10 text-accent-alt border border-accent-alt/20 hover:bg-accent-alt/20 transition-colors disabled:opacity-50"
                        >
                          {importing === round.id ? "..." : (
                            <><Download size={12} className="inline mr-1" />Import</>
                          )}
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-edge">
            <span className="text-xs text-muted">
              Page {page} of {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="px-3 py-1 rounded text-xs bg-card border border-edge text-muted hover:text-heading disabled:opacity-50 transition-colors"
              >
                Previous
              </button>
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="px-3 py-1 rounded text-xs bg-card border border-edge text-muted hover:text-heading disabled:opacity-50 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
