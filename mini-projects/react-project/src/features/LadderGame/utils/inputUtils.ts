export const handleParticipantsChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setParticipants: (participants: number) => void
) => setParticipants(parseInt(e.target.value));

export const handleWinnersChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setNumOfWinners: (participants: number) => void
) => setNumOfWinners(parseInt(e.target.value));
