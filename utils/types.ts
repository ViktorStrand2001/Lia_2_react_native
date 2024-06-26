export interface Card {
  Title: string
  Instructions: string
  Rules: string
  YouWillNeed: string
  Time: number
  Gamemode: string
}

export interface Quiz {
  Context: string
  Answer: boolean
  Title: string
}

export interface Player {
  name: string
  score: number
  id: number
  points: number
  turn: number
  timer: number
  right: number
  wrong: number
}
