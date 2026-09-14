export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-sm text-gray-700">
      <h1 className="mb-4 text-2xl font-semibold text-gray-900">Terms of Service</h1>
      <p className="mb-4 text-xs text-gray-400">
        This is placeholder content. Replace with your actual terms of service before launching to real users.
      </p>
      <div className="space-y-4">
        <p>By using ResumePro AI, you agree to use the service only for lawful resume-building purposes.</p>
        <p>
          Free accounts may download resumes with a watermark. Paid subscriptions unlock unlimited watermark-free
          downloads and premium features, as described on our{" "}
          <a href="/pricing" className="text-primary hover:underline">Pricing page</a>.
        </p>
        <p>We reserve the right to suspend accounts that violate these terms.</p>
      </div>
    </div>
  );
}
