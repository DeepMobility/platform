const tips = [{
  value: "<b>Toutes les 2 heures</b>, programmez une pause mobilité pour réduire de <b>50 %</b> les douleurs musculo-squelettiques.",
  source: "Étude ANACT, 2022",
  highlightedNumber: "50%",
}, {
  value: "<b>Un écran mal positionné</b> peut augmenter les tensions cervicales de <b>60 %</b>, alors ajustez-le à hauteur des yeux.",
  source: "Institut de recherche en santé au travail (IRSST), 2023",
  highlightedNumber: "60%",
}, {
  value: "<b>Une posture correcte</b> réduit la fatigue musculaire de <b>25 %</b> et améliore la circulation sanguine, diminuant les douleurs lombaires et cervicales.",
  source: "Étude INRS, 2023",
  highlightedNumber: "25%",
}, {
  value: "<b>Les gestes répétitifs</b> augmentent le risque de TMS de <b>43 %</b>, mais prendre <b>5 minutes</b> pour vos poignets aujourd'hui peut réduire ces douleurs de <b>30 %</b>.",
  source: "Rapport Assurance Maladie - Risques professionnels, 2022",
  highlightedNumber: "43%",
}, {
  value: "<b>5 minutes</b> de routine matinale augmentent l'énergie perçue de <b>40 %</b> et diminuent la fatigue de <b>25 %</b> dès le réveil.",
  source: "Étude ANSES sur les bénéfices des routines actives, 2023",
  highlightedNumber: "40%",
}, {
  value: "<b>Une bonne hydratation</b> améliore la récupération musculaire de <b>20 %</b>, alors pensez à boire un verre d'eau après chaque routine DeepMobility.",
  source: "OMS, Rapport mondial sur la santé et l’hydratation, 2023",
  highlightedNumber: "20%",
}, {
  value: "<b>5 minutes</b> de mobilité peuvent compenser les effets négatifs d'<b>une heure de posture assise</b> et réduire le risque de douleurs lombaires de <b>50 %</b>.",
  source: "Étude Santé publique France, 2023",
  highlightedNumber: "50%",
}, {
  value: "<b>Une pratique quotidienne</b> réduit les douleurs chroniques liées aux TMS de <b>40 %</b> après <b>6 mois</b> d'engagement",
  source: "Étude Assurance Maladie, 2022",
  highlightedNumber: "40%",
}, {
  value: "<b>7 000 à 10 000 pas par jour</b> diminuent les risques de maladies cardiovasculaires de <b>30 %</b> et augmentent l'espérance de vie.",
  source: "Organisation mondiale de la santé (OMS), 2022",
  highlightedNumber: "30%",
}, {
  value: "Faire une pause active <b>toutes les 90 minutes</b> améliore la concentration de <b>30 %</b> et diminue la fatigue mentale. Bouger, c’est aussi rebooster son cerveau.",
  source: "INSERM, 2022",
  highlightedNumber: "30%",
}, {
  value: "Des mouvements doux ciblant la nuque peuvent réduire les tensions cervicales de <b>45 %</b> chez les personnes travaillant devant un écran plus de 6h par jour",
  source: "Revue Européenne de Kinésithérapie, 2023",
  highlightedNumber: "45%",
}, {
  value: "<b>10 minutes</b> de mouvements articulaires par jour améliorent la mobilité des épaules et réduisent le risque de tendinite de <b>35 %</b>.",
  source: "Société Française de Rhumatologie, 2023",
  highlightedNumber: "35%",
}, {
  value: "Une respiration profonde régulière <b>3 fois par jour</b> réduit les pics de stress au travail de <b>50 %</b>. Ajoutez-la à vos routines DeepMobility.",
  source: "Université de Stanford, Étude Neurosciences, 2023",
  highlightedNumber: "50%",
}, {
  value: "Travailler avec les jambes croisées augmente la pression sur la colonne de <b>27 %</b>, une routine de mobilité ciblée peut compenser cet effet en 4 minutes.",
  source: "Ergonomics International Journal, 2022",
  highlightedNumber: "27%",
}, {
  value: "Bouger les chevilles et les pieds <b>2 fois par jour</b> diminue le risque de mauvaise circulation et de jambes lourdes de <b>40 %</b>.",
  source: "Association Française de Kinésithérapie Fonctionnelle, 2023",
  highlightedNumber: "40%",
}, {
  value: "L’alternance mouvement/repos active la mémoire à court terme, améliorant les capacités d’analyse au travail. <b>6 minutes</b> suffisent pour réactiver vos fonctions cognitives.",
  source: "Journal of Occupational Health Psychology, 2023",
  highlightedNumber: "6",
}, {
  value: "Interrompre la position assise <b>toutes les 30 minutes</b> réduit la glycémie de <b>24 %</b> chez les employés de bureau, améliorant la santé métabolique.",
  source: "Diabetologia, 2014",
  highlightedNumber: "24%",
}, {
  value: "<b>4 minutes</b> de mouvements doux suffisent à stimuler la production de BDNF (facteur neurotrophique), améliorant la mémoire et la concentration de <b>32 %</b>.",
  source: "Frontiers in Psychology, 2021",
  highlightedNumber: "32%",
}, {
  value: "Une mobilité régulière au travail réduit les douleurs musculo-squelettiques de <b>41 %</b> sur 6 mois. ",
  source: "Revue scientifique Cochrane, 2020 – Revue systématique sur la prévention des TMS",
  highlightedNumber: "41%",
}, {
  value: "Les exercices de mobilité augmentent le débit sanguin musculaire de <b>25 %</b>, favorisant une meilleure récupération et moins de douleurs posturales.",
  source: "Journal of Applied Physiology, 2019",
  highlightedNumber: "25%",
}, {
  value: "Les étirements actifs de <b>5 minutes</b> réduisent le stress perçu de <b>23 %</b> chez les travailleurs sédentaires.",
  source: "Scandinavian Journal of Work, Environment & Health, 2022",
  highlightedNumber: "23%",
}, {
  value: "Une pratique corporelle quotidienne <b>mobilité + respiration</b> régule le système nerveux autonome et réduit de <b>30 %</b> les signes de stress chronique.",
  source: "Journal of Psychosomatic Research, 2021",
  highlightedNumber: "30%",
}, {
  value: "Une routine de mouvement quotidienne améliore la variabilité cardiaque de <b>18 %</b>, signe d’un meilleur équilibre entre stress et récupération.",
  source: "European Journal of Preventive Cardiology, 2022",
  highlightedNumber: "18%",
}]

export default tips