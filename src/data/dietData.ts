export interface DietRecommendation {
  disease: string;
  hindiName: string;
  symptoms: string;
  ayurvedicHerbs: string;
  formulation: string;
  doshas: string;
  constitution: string;
  dietRecommendations: string;
  yoga: string;
  prevention: string;
  patientRecommendations: string;
}

// Parsed diet data from CSV
export const dietDatabase: DietRecommendation[] = [
  {
    disease: "Cough",
    hindiName: "खांसी",
    symptoms: "Sore throat, chest congestion",
    ayurvedicHerbs: "Tulsi, Ashwagandha",
    formulation: "Ginger (2g), Honey (1 tsp)",
    doshas: "Vata, Kapha",
    constitution: "Vata-Kapha",
    dietRecommendations: "Avoid cold foods; stay hydrated; consume warm liquids. Take ginger tea with honey 2-3 times daily. Include turmeric milk before bed.",
    yoga: "Anulom Vilom, Pranayama",
    prevention: "Avoid irritants, keep throat warm, avoid cold drinks",
    patientRecommendations: "Stay hydrated, rest well, gargle with warm salt water"
  },
  {
    disease: "Diabetes",
    hindiName: "मधुमेह",
    symptoms: "Frequent urination, fatigue",
    ayurvedicHerbs: "Jamun, Gudmar",
    formulation: "Fenugreek (3g daily), Bitter gourd juice (50ml)",
    doshas: "Pitta, Kapha",
    constitution: "Kapha",
    dietRecommendations: "Avoid sugary foods; focus on low-GI foods; regular exercise. Include bitter gourd, fenugreek seeds soaked overnight. Avoid white rice, replace with brown rice.",
    yoga: "Surya Namaskar, Pranayama",
    prevention: "Regular exercise, healthy diet, weight management",
    patientRecommendations: "Monitor blood sugar regularly, maintain healthy weight"
  },
  {
    disease: "Hypertension",
    hindiName: "उच्च रक्तचाप",
    symptoms: "High blood pressure, stress",
    ayurvedicHerbs: "Ashwagandha, Arjuna",
    formulation: "Ashwagandha (5g daily), Arjuna bark powder (3g)",
    doshas: "Pitta, Vata",
    constitution: "Pitta",
    dietRecommendations: "Reduce salt; practice yoga and meditation; avoid spicy foods. Include garlic, leafy greens, and hibiscus tea. Limit caffeine and alcohol.",
    yoga: "Surya Namaskar, Meditation, Shavasana",
    prevention: "Salt restriction, regular exercise, stress management",
    patientRecommendations: "Monitor BP regularly, limit salt, exercise daily"
  },
  {
    disease: "Migraine",
    hindiName: "माइग्रेन",
    symptoms: "Severe headache, nausea",
    ayurvedicHerbs: "Brahmi, Jatamansi",
    formulation: "Peppermint (2 drops in water), Brahmi powder (2g)",
    doshas: "Pitta, Vata",
    constitution: "Pitta-Vata",
    dietRecommendations: "Maintain regular meal times; avoid bright lights; stay hydrated. Avoid cheese, chocolate, and processed foods. Include magnesium-rich foods.",
    yoga: "Anulom Vilom, Pranayama, Meditation",
    prevention: "Stress management, regular sleep, avoid triggers",
    patientRecommendations: "Sleep well, avoid triggers, stay hydrated"
  },
  {
    disease: "Arthritis",
    hindiName: "गठिया",
    symptoms: "Joint pain, swelling",
    ayurvedicHerbs: "Ashwagandha, Guggul",
    formulation: "Turmeric (1/2 tsp), Milk (200ml), Ginger paste",
    doshas: "Vata, Kapha",
    constitution: "Vata",
    dietRecommendations: "Consume anti-inflammatory foods; stay active; avoid cold exposure. Include turmeric milk daily. Avoid cold, raw foods. Prefer warm, cooked meals.",
    yoga: "Yoga for flexibility, Gentle stretching",
    prevention: "Weight management, regular exercise, stay warm",
    patientRecommendations: "Exercise daily, apply warm oil massage"
  },
  {
    disease: "Common Cold",
    hindiName: "सामान्य सर्दी",
    symptoms: "Runny nose, sneezing, mild fever",
    ayurvedicHerbs: "Tulsi, Ginger",
    formulation: "Tulsi leaves (5), Ginger (1g), Honey",
    doshas: "Kapha, Vata",
    constitution: "Kapha",
    dietRecommendations: "Rest well; consume warm foods; avoid dairy temporarily. Take tulsi-ginger tea. Include pepper in meals. Avoid cold drinks and ice cream.",
    yoga: "Pranayama, Anulom Vilom",
    prevention: "Good hygiene, adequate rest, vitamin C intake",
    patientRecommendations: "Hydration, rest, steam inhalation"
  },
  {
    disease: "Acidity",
    hindiName: "अम्लपित्त",
    symptoms: "Heartburn, bloating, acid reflux",
    ayurvedicHerbs: "Amla, Licorice",
    formulation: "Amla powder (3g), Cold milk, Fennel seeds",
    doshas: "Pitta",
    constitution: "Pitta",
    dietRecommendations: "Avoid spicy, oily foods; eat at regular intervals; include cooling foods. Drink coconut water. Avoid citrus fruits and tomatoes. Eat slowly.",
    yoga: "Vajrasana after meals, Pranayama",
    prevention: "Regular meal times, avoid overeating, reduce stress",
    patientRecommendations: "Eat small frequent meals, avoid lying down after eating"
  },
  {
    disease: "Constipation",
    hindiName: "कब्ज",
    symptoms: "Difficulty in bowel movement, bloating",
    ayurvedicHerbs: "Triphala, Isabgol",
    formulation: "Triphala powder (5g) with warm water at night",
    doshas: "Vata",
    constitution: "Vata",
    dietRecommendations: "Increase fiber intake; drink plenty of water; regular exercise. Include papaya, prunes, and leafy greens. Avoid processed foods.",
    yoga: "Pavanamuktasana, Walking",
    prevention: "High fiber diet, adequate hydration, regular exercise",
    patientRecommendations: "Drink warm water in morning, eat fiber-rich foods"
  },
  {
    disease: "Insomnia",
    hindiName: "अनिद्रा",
    symptoms: "Difficulty sleeping, restlessness",
    ayurvedicHerbs: "Ashwagandha, Brahmi",
    formulation: "Ashwagandha (3g) with warm milk before bed",
    doshas: "Vata, Pitta",
    constitution: "Vata",
    dietRecommendations: "Avoid caffeine; maintain sleep schedule; warm milk at night. Include cherries and almonds. Avoid heavy dinner. Light dinner 2 hours before bed.",
    yoga: "Yoga Nidra, Shavasana, Meditation",
    prevention: "Regular sleep schedule, avoid screens before bed",
    patientRecommendations: "Create dark, quiet sleep environment"
  },
  {
    disease: "Obesity",
    hindiName: "मोटापा",
    symptoms: "Excess weight, fatigue, breathlessness",
    ayurvedicHerbs: "Guggul, Triphala",
    formulation: "Triphala (3g), Honey, Warm water morning",
    doshas: "Kapha",
    constitution: "Kapha",
    dietRecommendations: "Reduce carbs and fats; regular exercise; avoid snacking. Include bitter gourd, leafy greens. Avoid sweets and fried foods. Eat mindfully.",
    yoga: "Surya Namaskar, Kapalbhati, Brisk walking",
    prevention: "Regular exercise, balanced diet, portion control",
    patientRecommendations: "Exercise 45 mins daily, avoid emotional eating"
  },
  {
    disease: "Skin Disorders",
    hindiName: "त्वचा रोग",
    symptoms: "Itching, rashes, dry skin",
    ayurvedicHerbs: "Neem, Manjistha",
    formulation: "Neem leaves paste, Turmeric (1/2 tsp) with milk",
    doshas: "Pitta, Kapha",
    constitution: "Pitta",
    dietRecommendations: "Avoid spicy, fermented foods; include bitter vegetables. Drink neem water. Include cucumber, aloe vera juice. Avoid dairy if allergic.",
    yoga: "Pranayama, Shavasana",
    prevention: "Maintain hygiene, avoid allergens, stay hydrated",
    patientRecommendations: "Keep skin clean, avoid harsh soaps"
  },
  {
    disease: "Anxiety",
    hindiName: "चिंता",
    symptoms: "Restlessness, worry, palpitations",
    ayurvedicHerbs: "Ashwagandha, Brahmi, Jatamansi",
    formulation: "Brahmi powder (2g), Ashwagandha (3g) with warm milk",
    doshas: "Vata",
    constitution: "Vata",
    dietRecommendations: "Include warm, grounding foods; avoid caffeine; regular meals. Include almonds, warm milk. Avoid cold, dry foods. Eat in calm environment.",
    yoga: "Meditation, Pranayama, Yoga Nidra",
    prevention: "Regular routine, adequate sleep, stress management",
    patientRecommendations: "Practice deep breathing, maintain routine"
  }
];

export const getDietByDisease = (disease: string): DietRecommendation | undefined => {
  return dietDatabase.find(d => 
    d.disease.toLowerCase() === disease.toLowerCase() ||
    d.hindiName === disease
  );
};

export const searchDietRecommendations = (query: string): DietRecommendation[] => {
  const lowerQuery = query.toLowerCase();
  return dietDatabase.filter(d => 
    d.disease.toLowerCase().includes(lowerQuery) ||
    d.symptoms.toLowerCase().includes(lowerQuery) ||
    d.hindiName.includes(query)
  );
};

export const getAllDiseases = (): string[] => {
  return dietDatabase.map(d => d.disease);
};
