export default function RefundPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-sm text-gray-700">
      <h1 className="mb-4 text-2xl font-semibold text-gray-900">Refund Policy</h1>
      <p className="mb-4 text-xs text-gray-400">
        This is placeholder content. Replace with your actual refund policy before accepting real payments.
      </p>
      <div className="space-y-4">
        <p>
          Subscription plans (Monthly, 3 Months, 6 Months) are billed upfront. If you are not satisfied within 7
          days of purchase and have not downloaded a watermark-free resume, contact{" "}
          <a href="/contact" className="text-primary hover:underline">support</a> for a refund.
        </p>
        <p>No real payment processing is currently integrated in this application.</p>
      </div>
    </div>
  );
}
