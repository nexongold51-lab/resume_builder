"use client";

import { useState } from "react";
import { Trash2, Briefcase } from "lucide-react";

type Status = "APPLIED" | "INTERVIEWING" | "OFFER" | "REJECTED";

type Application = {
  id: string;
  company: string;
  role: string;
  status: Status;
  appliedAt: string;
  notes: string | null;
  resume: { id: string; title: string } | null;
};

const STATUS_COLORS: Record<Status, string> = {
  APPLIED: "bg-gray-100 text-gray-700",
  INTERVIEWING: "bg-amber-100 text-amber-800",
  OFFER: "bg-success-light text-success",
  REJECTED: "bg-red-100 text-red-700",
};

export function TrackerClient({
  initialApplications,
  resumes,
}: {
  initialApplications: Application[];
  resumes: { id: string; title: string }[];
}) {
  const [applications, setApplications] = useState(initialApplications);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [resumeId, setResumeId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function addApplication(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company, role, resumeId: resumeId || null }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? "Failed to add application.");
      }
      const data = await res.json();
      const resume = resumes.find((r) => r.id === resumeId) ?? null;
      setApplications([{ ...data.application, resume }, ...applications]);
      setCompany("");
      setRole("");
      setResumeId("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to add application.");
    } finally {
      setSubmitting(false);
    }
  }

  async function updateStatus(id: string, status: Status) {
    const previous = applications;
    setApplications(applications.map((a) => (a.id === id ? { ...a, status } : a)));
    try {
      const res = await fetch(`/api/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update status.");
    } catch {
      setApplications(previous);
      setError("Failed to update status. Please try again.");
    }
  }

  async function remove(id: string) {
    const previous = applications;
    setApplications(applications.filter((a) => a.id !== id));
    try {
      const res = await fetch(`/api/applications/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete application.");
    } catch {
      setApplications(previous);
      setError("Failed to delete application. Please try again.");
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-6 flex items-center gap-2">
        <Briefcase className="h-5 w-5 text-primary" />
        <h1 className="text-2xl font-semibold text-gray-900">Application Tracker</h1>
      </div>

      <form onSubmit={addApplication} className="mb-8 grid grid-cols-1 gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:grid-cols-4">
        <input
          required
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company"
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
        />
        <input
          required
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Role"
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
        />
        <select
          value={resumeId}
          onChange={(e) => setResumeId(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="">No resume linked</option>
          {resumes.map((r) => (
            <option key={r.id} value={r.id}>{r.title}</option>
          ))}
        </select>
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
        >
          {submitting ? "Adding…" : "+ Add Application"}
        </button>
      </form>

      {error && (
        <p role="alert" className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="space-y-3">
        {applications.map((app) => (
          <div key={app.id} className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div>
              <p className="font-medium text-gray-900">{app.role} @ {app.company}</p>
              <p className="text-xs text-gray-500">
                Applied {new Date(app.appliedAt).toLocaleDateString()}
                {app.resume && ` · ${app.resume.title}`}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={app.status}
                onChange={(e) => updateStatus(app.id, e.target.value as Status)}
                aria-label={`Status for ${app.role} at ${app.company}`}
                className={`rounded-full border-0 px-3 py-1 text-xs font-medium ${STATUS_COLORS[app.status]}`}
              >
                <option value="APPLIED">Applied</option>
                <option value="INTERVIEWING">Interviewing</option>
                <option value="OFFER">Offer</option>
                <option value="REJECTED">Rejected</option>
              </select>
              <button
                onClick={() => remove(app.id)}
                aria-label={`Delete application for ${app.role} at ${app.company}`}
                className="text-gray-400 hover:text-red-500"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        ))}
        {applications.length === 0 && (
          <p className="text-center text-sm text-gray-500">No applications tracked yet. Add your first one above.</p>
        )}
      </div>
    </div>
  );
}
