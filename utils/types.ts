export interface Card {
  Title: string
  Instructions: string
  Rules: string
  YouWillNeed: string
  Time: number
  GameType: string
}

export interface Player {
  name: string
  score: number
  id: number
}
