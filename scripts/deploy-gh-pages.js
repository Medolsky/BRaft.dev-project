import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('⚡ Fast Deploying WebCraft to GitHub Pages...');

const startTime = Date.now();

try {
  // Remove existing dist/.git if present
  if (fs.existsSync('dist/.git')) {
    fs.rmSync('dist/.git', { recursive: true, force: true });
  }

  // 1. Build Vite production bundle
  execSync('vite build', { stdio: 'inherit' });

  // 2. Add .nojekyll and 404.html fallback to dist
  const distPath = path.resolve('dist');
  fs.writeFileSync(path.join(distPath, '.nojekyll'), '# Disable Jekyll');
  fs.copyFileSync(path.join(distPath, 'index.html'), path.join(distPath, '404.html'));

  // 3. Get origin URL
  const originUrl = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();

  // 4. Fast push from dist directory directly to gh-pages branch
  const commands = [
    'git init',
    'git config user.name "Medolsky"',
    'git config user.email "Medolsky@users.noreply.github.com"',
    `git remote add origin ${originUrl}`,
    'git checkout -b gh-pages',
    'git add .',
    'git commit -m "Ultra-fast deploy to gh-pages with 404 fallback"',
    'git push -f origin gh-pages'
  ].join(' && ');

  delete process.env.GITHUB_TOKEN;
  execSync(commands, { cwd: distPath, stdio: 'inherit' });

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`\n🚀 Selesai! Deployed WebCraft ke GitHub Pages dalam ${duration} detik!`);
} catch (error) {
  console.error('❌ Deployment error:', error.message || error);
  process.exit(1);
}
