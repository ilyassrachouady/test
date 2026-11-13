/**
 * Editable site copy + sample content. Replace contact info, ratings, company claims,
 * reviews, and supplied reference photography with material you can publish commercially.
 */
export const site = {
  name: "KlinUp",
  city: "Manhattan",
  phone: "+1 (555) 123-4567",
  email: "hello@klinup.com",
  tagline: "Cleaning for busy people in Manhattan.",
  description:
    "Move-outs, renovations, or total transformations — we handle the toughest cleaning jobs so you don’t have to.",
};

export const services = [
  {
    number: "01",
    name: "Deep Cleaning",
    short: "A complete top-to-bottom transformation for every corner.",
    image: "/images/deep-clean.webp",
    list: ["Baseboards & crown molding", "Inside cabinets & drawers", "Appliance deep clean", "Light fixtures & ceiling fans", "Window sills & tracks"],
  },
  {
    number: "02",
    name: "Move-Out Cleaning",
    short: "Leave your space looking its best for the next chapter.",
    image: "/images/move-out.webp",
    list: ["Full property sanitization", "Kitchen deep scrub", "Bathroom restoration", "Closet & cabinet interiors", "Floor cleaning & polish"],
  },
  {
    number: "03",
    name: "Airbnb Turnover",
    short: "Fast, detail-focused cleaning between every guest stay.",
    image: "/images/airbnb.webp",
    list: ["Quick turnaround service", "Linen change & laundry", "Kitchen & bath sanitization", "Restocking essentials", "Trash & recycling removal"],
  },
];

export const faqs = [
  { q: "How much does a cleaning cost?", a: "Every space and service is a little different. Send us the size of your home and the type of clean you need, and we'll prepare a clear quote before any work begins." },
  { q: "Do you use eco-friendly products?", a: "We can use eco-conscious cleaning products where appropriate. Let us know if you have surface sensitivities, allergies, or special product preferences when booking." },
  { q: "Do I need to provide any supplies?", a: "Our standard service comes with basic equipment and products. If your space needs specialty materials, we'll discuss those with you ahead of time." },
  { q: "How long does a cleaning take?", a: "The timing depends on square footage, condition, and the service selected. We estimate the time when confirming your booking and communicate any changes." },
  { q: "Do you wash dishes or handle laundry?", a: "Laundry and dishes can be arranged for selected services. Include your request in the message field so we can confirm what's included." },
  { q: "What if I need to cancel or reschedule?", a: "Contact us as early as possible and we'll help find another available appointment. Your booking confirmation will include the applicable cancellation policy." },
  { q: "What if I’m not satisfied with the cleaning?", a: "Tell us what wasn't right as soon as you can. We'll review the concern and discuss an appropriate resolution with you." },
];

// Demonstration testimonials only. Replace with verified, permissioned customer reviews before going live.
export const testimonials = [
  { quote: "The team was thoughtful, thorough, and so easy to work with. Coming home to a sparkling clean apartment was the best feeling.", name: "Robert M.", service: "Deep cleaning", image: "/images/person-1.webp" },
  { quote: "Booking was simple, communication was clear, and the place looked wonderful after the move. I’d book again without hesitation.", name: "Jennifer K.", service: "Move-out cleaning", image: "/images/person-2.webp" },
  { quote: "Everything felt fresh and ready for our family. They paid attention to the little details that make a big difference.", name: "Amanda L.", service: "Move-in cleaning", image: "/images/person-3.webp" },
  { quote: "After our renovation there was dust everywhere. The difference after one visit was remarkable.", name: "Marcus R.", service: "Post-renovation", image: "/images/person-4.webp" },
  { quote: "Friendly people and excellent results. It felt like our apartment had been given a complete reset.", name: "Priya S.", service: "Deep cleaning", image: "/images/person-5.webp" },
  { quote: "Reliable turnaround and great care for our space. It made managing our guest stays much easier.", name: "David T.", service: "Airbnb turnover", image: "/images/person-6.webp" },
];
