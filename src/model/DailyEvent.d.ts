export interface DailyEvent {
    title?: string,
    date: Date,
    players: string | string[],
    content: string
}