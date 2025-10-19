/**
 * Get personalized reminder message and emoji based on time
 * @param time - Time in HH:MM format (e.g., "08:00")
 * @returns Object with emoji and message
 */
export function getReminderMessageForTime(time: string): { emoji: string; message: string } {
  const [hours] = time.split(':');
  const hour = parseInt(hours);

  if (hour >= 6 && hour < 7) {
    return {
      emoji: '🌅',
      message: 'On bondit du lit ! 6 minutes de micro-routine DeepMobility avant même le café. Le meilleur réveil pour ton corps.'
    };
  } else if (hour >= 7 && hour < 8) {
    return {
      emoji: '🪥',
      message: 'Avant le brossage de dents (3 brossages = ta routine DeepMobility) : fais bouger ton corps avant de faire briller ton sourire.'
    };
  } else if (hour >= 8 && hour < 10) {
    return {
      emoji: '⚡',
      message: 'Allez, on active la machine ! 6 minutes pour réveiller les muscles et lancer la journée du bon pied.'
    };
  } else if (hour >= 10 && hour < 12) {
    return {
      emoji: '🚭',
      message: 'Pause clope ? Oublie-la. 6 minutes de DeepMobility, c\'est le même temps, mais bien plus sain. On fait bouger les épaules et on détend le dos.'
    };
  } else if (hour >= 12 && hour < 14) {
    return {
      emoji: '🍽️',
      message: 'Entre deux bouchées, prends 6 minutes pour relancer digestion et énergie. Ta routine DeepMobility post-déjeuner t\'attend.'
    };
  } else if (hour >= 14 && hour < 16) {
    return {
      emoji: '🥱',
      message: 'Coup de mou ? C\'est le moment parfait pour t\'étirer, relancer la circulation et éviter la posture "statue de bureau". 6 minutes top chrono.'
    };
  } else if (hour >= 16 && hour < 18) {
    return {
      emoji: '💪',
      message: 'Pause mobilité express. On libère les tensions, on s\'étire et on finit la journée plus léger qu\'on l\'a commencée.'
    };
  } else if (hour >= 18 && hour < 20) {
    return {
      emoji: '🏃',
      message: 'Fin de journée, mais pas fin de mouvement. Que tu aies été assis, debout ou en action, accorde-toi 6 minutes pour relancer le corps, détendre les zones sollicitées et prévenir les douleurs du quotidien.'
    };
  } else if (hour >= 20 && hour < 21) {
    return {
      emoji: '🌙',
      message: 'Routine douceur du soir : quelques mouvements pour libérer les tensions accumulées et préparer une nuit paisible.'
    };
  } else if (hour >= 21 && hour < 22) {
    return {
      emoji: '📱',
      message: 'Lâche ton écran, garde le mouvement. Une micro-routine DeepMobility pour finir la journée en souplesse et bien-être.'
    };
  } else {
    // Default message for other times (22h-6h)
    return {
      emoji: '🧘',
      message: 'C\'est l\'heure de votre routine bien-être quotidienne ! Prenez quelques minutes pour prendre soin de vous et améliorer votre mobilité.'
    };
  }
}

