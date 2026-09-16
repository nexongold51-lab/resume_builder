"use client";

import { useEffect, useState } from "react";
import { History } from "lucide-react";

type VersionListItem = { id: string; label: string | null; createdAt: string };

export function VersionHistoryModal({
  resumeId,
  onClose,
  onRestore,
}: {
  resumeId: string;
  onClose: () => void;
  onRestore: (content: unknown) => void;
}) {
  const [versions, setVersions] = useState<VersionListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    const res = await fetch(`/api/resumes/${resumeId}/versions`);
    const data = await res.json().catch(() => ({ versions: [] }));
    setVersions(data.versions ?? []);
    setLoading(false);
  }

  useEffect(() => {
    // Standard fetch-on-mount pattern; setLoading/setVersions run inside the async load(), not the effect body itself.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function saveVersion() {
    setSaving(true);
    await fetch(`/api/resumes/${resumeId}/versions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label: `Snapshot ${new Date().toLocaleString()}` }),
    });
    setSaving(false);
    load();
  }

  async function restore(versionId: string) {
    const res = await fetch(`/api/resumes/${resumeId}/versions/${versionId}`);
    const data = await res.json().catch(() => null);
    if (data?.content) {
      onRestore(data.content);
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[85vh] w-full max-w-md overflow-y-auto rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <History className="h-4 w-4" /> Version History
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">✕</button>
        </div>
        <div className="p-4">
          <button
            onClick={saveVersion}
            disabled={saving}
            className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save current as version"}
          </button>

          <div className="mt-4 space-y-2">
            {loading && <p className="text-sm text-gray-500">Loading…</p>}
            {!loading && versions.length === 0 && (
              <p className="text-sm text-gray-500">No saved versions yet.</p>
            )}
            {versions.map((v) => (
              <div key={v.id} className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">{v.label ?? "Untitled snapshot"}</p>
                  <p className="text-xs text-gray-500">{new Date(v.createdAt).toLocaleString()}</p>
                </div>
                <button
                  onClick={() => restore(v.id)}
                  className="rounded-md border border-gray-300 px-2.5 py-1 text-xs font-medium hover:bg-gray-50"
                >
                  Restore
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
