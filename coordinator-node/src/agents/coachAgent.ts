export const generateCodeFeedback = (code: string) => {
  const trimmed = code.trim()
  if (!trimmed) {
    return 'Paste your draft code to receive feedback.'
  }
  if (!trimmed.includes('for') && !trimmed.includes('while')) {
    return 'Try using a loop construct here. The lesson focuses on iteration primitives.'
  }
  if (trimmed.includes('while True')) {
    return 'Consider adding a termination condition instead of using a bare while True.'
  }
  if (trimmed.includes('range') && !trimmed.includes('enumerate')) {
    return 'Great use of range. Remember enumerate gives you both index and value when you need them.'
  }
  return 'Looks solid. Run through the quiz to validate your understanding and consider annotating invariants.'
}
