// Small Python code block with just enough colouring to read as real code:
// keywords in the accent, string literals in the code-string colour, output lines muted.
// ponytail: regex tokeniser for short marketing snippets, not a real parser.

const STRING = /("[^"]*"|'[^']*')/;
const KEYWORD = /\b(def|class|for|in|if|not|return|import|from|with|as|while|True|False|None)\b/;

function highlight(line) {
  return line.split(STRING).map((chunk, i) =>
    i % 2 ? (
      <span key={i} className="text-code-string">
        {chunk}
      </span>
    ) : (
      chunk.split(KEYWORD).map((part, j) =>
        j % 2 ? (
          <span key={`${i}-${j}`} className="text-brand">
            {part}
          </span>
        ) : (
          part
        ),
      )
    ),
  );
}

/**
 * @param {{ lines: string[], output?: string[], lineNumbers?: boolean, className?: string }} props
 */
export default function CodeSample({ lines, output = [], lineNumbers = false, className = '' }) {
  return (
    <pre
      className={`overflow-x-auto bg-gray-50 p-4 font-mono text-[13px] leading-relaxed text-gray-800 ${className}`}
    >
      <code>
        {lines.map((line, i) => (
          <span key={i} className="block">
            {lineNumbers && (
              <span className="mr-4 inline-block w-4 select-none text-right text-gray-500" aria-hidden="true">
                {i + 1}
              </span>
            )}
            {line ? highlight(line) : ' '}
          </span>
        ))}
        {output.length > 0 && (
          <span className="mt-3 block border-t border-dashed border-gray-300 pt-3 text-gray-600">
            {output.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </span>
        )}
      </code>
    </pre>
  );
}
