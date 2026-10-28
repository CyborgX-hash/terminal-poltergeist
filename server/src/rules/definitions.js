/**
 * Deterministic Security Rules Definitions
 * Each rule defines an inspectable signature, severity, category, description, and mitigation.
 */

export const SECURITY_RULES = [
  // 1. Fork Bombs
  {
    id: 'RULE-FORK-BOMB',
    name: 'Bash Fork Bomb Pattern',
    category: 'Resource Exhaustion',
    severity: 'Critical',
    description: 'Defines and launches a recursively self-replicating function that saturates the OS process table.',
    mitigation: 'Enforce strict process count limits with `ulimit -u` in /etc/security/limits.conf.',
    test: (raw, parsed) => {
      const stripped = raw.replace(/\s+/g, '');
      return (
        stripped.includes(':(){:|:&};:') ||
        stripped.includes(':(){:|:&};') ||
        stripped.includes('bomb(){bomb|bomb&};bomb') ||
        stripped.includes('.(){.|.&};.')
      );
    },
    consequence: 'System lockup requiring hard power cycle or kernel panic due to PID starvation.',
    affectedResources: ['Kernel Process Table', 'CPU Scheduling Queue', 'Memory'],
    saferAlternative: 'ulimit -u 1000 # Restrict process creation limits before running untested scripts',
  },

  // 2. Recursive System Deletion
  {
    id: 'RULE-ROOT-RM-RF',
    name: 'Recursive Root / Critical Path Deletion',
    category: 'Destructive Filesystem Operation',
    severity: 'Critical',
    description: 'Attempts recursive forced deletion of the root directory or major system mounts.',
    mitigation: 'Never run `rm -rf` on root. Use `trash-cli` for recoverable deletions or verify target paths explicitly.',
    test: (raw, parsed) => {
      const lower = raw.toLowerCase();
      const hasRm = parsed.segments.some((s) => s.binary === 'rm' || s.args.includes('rm'));
      if (!hasRm) return false;

      const hasRecursiveFlag =
        lower.includes('-rf') ||
        lower.includes('-fr') ||
        lower.includes('-r') ||
        lower.includes('--recursive');
      const targetsRoot =
        /\brm\s+.*-(?:[a-z]*r[a-z]*f|[a-z]*f[a-z]*r)\s+(?:\/\s*$|\/\*|\/\.\*|--no-preserve-root)/.test(raw) ||
        (hasRecursiveFlag && (lower.includes(' /') || lower.includes(' /*') || lower.includes('--no-preserve-root')));

      return targetsRoot;
    },
    consequence: 'Permanent unrecoverable annihilation of root filesystem, binaries, system libraries, and configs.',
    affectedResources: ['Root Filesystem (/)', 'System Binaries (/bin, /usr/bin)', 'OS Configuration (/etc)'],
    saferAlternative: 'trash-put <specific-path> # Or preview files first: find <path> -maxdepth 1',
  },

  // 3. Recursive Wildcard or Home Deletion
  {
    id: 'RULE-WILDCARD-RM-RF',
    name: 'Recursive Deletion of Home or Current Directory',
    category: 'Destructive Filesystem Operation',
    severity: 'High',
    description: 'Recursive deletion targeting user home directory (~), parent directories (..), or raw wildcards (*).',
    mitigation: 'Inspect target directory contents before deleting, or specify an absolute unambiguous path.',
    test: (raw, parsed) => {
      const lower = raw.toLowerCase();
      const hasRm = parsed.segments.some((s) => s.binary === 'rm');
      if (!hasRm) return false;

      const hasRecursive = lower.includes('-r') || lower.includes('--recursive');
      if (!hasRecursive) return false;

      return (
        lower.includes(' ~') ||
        lower.includes(' $home') ||
        lower.includes(' ..') ||
        lower.includes(' .*')
      );
    },
    consequence: 'Destruction of personal files, SSH keys, dotfiles, source repositories, and project configs.',
    affectedResources: ['User Home Directory (~)', 'SSH Keys (~/.ssh)', 'Git Repositories'],
    saferAlternative: 'rm -i path/to/specific/file # Use interactive confirmation',
  },

  // 4. Remote Script Piped Directly into Shell
  {
    id: 'RULE-REMOTE-PIPE-SHELL',
    name: 'Unverified Remote Script Shell Pipe',
    category: 'Remote Code Execution',
    severity: 'High',
    description: 'Downloads code from a remote URL over HTTP/HTTPS and pipes stdout directly into a shell interpreter without checksum verification.',
    mitigation: 'Download the script locally, review its source code with `less`, and verify its SHA256 checksum before execution.',
    test: (raw, parsed) => {
      const lower = raw.toLowerCase();
      const hasFetcher = lower.includes('curl ') || lower.includes('wget ') || lower.includes('fetch ');
      const hasShellPipe =
        lower.includes('| sh') ||
        lower.includes('| bash') ||
        lower.includes('| zsh') ||
        lower.includes('| sudo sh') ||
        lower.includes('| sudo bash');
      return hasFetcher && hasShellPipe;
    },
    consequence: 'Immediate execution of arbitrary untrusted remote code under current user or root privileges. Susceptible to MITM, DNS poisoning, and compromised upstream CDN.',
    affectedResources: ['Shell Environment', 'User Account Privileges', 'Installed Binaries'],
    saferAlternative: 'curl -fsSL https://example.com/install.sh -o install.sh && sha256sum install.sh && less install.sh',
  },

  // 5. Insecure Universal Permissions (chmod 777)
  {
    id: 'RULE-INSECURE-PERMISSIONS',
    name: 'World-Writable Permissions Grant (chmod 777)',
    category: 'Permission Tampering',
    severity: 'High',
    description: 'Grants universal read, write, and execute permissions to all local users and daemons.',
    mitigation: 'Apply principle of least privilege: 755 for directories, 644 for regular files.',
    test: (raw, parsed) => {
      const lower = raw.toLowerCase();
      if (!lower.includes('chmod')) return false;
      return (
        lower.includes('777') ||
        lower.includes('a+rwx') ||
        lower.includes('ugo+rwx') ||
        lower.includes('0777')
      );
    },
    consequence: 'Allows any unprivileged local user, rogue script, or compromised web server daemon to overwrite or inject malicious code.',
    affectedResources: ['POSIX File Permissions', 'Access Control Lists (ACL)', 'Filesystem Integrity'],
    saferAlternative: 'chmod 755 /path/to/dir && chmod 644 /path/to/files/*.conf',
  },

  // 6. Direct Raw Disk Overwrite
  {
    id: 'RULE-RAW-DISK-WRITE',
    name: 'Raw Block Device Overwrite',
    category: 'Disk Destruction',
    severity: 'Critical',
    description: 'Writes directly to raw block device nodes (e.g., /dev/sda, /dev/nvme), destroying partition tables and filesystems.',
    mitigation: 'Verify block device identifiers carefully using `lsblk` and use partition-aware formatting tools.',
    test: (raw, parsed) => {
      const lower = raw.toLowerCase();
      const hasDd = lower.includes('dd ') && (lower.includes('of=/dev/sd') || lower.includes('of=/dev/nvme') || lower.includes('of=/dev/hd'));
      const hasMkfs = lower.includes('mkfs') && (lower.includes('/dev/sd') || lower.includes('/dev/nvme'));
      const hasWipefs = lower.includes('wipefs') && lower.includes('-a');
      return hasDd || hasMkfs || hasWipefs;
    },
    consequence: 'Complete data annihilation across raw disk sectors, erasing GPT/MBR partition tables and mounted volumes.',
    affectedResources: ['Storage Block Devices (/dev/sd*)', 'Partition Tables', 'Filesystem Superblocks'],
    saferAlternative: 'lsblk # Safely inspect mounted partitions and device labels prior to block operations',
  },

  // 7. Credential / Secret Exposure in Command Line
  {
    id: 'RULE-CREDENTIAL-EXPOSURE',
    name: 'Plaintext Secret in Shell Command',
    category: 'Credential Exposure',
    severity: 'Medium',
    description: 'Injects high-entropy access keys, API tokens, or secrets directly into the shell command string.',
    mitigation: 'Store credentials in a secure environment file (.env) or use a credential helper / secret vault.',
    test: (raw, parsed) => {
      // AWS Access Key ID regex: AKIA[0-9A-Z]{16}
      const hasAwsKey = /AKIA[0-9A-Z]{16}/.test(raw);
      const hasPrivateKey = /-----BEGIN [A-Z ]*PRIVATE KEY-----/.test(raw);
      const lower = raw.toLowerCase();
      const hasInlineSecret =
        (lower.includes('export ') || lower.includes('set ')) &&
        (lower.includes('secret') || lower.includes('token') || lower.includes('api_key') || lower.includes('password='));
      return hasAwsKey || hasPrivateKey || hasInlineSecret;
    },
    consequence: 'Stored in plaintext in shell history files (~/.bash_history, ~/.zsh_history) and visible in process listings (`ps aux`).',
    affectedResources: ['Shell History Files', 'Operating System Process Environment', 'Cloud API Accounts'],
    saferAlternative: 'read -s -p "Enter Secret: " SECRET_TOKEN # Reads secret without echoing to screen or shell history',
  },

  // 8. Privilege Escalation / Sudoers Tampering
  {
    id: 'RULE-SUDOERS-TAMPERING',
    name: 'Sudoers or Shadow File Tampering',
    category: 'Privilege Escalation',
    severity: 'Critical',
    description: 'Modifies /etc/sudoers, /etc/passwd, or /etc/shadow directly without safety syntax checks.',
    mitigation: 'Always use `visudo` to edit sudoers with syntax validation, avoiding accidental administrative lockout.',
    test: (raw, parsed) => {
      const lower = raw.toLowerCase();
      return (
        lower.includes('/etc/sudoers') ||
        lower.includes('/etc/shadow') ||
        lower.includes('nopasswd: all') ||
        (lower.includes('echo') && lower.includes('/etc/passwd'))
      );
    },
    consequence: 'Risk of locking all administrative users out of the system, or granting unauthenticated root access to unprivileged processes.',
    affectedResources: ['Authentication Configuration (/etc/passwd, /etc/shadow)', 'Sudo Security Policy'],
    saferAlternative: 'sudo visudo # Validates syntax before saving changes to sudoers',
  },

  // 9. Mass Process Termination
  {
    id: 'RULE-MASS-PROCESS-KILL',
    name: 'Mass Process Termination (kill -9 -1)',
    category: 'System Disruption',
    severity: 'High',
    description: 'Signals all processes that the caller has permission to kill, causing unexpected server outage.',
    mitigation: 'Target individual process PIDs or specific service units via `systemctl`.',
    test: (raw, parsed) => {
      const lower = raw.toLowerCase();
      return (
        lower.includes('kill -9 -1') ||
        lower.includes('kill -kill -1') ||
        lower.includes('killall -9 *')
      );
    },
    consequence: 'Abruptly terminates all user background services, daemon threads, database connections, and session shells.',
    affectedResources: ['Active Daemon Processes', 'Database Connections', 'Background Workers'],
    saferAlternative: 'systemctl stop <service-name> # Or kill specific PID with kill -15 <PID>',
  },
];
