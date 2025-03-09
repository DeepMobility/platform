const sessionQuestions = [
  {
    value: 'overall-feeling',
    label: "Sur une échelle de 1 à 5, comment évaluez-vous l'impact de DeepMobility sur votre bien-être au travail ?",
    type: "rating"
  },
  {
    value: 'memorization',
    label: "Avez-vous intégré certains mouvements ou routines de DeepMobility en dehors des séances proposées ?",
    type: "choices",
    choices: [{
      value: "yes",
      label: "Oui, j'applique régulièrement certains exercices dans ma journée"
    }, {
      value: "sometimes",
      label: "Oui, mais pas systématiquement"
    }, {
      value: "no",
      label: "Non, uniquement lors des séances sur la plateforme"
    }]
  },
  {
    value: 'pain-reduction',
    label: "Sur une échelle de 1 à 5, dans quelle mesure avez-vous ressenti une diminution des tensions ou douleurs corporelles depuis le début du programme ?",
    type: "rating"
  },
  {
    value: 'user-experience',
    label: "Quel aspect de DeepMobility pourrait être amélioré selon vous ?",
    type: "choices",
    choices: [{
      value: "video-diversity",
      label: "La diversité des vidéos et des routines proposées"
    }, {
      value: "personalization",
      label: "Le suivi et la personnalisation de mon parcours"
    }, {
      value: "nothing",
      label: "Rien, tout est top !"
    }]
  },
  {
    value: 'commitment',
    label: "Quelle est votre motivation à poursuivre DeepMobility sur le long terme ?",
    type: "choices",
    choices: [{
      value: "high",
      label: "Très motivé, j'adore cette routine"
    }, {
      value: "medium",
      label: "Motivé, mais j'aimerais encore plus de variété"
    }, {
      value: "low",
      label: "J'apprécie, mais j'ai besoin d'un coup de boost pour rester régulier"
    }]
  },
]

export default sessionQuestions