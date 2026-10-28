/**
 * Curated Registry of Known Standard Unix, POSIX, Linux, macOS, and Developer CLI Tools
 */

export const KNOWN_SHELL_COMMANDS = new Set([
  // Shell Builtins & Flow Control
  'echo', 'printf', 'cd', 'pwd', 'exit', 'return', 'export', 'set', 'unset', 
  'alias', 'unalias', 'source', '.', 'eval', 'exec', 'trap', 'ulimit', 'type', 
  'which', 'where', 'whereis', 'test', '[', '[[', 'time', 'read', 'sh', 'bash', 
  'zsh', 'ksh', 'csh', 'tcsh', 'dash', 'fish', 'history', 'jobs', 'fg', 'bg', 
  'wait', 'disown', 'shift', 'break', 'continue', 'true', 'false', 'colon', ':',

  // Core POSIX / Linux / Unix Utilities
  'ls', 'cp', 'mv', 'rm', 'mkdir', 'rmdir', 'touch', 'cat', 'less', 'more', 
  'head', 'tail', 'grep', 'egrep', 'fgrep', 'sed', 'awk', 'cut', 'tr', 'sort', 
  'uniq', 'wc', 'find', 'xargs', 'tee', 'ln', 'chmod', 'chown', 'chgrp', 'df', 
  'du', 'free', 'top', 'htop', 'ps', 'pkill', 'kill', 'killall', 'uptime', 
  'uname', 'whoami', 'who', 'w', 'id', 'groups', 'env', 'printenv', 'sudo', 
  'su', 'doas', 'pkexec', 'date', 'sleep', 'clear', 'reset', 'sync', 'reboot', 
  'shutdown', 'poweroff', 'halt', 'dmesg', 'journalctl', 'systemctl', 'service', 
  'crontab', 'at', 'batch', 'watch', 'man', 'info', 'file', 'stat', 'basename', 
  'dirname', 'readlink', 'realpath', 'diff', 'patch', 'comm', 'cmp', 'paste', 
  'split', 'csplit', 'fold', 'fmt', 'nl', 'od', 'hexdump', 'xxd', 'strings',

  // Networking & Data Transfer
  'curl', 'wget', 'ping', 'ping6', 'traceroute', 'tracepath', 'netstat', 'ss', 
  'ip', 'ifconfig', 'route', 'dig', 'nslookup', 'host', 'nc', 'netcat', 'telnet', 
  'ssh', 'scp', 'sftp', 'rsync', 'ftp', 'iptables', 'ufw', 'firewalld', 'nmap', 
  'tcpdump', 'iperf', 'socat', 'lsof',

  // Compression & Archives
  'tar', 'gzip', 'gunzip', 'bzip2', 'bunzip2', 'xz', 'unxz', 'zip', 'unzip', 
  '7z', 'zcat', 'zgrep', 'cpio', 'pax',

  // Developer Ecosystem & Languages
  'git', 'gh', 'docker', 'docker-compose', 'podman', 'kubectl', 'helm', 'minikube', 
  'make', 'cmake', 'gcc', 'g++', 'clang', 'clang++', 'rustc', 'cargo', 'rustup', 
  'go', 'python', 'python3', 'py', 'pip', 'pip3', 'pipenv', 'poetry', 'conda', 
  'node', 'nodejs', 'npm', 'npx', 'yarn', 'pnpm', 'bun', 'deno', 'ruby', 'gem', 
  'bundle', 'bundler', 'perl', 'php', 'composer', 'java', 'javac', 'jar', 'mvn', 
  'gradle', 'dotnet', 'elixir', 'mix', 'scala', 'sbt', 'swift', 'zig', 'lua', 
  'tcl', 'R', 'Rscript', 'julia',

  // Package Managers
  'apt', 'apt-get', 'dpkg', 'apt-cache', 'yum', 'dnf', 'rpm', 'pacman', 'yay', 
  'brew', 'snap', 'flatpak', 'nix', 'nix-shell', 'apk', 'apk-tools', 'zypper', 
  'emerge',

  // Cloud & Infrastructure
  'aws', 'gcloud', 'az', 'terraform', 'terragrunt', 'ansible', 'ansible-playbook', 
  'vagrant', 'packer', 'vault', 'consul', 'nomad', 'ngrok',

  // Security, Hashes & Cryptography
  'openssl', 'gpg', 'base64', 'md5sum', 'sha1sum', 'sha224sum', 'sha256sum', 
  'sha384sum', 'sha512sum', 'shasum', 'cksum', 'b2sum',

  // Storage, Disks & Hardware
  'dd', 'mkfs', 'mkfs.ext4', 'mkfs.xfs', 'mkfs.vfat', 'fdisk', 'gdisk', 'parted', 
  'lsblk', 'blkid', 'mount', 'umount', 'wipefs', 'shred', 'badblocks', 'chroot', 
  'strace', 'ltrace', 'valgrind'
]);

// Common typos mapped to intended legitimate commands
export const COMMON_TYPO_SUGGESTIONS = {
  'gti': 'git',
  'got': 'git',
  'gut': 'git',
  'sl': 'ls',
  'l': 'ls',
  'll': 'ls -la',
  'dcoker': 'docker',
  'dokcer': 'docker',
  'catt': 'cat',
  'cta': 'cat',
  'gerp': 'grep',
  'grp': 'grep',
  'vmi': 'vim',
  'ivm': 'vim',
  'clera': 'clear',
  'claer': 'clear',
  'exti': 'exit',
  'eixt': 'exit',
  'pyhton': 'python3',
  'pyton': 'python3',
  'ndoe': 'node',
  'nmp': 'npm',
  'pnp': 'npm',
  'sud': 'sudo',
  'sudp': 'sudo',
  'shudown': 'shutdown',
  'reboto': 'reboot',
  'mkidr': 'mkdir',
  'chmdo': 'chmod',
  'choown': 'chown'
};

export function isRecognizedCommand(binaryName) {
  if (!binaryName || typeof binaryName !== 'string') return false;
  const clean = binaryName.toLowerCase().trim();

  // If it's a relative path (./script.sh) or absolute path (/usr/local/bin/mytool)
  if (clean.startsWith('./') || clean.startsWith('../') || clean.startsWith('/') || clean.startsWith('~/')) {
    return true;
  }

  // If it's a variable assignment e.g. FOO=bar
  if (clean.includes('=')) {
    return true;
  }

  return KNOWN_SHELL_COMMANDS.has(clean);
}

export function getTypoSuggestion(binaryName) {
  if (!binaryName) return null;
  const clean = binaryName.toLowerCase().trim();
  return COMMON_TYPO_SUGGESTIONS[clean] || null;
}
