type Challenge = {
  id: number,
  title: string,
  description: string,
  associationName: string,
  associationLogoUrl: string,
  type: 'individual' | 'team',
  conversionRate: number,
  status: 'pending' | 'active' | 'completed' | 'cancelled',
  startDate: Date,
  endDate: Date,
  goal: number,
  participants: number,
  createdBy: number,
  createdAt: Date,
  updatedAt: Date,
  progress: {
    participantsCount: number,
    totalPoints: number,
    goalAmount: number,
    teamsInfo: {
      [teamId: number]: {
        name: string,
        membersCount: number,
        points: number,
        rank: number
      }
    },
    usersInfo: {
      [userId: number]: {
        name: string,
        points: number,
        rank: number
      }
    },
    currentUserInfo: {
      name: string,
      points: number,
      rank: number
    },
    currentUserTeamInfo: {
      name: string,
      membersCount: number,
      points: number,
      rank: number
    }
  }
}