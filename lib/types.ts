export interface Profile {
  id: string
  clerk_id: string
  username: string
  display_name: string
  avatar_emoji: string
  avatar_color: string
  photo_url?: string
  age_group?: string
  hobbies: string[]
  created_at: string
  updated_at: string
}

export interface Favorite {
  id: string
  clerk_id: string
  activity_title: string
  activity_icon: string
  created_at: string
}

export interface Friendship {
  id: string
  requester_id: string
  addressee_id: string
  status: 'pending' | 'accepted' | 'rejected'
  created_at: string
}

export interface Activity {
  icon: string
  title: string
  description: string
  tags: string[]
  hobby: string
  time: string
  difficulty: 'let' | 'mellem' | 'svær'
  needs: string[]
  tips: string
}

export interface Streak {
  id: string
  clerk_id: string
  current_streak: number
  last_completed_date: string | null
  updated_at: string
}

export interface ChallengeCompletion {
  id: string
  clerk_id: string
  challenge_title: string
  completed_date: string
  created_at: string
}

export type AgeGroup = '3-5' | '6-8' | '9-11' | '12-14' | '15-17' | '18+'
export type GroupSize = 'solo' | '2' | '3-5' | '6+'
export type WeatherFilter = 'alle' | 'sol' | 'regn' | 'sne' | 'varmt'

export type ActivityTag =
  | 'aktiv'
  | 'rolig'
  | 'kreativ'
  | 'udendørs'
  | 'indendørs'
  | 'solo'
  | 'gruppe'
