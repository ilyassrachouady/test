// Reusable cleaning-services content for the HYB-branded website.
// Company contacts come from HYB Prévention Conseil's public website; cleaning offerings are a proposed site concept, not independently verified.
export const site = {
  name: "HYB Prévention Conseil",
  shortName: "HYB Prévention",
  founder: "Hygo Bisimwa",
  location: "Québec",
  phone: "(514) 206-7171",
  email: "info@hybpreventionconseil.ca",
  slogan: "Un espace propre, l’esprit léger.",
  tagline: "La propreté, pensée pour vous.",
  description: "Grand ménage, nettoyage de déménagement et entretien de locations de courte durée : retrouvez un espace propre, frais et accueillant, sans complications.",
};

export const services = [
  {
    number: "01",
    name: "Grand ménage",
    short: "Un nettoyage en profondeur qui redonne de l’éclat à chaque pièce.",
    image: "/images/deep-clean.webp",
    list: ["Cuisine et salle de bain", "Plinthes et surfaces", "Intérieur des armoires sur demande", "Électroménagers et comptoirs", "Sols, coins et endroits difficiles d’accès"],
  },
  {
    number: "02",
    name: "Nettoyage de déménagement",
    short: "Une remise en état soignée avant de partir ou de vous installer.",
    image: "/images/move-out.webp",
    list: ["Nettoyage complet des pièces", "Cuisine et électroménagers", "Salles de bain et sanitaires", "Armoires, placards et tiroirs", "Planchers et surfaces vitrées accessibles"],
  },
  {
    number: "03",
    name: "Entretien de locations",
    short: "Un espace propre et prêt à accueillir les prochains voyageurs.",
    image: "/images/airbnb.webp",
    list: ["Nettoyage entre deux séjours", "Cuisine et salle de bain", "Lits et linge sur demande", "Poubelles et recyclage", "Vérification visuelle des espaces"],
  },
];

export const faqs = [
  { q: "Combien coûte un nettoyage?", a: "Le prix dépend de la superficie, de l’état des lieux et du type de nettoyage demandé. Décrivez-nous votre espace pour obtenir une proposition adaptée." },
  { q: "Quels types d’espaces pouvez-vous nettoyer?", a: "Ce modèle de site présente le grand ménage résidentiel, le nettoyage de déménagement et l’entretien de locations. Précisez votre adresse et le type d’espace pour confirmer la disponibilité." },
  { q: "Dois-je fournir les produits de nettoyage?", a: "Indiquez vos préférences ou restrictions concernant les produits et le matériel. Les modalités seront confirmées avant toute intervention." },
  { q: "Combien de temps dure le nettoyage?", a: "La durée varie selon la taille de l’espace, son état et les tâches à effectuer. Une estimation pourra être communiquée lors de la prise de contact." },
  { q: "Peut-on prévoir un entretien régulier?", a: "Vous pouvez faire une demande pour un entretien ponctuel ou récurrent. Les fréquences et disponibilités seront précisées dans la proposition." },
  { q: "Faites-vous le nettoyage avant ou après un déménagement?", a: "Oui, c’est l’un des services présentés sur cette page. Décrivez la superficie et l’état du logement pour obtenir une estimation." },
  { q: "Comment demander un devis?", a: "Remplissez le formulaire en indiquant le service, le type de logement et vos besoins. Vous pouvez également nous joindre par téléphone ou par courriel." },
];

export const expertiseCards = [
  { name: "Grand ménage", service: "Nettoyage en profondeur", quote: "Un soin particulier apporté aux cuisines, salles de bain et surfaces souvent oubliées." },
  { name: "Avant emménagement", service: "Nouvel espace", quote: "Préparer un intérieur propre et accueillant avant de déposer ses boîtes." },
  { name: "Après déménagement", service: "Remise en état", quote: "Faire place nette avant une remise des clés ou une nouvelle occupation." },
  { name: "Locations de courte durée", service: "Entre deux séjours", quote: "Accorder de l’attention aux détails qui rendent un espace agréable à retrouver." },
  { name: "Espaces du quotidien", service: "Entretien personnalisé", quote: "Adapter les tâches au rythme de vie, à la superficie et aux priorités du lieu." },
  { name: "Souci du détail", service: "Finitions soignées", quote: "Ne pas oublier les coins, rebords, plinthes et surfaces qui font la différence." },
];
