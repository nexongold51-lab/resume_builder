import { FaqAccordion } from "@/components/faq-accordion";

const PLANS = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    features: ["Unlimited Resumes", "All 50 Templates", "Live Preview", "Downloads with Watermark"],
  },
  {
    name: "Monthly",
    price: "₹50",
    period: "/ month",
    features: ["Unlimited Downloads", "No Watermark", "Premium Support"],
  },
  {
    name: "Quarterly",
    price: "₹100",
    period: "/ 3 months",
    features: ["Everything Monthly", "Cover Letter Generator", "Portfolio Page"],
    badge: "Popular",
  },
  {
    name: "Half-Yearly",
    price: "₹150",
    period: "/ 6 months",
    features: ["Everything Included", "Best Value"],
    badge: "Best Value",
  },
];

const COMPARISON = [
  { feature: "Resume builder", free: true, paid: true },
  { feature: "All 50 templates", free: true, paid: true },
  { feature: "Live preview & auto-save", free: true, paid: true },
  { feature: "PDF download", free: "With watermark", paid: "No watermark" },
  { feature: "Cover letter generator", free: false, paid: true },
  { feature: "Priority support", free: false, paid: true },
];

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-semibold">Simple, Transparent Pricing</h1>
        <p className="mt-2 text-gray-500">
          Build resumes for free. Subscribe when you're ready for unlimited watermark-free downloads.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className="relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            {plan.badge && (
              <span className="absolute -top-3 right-4 rounded-full bg-[#2563eb] px-3 py-1 text-xs font-medium text-white">
                {plan.badge}
              </span>
            )}
            <h2 className="text-lg font-semibold">{plan.name}</h2>
            <p className="mt-2 text-2xl font-bold">
              {plan.price} <span className="text-sm font-normal text-gray-500">{plan.period}</span>
            </p>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              {plan.features.map((f) => (
                <li key={f}>✅ {f}</li>
              ))}
            </ul>
            <button className="mt-6 w-full rounded-md bg-[#2563eb] px-4 py-2 text-sm font-medium text-white hover:bg-[#1d4ed8]">
              {plan.name === "Free" ? "Get Started" : "Subscribe Now"}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-20">
        <h2 className="mb-6 text-center text-xl font-semibold text-gray-900">Free vs Paid</h2>
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-500">
              <tr>
                <th className="px-4 py-3 font-medium">Feature</th>
                <th className="px-4 py-3 font-medium">Free</th>
                <th className="px-4 py-3 font-medium">Paid</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row) => (
                <tr key={row.feature} className="border-t border-gray-200">
                  <td className="px-4 py-3 text-gray-700">{row.feature}</td>
                  <td className="px-4 py-3">
                    {typeof row.free === "boolean" ? (row.free ? "✅" : "—") : row.free}
                  </td>
                  <td className="px-4 py-3">
                    {typeof row.paid === "boolean" ? (row.paid ? "✅" : "—") : row.paid}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-20">
        <h2 className="mb-6 text-center text-xl font-semibold text-gray-900">Questions</h2>
        <FaqAccordion />
      </div>
    </div>

  );
}
