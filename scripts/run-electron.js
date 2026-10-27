const { spawn } = require('child_process');
const electron = require('electron');

// Ensure ELECTRON_RUN_AS_NODE is unset so Electron starts in app/GUI mode across all platforms (Windows, macOS, Linux)
const env = { ...process.env };
delete env.ELECTRON_RUN_AS_NODE;

const child = spawn(electron, process.argv.slice(2), {
  stdio: 'inherit',
  env,
  windowsHide: false
});

child.on('error', (err) => {
  console.error('Failed to start Electron:', err);
  process.exit(1);
});

child.on('close', (code) => {
  process.exit(code ?? 0);
});
