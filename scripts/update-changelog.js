const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const readmePath = path.join(__dirname, '..', 'README.md');

// Function to run git command and return stdout
function runGitCommand(command) {
  try {
    return execSync(command, { encoding: 'utf8' }).trim();
  } catch (error) {
    console.error(`Errore durante l'esecuzione del comando git: ${command}`, error.message);
    return '';
  }
}

function main() {
  console.log('Avvio aggiornamento automatico del README...');

  // 1. Get git commit logs
  // Format: hash|subject|date
  const logOutput = runGitCommand('git log --pretty=format:"%h|%s|%ad" --date=short');
  
  if (!logOutput) {
    console.log('Nessun commit trovato o git non inizializzato.');
    return;
  }

  const lines = logOutput.split('\n');
  const changelogEntries = [];
  const versionRegex = /^v?(\d+\.\d+\.\d+)\s*-\s*(.+)$/i;

  for (const line of lines) {
    const [hash, subject, date] = line.split('|');
    if (!subject) continue;

    const match = subject.trim().match(versionRegex);
    if (match) {
      const version = match[1];
      const description = match[2];
      changelogEntries.push({
        version: `v${version}`,
        date,
        description,
        hash
      });
    }
  }

  // If no matching version commits are found, fallback to 0.0.1 as current and add a default entry
  const currentVersion = changelogEntries.length > 0 ? changelogEntries[0].version : 'v0.0.1';

  // 2. Build the changelog markdown table
  let changelogMarkdown = '';
  if (changelogEntries.length > 0) {
    changelogMarkdown = [
      '| Versione | Data | Descrizione | Commit |',
      '| :--- | :--- | :--- | :--- |',
      ...changelogEntries.map(entry => 
        `| **${entry.version}** | ${entry.date} | ${entry.description} | \`${entry.hash}\` |`
      )
    ].join('\n');
  } else {
    changelogMarkdown = '*Nessuna versione registrata nella cronologia dei commit.*';
  }

  // 3. Read README.md
  let readmeContent = '';
  if (fs.existsSync(readmePath)) {
    readmeContent = fs.readFileSync(readmePath, 'utf8');
  } else {
    readmeContent = '# Ceramica Nova\n\nUn sito prototipo per un progetto per una SRL di Piastrelle.\n';
  }

  // 4. Update Version Badge
  const versionBadgeStartMarker = '<!-- VERSION-START -->';
  const versionBadgeEndMarker = '<!-- VERSION-END -->';
  const versionBadgeContent = `![Versione](https://img.shields.io/badge/version-${currentVersion}-c5a880?style=flat-square)`;
  
  const versionReplacement = `${versionBadgeStartMarker}\n${versionBadgeContent}\n${versionBadgeEndMarker}`;

  if (readmeContent.includes(versionBadgeStartMarker) && readmeContent.includes(versionBadgeEndMarker)) {
    const regex = new RegExp(`${versionBadgeStartMarker}[\\s\\S]*?${versionBadgeEndMarker}`);
    readmeContent = readmeContent.replace(regex, versionReplacement);
  } else {
    // Insert after the title
    const titleRegex = /^(#\s+.*)/m;
    if (titleRegex.test(readmeContent)) {
      readmeContent = readmeContent.replace(titleRegex, `$1\n\n${versionReplacement}`);
    } else {
      readmeContent = `${versionReplacement}\n\n${readmeContent}`;
    }
  }

  // 5. Update Changelog Section
  const changelogStartMarker = '<!-- CHANGELOG-START -->';
  const changelogEndMarker = '<!-- CHANGELOG-END -->';
  const changelogReplacement = `${changelogStartMarker}\n\n${changelogMarkdown}\n\n${changelogEndMarker}`;

  if (readmeContent.includes(changelogStartMarker) && readmeContent.includes(changelogEndMarker)) {
    const regex = new RegExp(`${changelogStartMarker}[\\s\\S]*?${changelogEndMarker}`);
    readmeContent = readmeContent.replace(regex, changelogReplacement);
  } else {
    // Append to the end of the file
    readmeContent = `${readmeContent.trim()}\n\n## Registro Versioni (Changelog)\n\n${changelogReplacement}\n`;
  }

  // 6. Write back to README.md
  fs.writeFileSync(readmePath, readmeContent, 'utf8');
  console.log(`README.md aggiornato con successo! Versione corrente: ${currentVersion}`);
}

main();
