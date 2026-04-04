import { spawnSync } from 'child_process';
spawnSync('npx.cmd', ['vercel', 'env', 'add', 'NEXTAUTH_URL', 'production'], {
  input: 'https://imoveiscapaonovo.com.br',
  stdio: ['pipe', 'inherit', 'inherit']
});
