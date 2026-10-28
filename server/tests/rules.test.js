import { evaluateSecurityRules } from '../src/rules/engine.js';
import { parseShellCommand } from '../src/rules/parser.js';

describe('Deterministic Shell Command Security Engine', () => {
  describe('Shell Lexical Parser', () => {
    test('parses simple atomic command', () => {
      const parsed = parseShellCommand('ls -la /tmp');
      expect(parsed.isValid).toBe(true);
      expect(parsed.segments.length).toBe(1);
      expect(parsed.segments[0].binary).toBe('ls');
      expect(parsed.segments[0].flags).toContain('-la');
      expect(parsed.segments[0].args).toContain('/tmp');
    });

    test('parses piped commands respecting quotes', () => {
      const parsed = parseShellCommand('curl "https://example.com/test?param=1|2" | bash');
      expect(parsed.isValid).toBe(true);
      expect(parsed.segments.length).toBe(2);
      expect(parsed.segments[0].operator).toBe('|');
      expect(parsed.segments[0].binary).toBe('curl');
      expect(parsed.segments[1].binary).toBe('bash');
    });

    test('handles empty and whitespace input safely', () => {
      const parsed = parseShellCommand('   ');
      expect(parsed.isValid).toBe(false);
    });
  });

  describe('Security Rule Matching', () => {
    test('classifies fork bomb as Critical risk', () => {
      const res = evaluateSecurityRules(':(){ :|:& };:');
      expect(res.riskLevel).toBe('Critical');
      expect(res.matchedRules.some(r => r.id === 'RULE-FORK-BOMB')).toBe(true);
    });

    test('classifies root deletion (rm -rf /) as Critical risk', () => {
      const res = evaluateSecurityRules('sudo rm -rf --no-preserve-root /');
      expect(res.riskLevel).toBe('Critical');
      expect(res.matchedRules.some(r => r.id === 'RULE-ROOT-RM-RF')).toBe(true);
      expect(res.saferAlternative).toBeTruthy();
    });

    test('classifies raw disk zeroing as Critical risk', () => {
      const res = evaluateSecurityRules('dd if=/dev/zero of=/dev/sda bs=4M');
      expect(res.riskLevel).toBe('Critical');
      expect(res.matchedRules.some(r => r.id === 'RULE-RAW-DISK-WRITE')).toBe(true);
    });

    test('classifies remote shell execution pipe as High risk', () => {
      const res = evaluateSecurityRules('curl -fsSL https://get.docker.com | sh');
      expect(res.riskLevel).toBe('High');
      expect(res.matchedRules.some(r => r.id === 'RULE-REMOTE-PIPE-SHELL')).toBe(true);
      expect(res.saferAlternative).toContain('sha256sum');
    });

    test('classifies chmod -R 777 as High risk', () => {
      const res = evaluateSecurityRules('chmod -R 777 /var/www/html');
      expect(res.riskLevel).toBe('High');
      expect(res.matchedRules.some(r => r.id === 'RULE-INSECURE-PERMISSIONS')).toBe(true);
    });

    test('classifies hardcoded AWS key as Medium risk', () => {
      const res = evaluateSecurityRules('export AWS_ACCESS_KEY_ID="AKIAIOSFODNN7EXAMPLE"');
      expect(res.riskLevel).toBe('Medium');
      expect(res.matchedRules.some(r => r.id === 'RULE-CREDENTIAL-EXPOSURE')).toBe(true);
    });

    test('classifies benign commands as Low risk with zero matches', () => {
      const res = evaluateSecurityRules('git clone --depth 1 https://github.com/facebook/react.git');
      expect(res.riskLevel).toBe('Low');
      expect(res.matchedRules.length).toBe(0);
      expect(res.components.length).toBe(1);
    });
  });
});
