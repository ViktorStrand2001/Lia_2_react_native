export interface Card {
  title: string
  instructions: string
  rules: string
  youWillNeed: string
  time: number
}

export interface Player {
  name: string
  score: number
  id: number
}