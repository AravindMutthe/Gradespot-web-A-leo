// Curated discovery set (Das verdict 2026-10-29, owner-adopted the
// same day): the discovery grids show ONLY the largest topics, so
// the catalogue is not duplicated in two formats. The set is a rule,
// not a hardcoded list: the 6 largest topics by course count,
// computed from catalogue data. The sort is stable, so ties keep
// declared repo order. The full directory boards below the curated
// grids stay complete and unchanged.

import { topicCategories, type TopicCategory } from "@/lib/two-door";

export const CURATED_TOPIC_COUNT = 6;

export function curatedTopicCategories(): TopicCategory[] {
  return [...topicCategories()]
    .sort((a, b) => b.count - a.count)
    .slice(0, CURATED_TOPIC_COUNT);
}
