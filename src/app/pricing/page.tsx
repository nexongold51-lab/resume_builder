const PLANS = [
  {
    name: "Monthly",
    price: "₹50",
    period: "/ month",
    features: ["Unlimited Downloads", "AI Features", "Premium Templates"],
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

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-semibold">Unlock Unlimited Downloads</h1>
        <p className="mt-2 text-gray-500">
          Choose a plan to download your resume without watermarks.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className="relative rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            {plan.badge && (
              <span className="absolute -top-3 right-4 rounded-full bg-[#464feb] px-3 py-1 text-xs font-medium text-white">
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
            <button className="mt-6 w-full rounded-md bg-[#464feb] px-4 py-2 text-sm font-medium text-white">
              Subscribe Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
