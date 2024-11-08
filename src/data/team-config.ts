export const TEAM_LEADER_CONTRIBUTION = 40;
export const calculateParticipantContributions = (participantCount: number) => {
  const remainingPercentage = 100 - TEAM_LEADER_CONTRIBUTION;
  const perParticipant = Math.floor(remainingPercentage / participantCount);
  return {
    perParticipant,
    lastParticipantContribution: remainingPercentage - (perParticipant * (participantCount - 1))
  };
};