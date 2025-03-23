const courses = [
  {
    value: 'standing',
    label: 'Position debout prolongée',
    videos: [{
      title: 'Alléger vos jambes',
      objectives: [{
        title: 'Souplesse et relaxation',
        description: 'Apprendre des exercices pour relâcher les tensions dans les jambes et le bas du dos.'
      }, {
        title: 'Respiration synchronisée',
        description: 'Maîtriser la coordination entre mouvements et respiration.'
      }, {
        title: 'Posture et équilibre',
        description: 'Maintenir une bonne posture pendant les exercices.'
      }, {
        title: 'Autonomie',
        description: 'Intégrer ces exercices dans son quotidien.'
      }],
      skills: [
        'Réaliser des étirements simples et progressifs pour les mollets et le bas du dos.',
        'Coordonner respiration et mouvements pour maximiser les bienfaits.',
        'Identifier les tensions corporelles et appliquer des solutions pour les soulager.',
      ],
      content: [{
        title: 'Mobilisation douce des chevilles',
        series: '(30 secondes, 2 séries)',
        description: 'Développement de la circulation sanguine et échauffement des jambes.',
      }, {
        title: 'Étirement des mollets avec appui',
        series: '(20 secondes par jambe, 2 séries)',
        description: 'Assouplissement des mollets et prévention des raideurs.',
      }, {
        title: 'Flexion avant relaxante',
        series: '(20 secondes, 2 séries)',
        description: 'Détente du bas du dos et amélioration de la posture.',
      }, {
        title: 'Rotations des hanches',
        series: '(5 rotations par sens, 2 séries)',
        description: 'Mobilisation du bassin et réduction des tensions lombaires.',
      }, {
        title: 'Étirement axial synchronisé à la respiration',
        series: '(10 secondes, 3 répétitions)',
        description: 'Alignement de la colonne vertébrale et sensation de légèreté.',
      }]
    }, {
      title: 'Boostez votre énergie',
      objectives: [{
        title: 'Circulation sanguine',
        description: 'Activer les mollets et les cuisses pour améliorer la circulation.'
      }, {
        title: 'Souplesse musculaire',
        description: 'Étendre les muscles pour réduire les tensions accumulées.'
      }, {
        title: 'Coordination motrice',
        description: 'Améliorer la fluidité des mouvements.'
      }],
      skills: [
        'Exécuter des mouvements dynamiques et statiques pour stimuler la circulation sanguine.',
        'Renforcer les muscles des jambes et des chevilles pour une meilleure stabilité.',
        'Synchroniser respiration et mouvement pour un travail efficace.',
      ],
      content: [{
        title: 'Montées sur demi-pointes',
        series: '(10 répétitions, 2 séries)',
        description: "Renforcement des mollets et amélioration de l'équilibre.",
      }, {
        title: 'Étirement des mollets avec appui',
        series: '(20 secondes par jambe, 2 séries)',
        description: 'Soulagement des jambes lourdes et amélioration de la souplesse.',
      }, {
        title: 'Flexions dynamiques des genoux',
        series: '(10 répétitions, 2 séries)',
        description: 'Activation des muscles des cuisses et amélioration de la posture.',
      }, {
        title: 'Pas latéraux alternés',
        series: '(30 secondes, 2 séries)',
        description: 'Mobilisation des jambes et stimulation de la coordination.',
      }, {
        title: 'Étirement des quadriceps debout',
        series: '(15 secondes par jambe, 2 séries)',
        description: 'Amélioration de la souplesse des cuisses et réduction des tensions dans les genoux.',
      }]
    }, {
      title: 'Renforcez votre posture',
      objectives: [{
        title: 'Renforcement musculaire',
        description: 'Augmenter la stabilité et la puissance des jambes.'
      }, {
        title: 'Posture et équilibre',
        description: 'Optimiser l’alignement corporel.'
      }, {
        title: 'Prévention des tensions',
        description: 'Réduire les tensions musculaires grâce à des étirements ciblés.'
      }],
      skills: [
        'Exécuter des fentes et des squats avec une posture correcte.',
        'Améliorer la force des quadriceps, mollets et muscles stabilisateurs.',
        'Renforcer la coordination et la fluidité des mouvements.',
      ],
      content: [{
        title: 'Fentes dynamiques',
        series: '(10 répétitions par jambe, 2 séries)',
        description: 'Renforcement des quadriceps, fessiers et stabilisateurs des hanches.',
      }, {
        title: 'Squats légers avec appui',
        series: '(10 répétitions, 2 séries)',
        description: 'Amélioration de la souplesse des hanches et des genoux.',
      }, {
        title: 'Montées de genoux croisées',
        series: '(30 secondes, 2 séries)',
        description: 'Mobilisation des hanches et renforcement des abdominaux obliques.',
      }, {
        title: 'Étirement des ischio-jambiers',
        series: '(20 secondes par jambe, 2 séries)',
        description: 'Réduction des tensions dans le bas du dos et les jambes.',
      }, {
        title: 'Mobilisation des chevilles',
        series: '(10 répétitions, 2 séries)',
        description: 'Renforcement des chevilles et prévention des raideurs.',
      }]
    }, {
      title: 'Étirez votre dos',
      objectives: [{
        title: 'Détente et relaxation',
        description: 'Relâcher les tensions dans le dos, les jambes et les flancs.'
      }, {
        title: 'Souplesse',
        description: 'Améliorer la mobilité des articulations et des muscles.'
      }, {
        title: 'Posture globale',
        description: 'Favoriser une posture plus fluide et équilibrée.'
      }],
      skills: [
        'Exécuter des mouvements visant la relaxation du dos, des mollets et des flancs.',
        'Améliorer l’alignement corporel grâce à des étirements ciblés.',
        'Identifier les tensions musculaires et appliquer les techniques d’étirement appropriées.',
      ],
      content: [{
        title: 'Étirement des mollets en position inclinée',
        series: '(20 secondes par jambe, 2 séries)',
        description: 'Amélioration de la souplesse et soulagement des tensions.',
      }, {
        title: 'Mobilisation dynamique des chevilles',
        series: '(30 secondes, 2 séries)',
        description: 'Amélioration de la mobilité des chevilles et des mollets.',
      }, {
        title: 'Flexion avant avec ouverture des bras',
        series: '(10 répétitions, 2 séries)',
        description: 'Détente du dos et renforcement des épaules.',
      }, {
        title: 'Étirement latéral pour les flancs',
        series: '(15 secondes par côté, 2 séries)',
        description: 'Soulagement des tensions dans les obliques et amélioration de la posture.',
      }, {
        title: 'Rotations des hanches',
        series: '(5 rotations par sens, 2 séries)',
        description: 'Mobilisation du bassin pour détendre le bas du dos.',
      }]
    }, {
      title: 'Mobilité globale',
      objectives: [{
        title: 'Améliorer la mobilité générale',
        description: 'Apprendre des exercices favorisant la souplesse et la fluidité des mouvements.'
      }, {
        title: "Optimiser la posture et l'équilibre",
        description: "Renforcer la stabilité et l'alignement du corps."
      }, {
        title: 'Coordonner respiration et mouvement',
        description: 'Intégrer une respiration fluide à chaque étirement pour maximiser les bienfaits.'
      }, {
        title: "Favoriser l'autonomie",
        description: "Permettre l'intégration de ces exercices dans le quotidien."
      }],
      skills: [
        'Exécuter des mouvements de mobilisation articulaire et musculaire de manière fluide et contrôlée.',
        "Utiliser la respiration comme support à l'étirement et au relâchement musculaire.",
        'Identifier les tensions corporelles et appliquer les exercices appropriés pour les soulager.',
      ],
    }]
  },
  {
    value: 'repetitive-gestures',
    label: 'Mouvements répétitifs et port de charges',
  },
  {
    value: 'sitting',
    label: 'Posture assise prolongée'
  },
]

export default courses