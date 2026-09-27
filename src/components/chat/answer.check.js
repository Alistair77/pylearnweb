// Self-check for the chat answer bank. Run: node src/components/chat/answer.check.js
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createAnswerer, parseKnowledge } from './answer.js';

const raw = readFileSync(new URL('./knowledge.md', import.meta.url), 'utf8');
const { match, answer } = createAnswerer(raw);

const cases = {
  hi: 'greeting',
  'Hello!': 'greeting',
  'good morning': 'greeting',
  'how are you?': 'how-are-you',
  'thanks!': 'thanks',
  bye: 'goodbye',
  'who are you': 'who-are-you',
  'what can you do?': 'what-can-you-do',
  'tell me a joke': 'joke',
  ok: 'acknowledge',
  'hi, how do lists work?': 'lists',
  'help me with lists': 'lists',
  'how do I reverse a list?': 'reverse-list',
  'what is the difference between a list and tuple': 'list-vs-tuple',
  'what is a dictionary': 'dictionaries',
  'how do dicts work': 'dictionaries',
  'explain list comprehensions': 'list-comprehension',
  'how do I fix IndentationError': 'indentation-error',
  "NameError: name 'x' is not defined": 'name-error',
  'TypeError: can only concatenate str': 'type-error',
  'ModuleNotFoundError: No module named requests': 'module-not-found',
  'what is a class': 'classes',
  'what does __init__ do': 'classes',
  'how does inheritance work': 'inheritance',
  'what is a decorator': 'decorators',
  'how to use pip': 'pip',
  'how do I make a virtual environment': 'venv',
  'how to read a file': 'files',
  'what is python': 'what-is-python',
  'is python hard?': 'what-is-python',
  'where do I start': 'where-to-start',
  'hello world': 'hello-world',
  'how do f-strings work': 'fstrings',
  'for loop example': 'for-loops',
  'what courses do you offer': 'courses',
  'how much does it cost': 'pricing',
  'what time is it': 'time',
  "what's the date today": 'date',
  'how do I format dates in python': 'datetime',
  'give me project ideas': 'project-ideas',
  asdfghjkl: 'fallback',
  'what is the capital of france': 'fallback',
};

const misses = Object.entries(cases)
  .map(([q, id]) => [q, id, match(q).id])
  .filter(([, id, got]) => id !== got)
  .map(([q, id, got]) => `"${q}" → expected ${id}, got ${got}`);
assert.deepEqual(misses, []);

// Templated answers get filled in
const at = new Date(2026, 8, 27, 14, 30);
assert.match(answer('what time is it', at), /2:30/);
assert.match(answer("what's the date today", at), /September 27/);

const count = parseKnowledge(raw).length;
assert.ok(count > 60, `answer bank should have 60+ entries, has ${count}`);
console.log(`answer bank OK — ${Object.keys(cases).length} questions routed correctly, ${count} entries`);
