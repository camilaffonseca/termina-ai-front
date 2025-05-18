export type UserChairPositions = number | 'random-standing'

export type User = {
  socketChannelId: string | null
  sessionId: string
  nickname: string
  chairPosition: UserChairPositions

  meta: {
    createdAt: string
    lastSeenAt: string
  }
}

export type CurrentUserInfo = {
  type: 'auditorium' | 'terminator' | 'terminated'
}
