import { useMemo } from 'react'
import { AssessmentResultDTO, RecommendationDTO } from '@/types/grant'

export function useResultsMetrics(results: AssessmentResultDTO["recommendations"] | null, summary: AssessmentResultDTO["summary"] | null) {
  const totalFundingNum = summary?.estimatedFunding || 0;
  const totalFunding = summary?.fundingRange || (totalFundingNum > 0 ? `$${totalFundingNum.toLocaleString()}` : 'TBD');

  const missingFields = useMemo(() => {
    // We no longer have ruleResults available from the backend for missing fields,
    // so this will just return an empty array or we could map from recommendedActions if needed.
    // For now we will return an array of dummy values based on the number of missing questions.
    return []
  }, [results])

  const topTag = useMemo(() => {
    if (!results) return null
    const tags = new Map<string, number>()
    results.readyNow.forEach(match => {
      match.badges?.forEach(tag => {
        tags.set(tag, (tags.get(tag) || 0) + 1)
      })
    })
    if (tags.size === 0) return null
    return Array.from(tags.entries()).sort((a, b) => b[1] - a[1])[0][0]
  }, [results])

  const highlyRecommended = useMemo(() => results?.readyNow.filter(m => m.recommendationScore >= 80) || [], [results])
  const justQualified = useMemo(() => results?.readyNow.filter(m => m.recommendationScore < 80) || [], [results])
  const totalEligibleCount = summary?.totalEligible || 0

  const confidenceValue = summary?.overallConfidence || 0;
  let confidence = "Medium";
  if (confidenceValue > 85) confidence = "Very High";
  else if (confidenceValue > 65) confidence = "High";
  
  const confidenceColor = confidence === "Very High" ? "text-emerald-600" : confidence === "High" ? "text-blue-600" : "text-amber-600"

  const score = summary?.overallCompletion || 0;
  const totalGrants = (summary?.totalEligible || 0) + (summary?.totalPotential || 0) + (summary?.totalRejected || 0);

  return {
    totalFundingNum,
    totalFunding,
    missingFields,
    topTag,
    highlyRecommended,
    justQualified,
    totalEligibleCount,
    confidence,
    confidenceColor,
    score,
    totalGrants
  }
}
