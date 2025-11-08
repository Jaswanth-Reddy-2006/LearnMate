const blockedTerms = ['badword', 'curse', 'nsfw']

export const containsProfanity = (text: string) => {
  const lower = text.toLowerCase()
  return blockedTerms.some((term) => lower.includes(term))
}
