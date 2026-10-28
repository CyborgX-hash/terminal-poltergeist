import { parseShellCommand } from './parser.js';
import { SECURITY_RULES } from './definitions.js';
import { isRecognizedCommand, getTypoSuggestion } from './knownCommands.js';

const SEVERITY_RANKS = {
  Critical: 4,
  High: 3,
  Medium: 2,
  Low: 1,
};

const SPOOKY_COMMENTARIES = {
  Critical: [
    'The scythe strikes deep into the operating system... This path leads only to the graveyard of lost data!',
    'A cold shiver races through the motherboard. Catastrophic destruction waits beyond this threshold.',
    'Thousands of ghost processes multiply in the shadows until your machine gasps its final breath!'
  ],
  High: [
    'Drinking unknown potions from strange URLs... whatever enters will haunt your terminal!',
    'Throwing the castle gates wide open for every ghoul and goblin to wander in unhindered.',
    'Beware the lingering spirits of modified permissions; privilege once granted is rarely surrendered peacefully.'
  ],
  Medium: [
    'Whispering secrets into the cold night air... The spirits take note in plaintext history!',
    'Tinkering with the veil of environment variables. Tread carefully lest you summon unexpected side effects.',
    'A minor disturbance in the machine. Not fatal, but the ghosts advise keeping an eye on your configuration.'
  ],
  Low: [
    'The machine rests quietly in the moonlight. Standard incantations observed.',
    'No vengeful spirits stirred by this command. Proceed with standard developer caution.',
    'A peaceful command echoes through the terminal chambers.'
  ]
};

export function evaluateSecurityRules(rawCommand) {
  const parsed = parseShellCommand(rawCommand);

  if (!parsed.isValid) {
    return {
      isValid: false,
      riskLevel: 'Low',
      summary: 'Unable to parse command string: ' + (parsed.parseError || 'Malformed input'),
      components: [],
      consequences: [],
      affectedResources: [],
      reasons: ['Command string could not be tokenized by the lexical analyzer.'],
      matchedRules: [],
      saferAlternative: null,
      ghostCommentary: 'The ghost squints into the fog, unable to read the runes you offered.',
      isDeterministicOnly: true,
      isUnrecognized: false,
      unrecognizedBinaries: [],
    };
  }

  const matchedRules = [];
  const consequences = new Set();
  const affectedResources = new Set();
  const reasons = [];
  let highestSeverity = 'Low';
  let recommendedAlternative = null;

  // Check for non-existent / unrecognized binaries
  const unrecognizedBinaries = [];
  let suggestedTypoFix = null;

  for (const seg of parsed.segments) {
    if (!seg.binary) continue;
    let target = seg.binary;
    if ((target === 'sudo' || target === 'doas') && seg.args[0]) {
      target = seg.args[0];
    }
    if (!isRecognizedCommand(target)) {
      unrecognizedBinaries.push(target);
      const typo = getTypoSuggestion(target);
      if (typo && !suggestedTypoFix) {
        suggestedTypoFix = parsed.raw.replace(new RegExp(`\\b${target}\\b`), typo);
      }
    }
  }

  const isUnrecognized = unrecognizedBinaries.length > 0;

  for (const rule of SECURITY_RULES) {
    try {
      if (rule.test(parsed.raw, parsed)) {
        matchedRules.push({
          id: rule.id,
          name: rule.name,
          category: rule.category,
          severity: rule.severity,
          description: rule.description,
          mitigation: rule.mitigation,
        });

        if (rule.consequence) consequences.add(rule.consequence);
        if (rule.affectedResources) {
          rule.affectedResources.forEach((res) => affectedResources.add(res));
        }
        reasons.push(`${rule.name} matched: ${rule.description}`);

        if (rule.saferAlternative && !recommendedAlternative) {
          recommendedAlternative = rule.saferAlternative;
        }

        if (SEVERITY_RANKS[rule.severity] > SEVERITY_RANKS[highestSeverity]) {
          highestSeverity = rule.severity;
        }
      }
    } catch (err) {
      console.warn(`[RuleEngine] Error evaluating rule ${rule.id}:`, err.message);
    }
  }

  // Tokenize components
  const components = parsed.segments.map((seg) => {
    let explanation = `Executes '${seg.binary || 'command'}' with ${seg.flags.length} flag(s) and ${seg.args.length} argument(s).`;
    if (seg.binary === 'sudo') {
      explanation = 'Executes child command with administrative superuser (root) privileges.';
    } else if (seg.binary === 'rm') {
      explanation = 'Invokes filesystem unlink utility to delete specified targets.';
    } else if (seg.binary === 'curl' || seg.binary === 'wget') {
      explanation = 'Performs outbound network HTTP request to transfer data from a remote URL.';
    } else if (seg.binary === 'chmod') {
      explanation = 'Modifies POSIX filesystem read/write/execute permission bits.';
    } else if (seg.binary === 'dd') {
      explanation = 'Low-level block converter/copier reading and writing raw byte streams.';
    } else if (!isRecognizedCommand(seg.binary)) {
      explanation = `Warning: '${seg.binary}' is not recognized as a standard shell utility. Will fail with 'command not found'.`;
    }

    return {
      part: seg.raw,
      type: seg.operator ? `Pipeline (${seg.operator})` : 'Command Unit',
      binary: seg.binary,
      flags: seg.flags,
      explanation,
    };
  });

  if (isUnrecognized && !recommendedAlternative && suggestedTypoFix) {
    recommendedAlternative = suggestedTypoFix;
  }

  // Pick random commentary for risk level
  const commentaries = SPOOKY_COMMENTARIES[highestSeverity] || SPOOKY_COMMENTARIES.Low;
  let ghostCommentary = commentaries[Math.floor(Math.random() * commentaries.length)];

  // Summary
  let summary = 'Standard shell command with no hazardous signatures identified.';
  if (isUnrecognized && highestSeverity !== 'Critical' && highestSeverity !== 'High') {
    summary = `Unrecognized / Non-Existent Command: '${unrecognizedBinaries.join("', '")}' does not correspond to any standard Unix utility or recognized CLI program. Executing this will result in "command not found".`;
    consequences.add(`Command execution failure: The shell will exit with status 127 ('command not found: ${unrecognizedBinaries[0]}').`);
    affectedResources.add('Shell Execution Environment ($PATH)');
    ghostCommentary = `You chant runes to phantoms that do not walk this mortal machine! The shell will answer only with 'command not found: ${unrecognizedBinaries[0]}'.`;
  } else if (highestSeverity === 'Critical') {
    summary = 'Critical security hazard detected! This operation poses severe risk of system destruction, data loss, or denial of service.';
  } else if (highestSeverity === 'High') {
    summary = 'High security risk detected: Involves privileged operations, unverified remote execution, or wide permissions.';
  } else if (highestSeverity === 'Medium') {
    summary = 'Caution advised: Command contains sensitive credential patterns or unrecognized utility flags.';
  }

  return {
    isValid: true,
    command: parsed.raw,
    riskLevel: highestSeverity,
    summary,
    components,
    consequences: Array.from(consequences),
    affectedResources: Array.from(affectedResources),
    reasons,
    matchedRules,
    saferAlternative: recommendedAlternative,
    ghostCommentary,
    isDeterministicOnly: true,
    isUnrecognized,
    unrecognizedBinaries,
    modelMetadata: {
      provider: 'Deterministic Rule Engine',
      model: 'Static Analyzer v1.0',
    },
  };
}
