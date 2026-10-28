/**
 * Safe Shell Command Parser & Tokenizer
 * Strictly performs static lexical analysis. Never executes or evaluates commands.
 */

export function parseShellCommand(rawCommand) {
  if (typeof rawCommand !== 'string') {
    return { segments: [], raw: '', tokens: [], isValid: false, parseError: 'Input must be a string' };
  }

  const trimmed = rawCommand.trim();
  if (!trimmed) {
    return { segments: [], raw: '', tokens: [], isValid: false, parseError: 'Command string is empty' };
  }

  // Tokenize safely respecting single and double quotes
  const segments = [];
  let currentSegment = '';
  let inSingleQuote = false;
  let inDoubleQuote = false;
  let isEscaped = false;

  for (let i = 0; i < trimmed.length; i++) {
    const char = trimmed[i];

    if (isEscaped) {
      currentSegment += char;
      isEscaped = false;
      continue;
    }

    if (char === '\\') {
      isEscaped = true;
      currentSegment += char;
      continue;
    }

    if (char === "'" && !inDoubleQuote) {
      inSingleQuote = !inSingleQuote;
      currentSegment += char;
      continue;
    }

    if (char === '"' && !inSingleQuote) {
      inDoubleQuote = !inDoubleQuote;
      currentSegment += char;
      continue;
    }

    // Check for pipeline / sequence delimiters outside quotes
    if (!inSingleQuote && !inDoubleQuote) {
      if (char === ';') {
        if (currentSegment.trim()) segments.push({ raw: currentSegment.trim(), operator: ';' });
        currentSegment = '';
        continue;
      }

      if (char === '&' && trimmed[i + 1] === '&') {
        if (currentSegment.trim()) segments.push({ raw: currentSegment.trim(), operator: '&&' });
        currentSegment = '';
        i++; // skip next &
        continue;
      }

      if (char === '|' && trimmed[i + 1] === '|') {
        if (currentSegment.trim()) segments.push({ raw: currentSegment.trim(), operator: '||' });
        currentSegment = '';
        i++; // skip next |
        continue;
      }

      if (char === '|') {
        if (currentSegment.trim()) segments.push({ raw: currentSegment.trim(), operator: '|' });
        currentSegment = '';
        continue;
      }
    }

    currentSegment += char;
  }

  if (currentSegment.trim()) {
    segments.push({ raw: currentSegment.trim(), operator: null });
  }

  // Break each segment into binary, flags, and arguments
  const parsedSegments = segments.map((seg) => {
    const tokens = extractTokens(seg.raw);
    const binary = tokens[0] || '';
    const flags = tokens.filter((t) => t.startsWith('-'));
    const args = tokens.slice(1).filter((t) => !t.startsWith('-'));

    return {
      raw: seg.raw,
      operator: seg.operator,
      binary,
      flags,
      args,
      tokens,
    };
  });

  return {
    raw: trimmed,
    segments: parsedSegments,
    isValid: true,
    hasMultipleSegments: parsedSegments.length > 1,
  };
}

function extractTokens(segmentString) {
  const tokens = [];
  let token = '';
  let inSingleQuote = false;
  let inDoubleQuote = false;

  for (let i = 0; i < segmentString.length; i++) {
    const char = segmentString[i];

    if (char === "'" && !inDoubleQuote) {
      inSingleQuote = !inSingleQuote;
      continue;
    }

    if (char === '"' && !inSingleQuote) {
      inDoubleQuote = !inDoubleQuote;
      continue;
    }

    if (/\s/.test(char) && !inSingleQuote && !inDoubleQuote) {
      if (token.length > 0) {
        tokens.push(token);
        token = '';
      }
      continue;
    }

    token += char;
  }

  if (token.length > 0) {
    tokens.push(token);
  }

  return tokens;
}
