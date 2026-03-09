"use client";

import { useState, useEffect, useCallback } from "react";
import {
  FolderOpen,
  Plus,
  Search,
  ExternalLink,
  Pencil,
  Trash2,
  X,
  FileText,
  FileSpreadsheet,
  FileImage,
  FileVideo,
  File,
  Link2,
  User,
  Calendar,
  Filter,
  Upload,
  Download,
  Loader2,
} from "lucide-react";

/* ── Types ───────────────────────────────────────────────────── */

interface DataRoomDoc {
  id: number;
  name: string;
  description: string | null;
  category: string;
  file_url: string;
  file_type: string | null;
  file_size: number | null;
  shared_by: string;
  created_at: string;
  updated_at: string;
}

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "contracts", label: "Contracts" },
  { value: "proposals", label: "Proposals" },
  { value: "research", label: "Research" },
  { value: "templates", label: "Templates" },
  { value: "sops", label: "SOPs" },
  { value: "reports", label: "Reports" },
  { value: "other", label: "Other" },
] as const;

const CATEGORY_COLORS: Record<string, string> = {
  contracts: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  proposals: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  research: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  templates: "bg-teal-500/10 text-teal-400 border-teal-500/20",
  sops: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  reports: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  other: "bg-slate-500/10 text-slate-400 border-slate-500/20",
};

/* ── Helpers ──────────────────────────────────────────────────── */

