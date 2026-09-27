// Built-in answer bank for the chat widget. knowledge.md holds the entries:
//
//   ## entry-id
//   keys: multi word phrase, keyword, another phrase
//   kind: smalltalk            (optional — ranks below Python topics)
//   Answer in a markdown subset: **bold**, `code`, ``` fenced blocks ```
//
// Scoring: a multi-word key found as a phrase = 2 + its word count; a single keyword = 2.
// Any matching Python/site topic beats smalltalk ("hi, how do lists work?" → lists); ties go to
// the entry listed first; nothing matches → `fallback`.
// ponytail: keyword scoring, no NLP — when a question misses, add synonyms to that entry's `keys:`.

const STOPWORDS = new Set(
  (
    'a an the is are was were be do does did i im me my you your we it its to of in on for with and or ' +
    'how what whats why when where which can could would should will use using get make about tell ' +
    'explain please pls give show example examples mean means work works python py'
  ).split(' '),
);

const normalize = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9_+#]+/g, ' ')
    .trim();
// Crude plural folding so "lists" matches "list" (keeps "class", "pass" intact)
const stem = (w) => (w.length > 3 && w.endsWith('s') && !w.endsWith('ss') ? w.slice(0, -1) : w);
const stemAll = (s) => s.split(' ').map(stem).join(' ');

/** @param {string} raw contents of knowledge.md */
export function parseKnowledge(raw) {
  return raw
    .split(/^## /m)
    .slice(1)
    .map((block) => {
      const [head, ...lines] = block.split('\n');
      const meta = {};
      while (lines.length && /^(keys|kind):/.test(lines[0])) {
        const [name, ...rest] = lines.shift().split(':');
        meta[name] = rest.join(':').trim();
      }
      return {
        id: head.trim(),
        smalltalk: meta.kind === 'smalltalk',
        keys: [
          ...new Set(
            (meta.keys || '')
              .split(',')
              .map((k) => stemAll(normalize(k)))
              .filter(Boolean),
          ),
        ],
        answer: lines.join('\n').trim(),
      };
    });
}

/**
 * @param {string} raw contents of knowledge.md
 * @returns {{ match: (question: string) => {id: string, answer: string}, answer: (question: string, now?: Date) => string }}
 */
export function createAnswerer(raw) {
  const entries = parseKnowledge(raw);
  const fallback = entries.find((e) => e.id === 'fallback');
  if (!fallback) throw new Error('knowledge.md needs a "## fallback" entry');

  function match(question) {
    const words = normalize(question).split(' ').filter(Boolean);
    const phraseText = ` ${stemAll(words.join(' '))} `;
    const tokens = new Set(words.filter((w) => !STOPWORDS.has(w)).map(stem));

    const score = (entry) =>
      entry.keys.reduce((sum, key) => {
        if (key.includes(' ')) return phraseText.includes(` ${key} `) ? sum + 2 + key.split(' ').length : sum;
        return tokens.has(key) ? sum + 2 : sum;
      }, 0);

    const best = { topic: [null, 0], smalltalk: [null, 0] };
    for (const entry of entries) {
      const s = score(entry);
      const slot = best[entry.smalltalk ? 'smalltalk' : 'topic'];
      if (s > slot[1]) {
        slot[0] = entry;
        slot[1] = s;
      }
    }
    return best.topic[0] ?? best.smalltalk[0] ?? fallback;
  }

  function answer(question, now = new Date()) {
    return match(question)
      .answer.replaceAll('{time}', now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }))
      .replaceAll('{date}', now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' }));
  }

  return { match, answer };
}
