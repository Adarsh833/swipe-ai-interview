export interface EvaluationResult {
  score: number;
  summary: string;
}

export function evaluateInterview(
  questions: string[],
  answers: string[]
): EvaluationResult {

  let totalScore = 0;

  answers.forEach((answer) => {
    if (answer.trim().length > 20) {
      totalScore += 25;
    }
  });

  const finalScore = Math.min(totalScore, 100);

  const summary =
    finalScore > 70
      ? "Strong understanding of concepts."
      : finalScore > 40
      ? "Moderate understanding with gaps."
      : "Insufficient depth in responses.";

  return {
    score: finalScore,
    summary,
  };
}