function getFileIcon(fileType: string | null, url: string) {
  const t = (fileType || "").toLowerCase();
  const u = url.toLowerCase();

  if (t.includes("spreadsheet") || t.includes("csv") || u.includes("sheets.google") || u.endsWith(".xlsx") || u.endsWith(".csv"))
    return <FileSpreadsheet size={20} className="text-emerald-400" />;
  if (t.includes("image") || u.endsWith(".png") || u.endsWith(".jpg") || u.endsWith(".svg"))
    return <FileImage size={20} className="text-pink-400" />;
  if (t.includes("video") || u.includes("youtube") || u.includes("loom"))
    return <FileVideo size={20} className="text-red-400" />;
  if (t.includes("doc") || t.includes("pdf") || u.endsWith(".pdf") || u.endsWith(".docx") || u.includes("docs.google"))
    return <FileText size={20} className="text-blue-400" />;
  if (u.includes("notion.so") || u.includes("notion.site"))
    return <FileText size={20} className="text-slate-300" />;

  return <File size={20} className="text-muted" />;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getDomain(url: string) {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isUploadedFile(doc: DataRoomDoc) {
  return doc.file_size != null && doc.file_size > 0;
}

function isExternalLink(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/* ── Add / Edit Modal ────────────────────────────────────────── */

type SourceMode = "upload" | "link";

function DocModal({
  doc,
  onClose,
  onSaved,
}: {
  doc: DataRoomDoc | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEdit = !!doc;
  const [mode, setMode] = useState<SourceMode>(
    isEdit && doc.file_url && isExternalLink(doc.file_url) ? "link" : "upload"
  );
  const [form, setForm] = useState({
    name: doc?.name || "",
    description: doc?.description || "",
    category: doc?.category || "other",
    file_url: doc?.file_url || "",
    file_type: doc?.file_type || "",
    shared_by: doc?.shared_by || "",
  });
  const [saving, setSaving] = useState(false);
  const [selectedFile, setSelectedFile] = useState<globalThis.File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const inputClass =
    "w-full px-3 py-2 bg-surface border border-edge rounded-lg text-heading text-sm placeholder:text-dim focus:outline-none focus:border-accent/50 transition-colors";

  const handleFileSelect = (file: globalThis.File) => {
    if (file.size > 25 * 1024 * 1024) {
      setUploadError("File too large. Maximum size is 25MB.");
      return;
    }
    setUploadError(null);
    setSelectedFile(file);
    setForm((prev) => ({
      ...prev,
      name: prev.name || file.name.replace(/\.[^.]+$/, ""),
      file_type: file.type || file.name.split(".").pop() || "",
    }));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "upload" && !selectedFile && !isEdit) {
      setUploadError("Please select a file first");
      return;
    }

    setSaving(true);

    try {
      if (mode === "upload" && selectedFile) {
        // Upload file + metadata together via FormData
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("name", form.name);
        formData.append("description", form.description);
        formData.append("category", form.category);
        formData.append("file_type", form.file_type);
        formData.append("shared_by", form.shared_by);

        const res = await fetch("/api/crm/data-room/upload", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          onSaved();
          onClose();
        } else {
          const err = await res.json();
          setUploadError(err.error || "Upload failed");
        }
      } else {
        // Link-based doc or edit (no new file)
        const url = isEdit ? `/api/crm/data-room/${doc.id}` : "/api/crm/data-room";
        const method = isEdit ? "PATCH" : "POST";

        const res = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        if (res.ok) {
          onSaved();
          onClose();
        }
      }
    } catch {
      setUploadError("Something went wrong");
    }

    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-raised border border-edge rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-edge">
          <h2 className="font-display font-semibold text-heading">
            {isEdit ? "Edit Document" : "Add Document"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-card text-muted hover:text-heading transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Source mode toggle */}
          {!isEdit && (
            <div className="flex gap-1 p-1 bg-surface rounded-lg border border-edge w-fit">
              <button
                type="button"
                onClick={() => setMode("upload")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  mode === "upload"
                    ? "bg-accent/10 text-accent border border-accent/20"
                    : "text-muted hover:text-heading"
                }`}
              >
                <Upload size={13} />
                Upload File
              </button>
              <button
                type="button"
                onClick={() => setMode("link")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  mode === "link"
                    ? "bg-accent/10 text-accent border border-accent/20"
                    : "text-muted hover:text-heading"
                }`}
              >
                <Link2 size={13} />
                Paste Link
              </button>
            </div>
          )}

          <div>
            <label className="text-xs text-muted mb-1.5 block font-medium">
              Document Name *
            </label>
            <input
              required
              placeholder="e.g. Q1 Proposal Template"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
            />
          </div>

          <div>
            <label className="text-xs text-muted mb-1.5 block font-medium">
              Description
            </label>
            <textarea
              rows={2}
              placeholder="Brief description of this document"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted mb-1.5 block font-medium">
                Category *
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className={inputClass}
              >
                {CATEGORIES.filter((c) => c.value !== "all").map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-muted mb-1.5 block font-medium">
                File Type
              </label>
              <input
                placeholder="e.g. PDF, Google Doc, Notion"
                value={form.file_type}
                onChange={(e) => setForm({ ...form, file_type: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>

          {/* Upload or Link */}
          {mode === "upload" ? (
            <div>
              <label className="text-xs text-muted mb-1.5 block font-medium">
                File *
              </label>
              {selectedFile ? (
                <div className="flex items-center gap-3 p-3 bg-surface border border-edge rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 rounded bg-accent/10 flex items-center justify-center">
                    {getFileIcon(form.file_type, selectedFile.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-heading truncate">{selectedFile.name}</p>
                    <p className="text-[11px] text-dim">{formatFileSize(selectedFile.size)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFile(null);
                      setForm((prev) => ({ ...prev, file_type: "" }));
                    }}
                    className="p-1 rounded hover:bg-card text-muted hover:text-heading transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : isEdit && isUploadedFile(doc!) ? (
                <div className="flex items-center gap-3 p-3 bg-surface border border-edge rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 rounded bg-accent/10 flex items-center justify-center">
                    {getFileIcon(doc!.file_type, doc!.file_url)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-heading truncate">{doc!.file_url}</p>
                    <p className="text-[11px] text-dim">{formatFileSize(doc!.file_size!)}</p>
                  </div>
                </div>
              ) : (
                <label
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  className={`flex flex-col items-center gap-2 p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                    dragOver
                      ? "border-accent bg-accent/5"
                      : "border-edge hover:border-muted"
                  }`}
                >
                  <Upload size={24} className="text-dim" />
                  <div className="text-center">
                    <p className="text-sm text-muted">
                      Drop file here or click to browse
                    </p>
                    <p className="text-[11px] text-dim mt-0.5">Max 25MB</p>
                  </div>
                  <input
                    type="file"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                </label>
              )}
              {uploadError && (
                <p className="text-xs text-red-400 mt-1.5">{uploadError}</p>
              )}
            </div>
          ) : (
            <div>
              <label className="text-xs text-muted mb-1.5 block font-medium">
                URL / Link *
              </label>
              <div className="relative">
                <Link2
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-dim"
                />
                <input
                  required={mode === "link"}
                  type="url"
                  placeholder="https://..."
                  value={form.file_url}
                  onChange={(e) => setForm({ ...form, file_url: e.target.value })}
                  className={`${inputClass} pl-8`}
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs text-muted mb-1.5 block font-medium">
              Shared By *
            </label>
            <div className="relative">
              <User
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-dim"
              />
              <input
                required
                placeholder="Your name"
                value={form.shared_by}
                onChange={(e) =>
                  setForm({ ...form, shared_by: e.target.value })
                }
                className={`${inputClass} pl-8`}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent/90 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  {mode === "upload" && selectedFile ? "Uploading..." : isEdit ? "Saving..." : "Adding..."}
                </>
              ) : isEdit ? (
                "Save Changes"
              ) : (
                "Add Document"
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-muted hover:text-heading text-sm font-medium rounded-lg border border-edge hover:bg-card/50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ── Document Card ───────────────────────────────────────────── */

function DocCard({
  doc,
  onEdit,
  onDelete,
}: {
  doc: DataRoomDoc;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [deleting, setDeleting] = useState(false);
  const uploaded = isUploadedFile(doc);

  const handleDelete = async () => {
    if (!confirm("Delete this document?")) return;
    setDeleting(true);
    const res = await fetch(`/api/crm/data-room/${doc.id}`, {
      method: "DELETE",
    });
    if (res.ok) onDelete();
    setDeleting(false);
  };

  return (
    <div className="glass-card rounded-xl p-4 group hover:border-accent/20 transition-all">
      <div className="flex items-start gap-3">
        {/* File icon */}
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-surface border border-edge flex items-center justify-center">
          {getFileIcon(doc.file_type, doc.file_url)}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-medium text-heading text-sm truncate">
                {doc.name}
              </h3>
              {doc.description && (
                <p className="text-xs text-muted mt-0.5 line-clamp-2">
                  {doc.description}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
              {uploaded ? (
                <a
                  href={`/api/crm/data-room/${doc.id}/file`}
                  download={doc.file_url}
                  className="p-1.5 rounded hover:bg-accent/10 text-muted hover:text-accent transition-colors"
                  title="Download"
                >
                  <Download size={14} />
                </a>
              ) : (
                <a
                  href={doc.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded hover:bg-accent/10 text-muted hover:text-accent transition-colors"
                  title="Open"
                >
                  <ExternalLink size={14} />
                </a>
              )}
              <button
                onClick={onEdit}
                className="p-1.5 rounded hover:bg-card text-muted hover:text-heading transition-colors"
                title="Edit"
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="p-1.5 rounded hover:bg-red-500/10 text-muted hover:text-red-400 transition-colors disabled:opacity-50"
                title="Delete"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>

          {/* Meta row */}
          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <span
              className={`inline-flex px-2 py-0.5 rounded text-[10px] font-medium border ${
                CATEGORY_COLORS[doc.category] || CATEGORY_COLORS.other
              }`}
            >
              {doc.category}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-dim">
              <User size={10} />
              {doc.shared_by}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-dim">
              <Calendar size={10} />
              {formatDate(doc.created_at)}
            </span>
            {uploaded ? (
              <span className="text-[11px] text-dim">
                {formatFileSize(doc.file_size!)}
              </span>
            ) : (
              <span className="text-[11px] text-dim truncate max-w-[180px]">
                {getDomain(doc.file_url)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Page ───────────────────────────────────────────────── */

export default function DataRoomPage() {
  const [docs, setDocs] = useState<DataRoomDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editDoc, setEditDoc] = useState<DataRoomDoc | null>(null);

  const fetchDocs = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category !== "all") params.set("category", category);

    const res = await fetch(`/api/crm/data-room?${params}`);
    const json = await res.json();
    setDocs(json.data || []);
    setLoading(false);
  }, [search, category]);

  useEffect(() => {
    fetchDocs();
  }, [fetchDocs]);

  const openAdd = () => {
    setEditDoc(null);
    setModalOpen(true);
  };

  const openEdit = (doc: DataRoomDoc) => {
    setEditDoc(doc);
    setModalOpen(true);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FolderOpen size={24} className="text-accent" />
          <h1 className="font-display font-bold text-2xl text-heading">
            Data Room
          </h1>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Plus size={16} />
          Add Document
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-dim"
          />
          <input
            placeholder="Search documents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 bg-surface border border-edge rounded-lg text-heading text-sm placeholder:text-dim focus:outline-none focus:border-accent/50 transition-colors"
          />
        </div>

        {/* Category filter */}
        <div className="relative">
          <Filter
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-dim"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="pl-8 pr-8 py-2 bg-surface border border-edge rounded-lg text-heading text-sm focus:outline-none focus:border-accent/50 transition-colors appearance-none cursor-pointer"
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Document count */}
      <p className="text-xs text-muted mb-4">
        {loading ? "Loading..." : `${docs.length} document${docs.length !== 1 ? "s" : ""}`}
      </p>

      {/* Document Grid */}
      {!loading && docs.length === 0 ? (
        <div className="glass-card rounded-xl p-12 text-center">
          <FolderOpen size={40} className="text-dim mx-auto mb-3" />
          <p className="text-muted text-sm">No documents yet</p>
          <p className="text-dim text-xs mt-1">
            Add documents, links, and shared resources for your team to
            reference.
          </p>
          <button
            onClick={openAdd}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <Plus size={16} />
            Add First Document
          </button>
        </div>
      ) : (
        <div className="grid gap-3">
          {docs.map((doc) => (
            <DocCard
              key={doc.id}
              doc={doc}
              onEdit={() => openEdit(doc)}
              onDelete={fetchDocs}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <DocModal
          doc={editDoc}
          onClose={() => setModalOpen(false)}
          onSaved={fetchDocs}
        />
      )}
    </div>
  );
}
