import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-sm text-gray-700">
      <h1 className="mb-4 text-2xl font-semibold text-gray-900">Privacy Policy</h1>
      <p className="mb-4 text-xs text-gray-400">
        This is placeholder content. Replace with your actual privacy policy before launching to real users.
      </p>
      <div className="space-y-4">
        <p>
          ResumePro AI stores the information you provide (account details and resume content) in order to
          provide the resume building service. We do not sell your personal data to third parties.
        </p>
        <p>
          Your resume data is stored in our database and is only accessible to you unless you explicitly enable
          resume sharing via a public link.
        </p>
        <p>
          If you have questions about this policy, contact us at the address listed on our{" "}
          <Link href="/contact" className="text-primary hover:underline">Contact page</Link>.
        </p>
      </div>
    </div>
  );
}
