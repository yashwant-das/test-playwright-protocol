import fs from 'fs';
import path from 'path';

const DOCS_MAPPING = [
  {
    source: '../docs/PROTOCOL.md',
    target: 'src/content/docs/protocol.md',
    metadata: {
      title: 'Protocol',
      description: 'The architectural source of truth for the Smart Playwright Protocol.',
    }
  },
  {
    source: '../docs/CLI.md',
    target: 'src/content/docs/cli.md',
    metadata: {
      title: 'CLI',
      description: 'Command reference for the Smart Playwright Protocol CLI.',
    }
  },
  {
    source: '../docs/ROADMAP.md',
    target: 'src/content/docs/roadmap.md',
    metadata: {
      title: 'Roadmap',
      description: 'Future enhancements and planned improvements for SPP.',
    }
  },
  {
    source: '../AGENTS.md',
    target: 'src/content/docs/agents.md',
    metadata: {
      title: 'AI Agents',
      description: 'Instructions and expectations for AI assistants interacting with SPP.',
    }
  },
  {
    source: '../README.md',
    target: 'src/content/docs/quick-start.md',
    metadata: {
      title: 'Quick Start',
      description: 'Get started with Smart Playwright Protocol in under 5 minutes.',
    }
  }
];

function rewriteLinks(content) {
  return content
    .replace(/\[([^\]]+)\]\(docs\/PROTOCOL\.md\)/g, '[$1](/test-playwright-protocol/protocol/)')
    .replace(/\[([^\]]+)\]\(PROTOCOL\.md\)/g, '[$1](/test-playwright-protocol/protocol/)')
    .replace(/\[([^\]]+)\]\(docs\/CLI\.md\)/g, '[$1](/test-playwright-protocol/cli/)')
    .replace(/\[([^\]]+)\]\(CLI\.md\)/g, '[$1](/test-playwright-protocol/cli/)')
    .replace(/\[([^\]]+)\]\(docs\/ROADMAP\.md\)/g, '[$1](/test-playwright-protocol/roadmap/)')
    .replace(/\[([^\]]+)\]\(ROADMAP\.md\)/g, '[$1](/test-playwright-protocol/roadmap/)')
    .replace(/\[([^\]]+)\]\(AGENTS\.md\)/g, '[$1](/test-playwright-protocol/agents/)')
    .replace(/\[([^\]]+)\]\(\.\.\/AGENTS\.md\)/g, '[$1](/test-playwright-protocol/agents/)')
    .replace(/\[([^\]]+)\]\(README\.md\)/g, '[$1](/test-playwright-protocol/quick-start/)');
}

function transformAlerts(content) {
  const lines = content.split('\n');
  const result = [];
  let inAlert = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const alertMatch = line.match(/^> \[!(TIP|NOTE|IMPORTANT|WARNING|CAUTION)\]/);

    if (alertMatch) {
      const type = alertMatch[1].toLowerCase() === 'caution' ? 'danger' : alertMatch[1].toLowerCase();
      result.push(`:::${type}`);
      inAlert = true;
    } else if (inAlert && line.startsWith('> ')) {
      result.push(line.replace(/^> /, ''));
    } else if (inAlert && line.trim() === '>') {
      result.push('');
    } else {
      if (inAlert) {
        result.push(':::');
        inAlert = false;
      }
      result.push(line);
    }
  }
  
  if (inAlert) result.push(':::');
  
  return result.join('\n');
}

function beautifyContent(content, source) {
  // 1. Remove GitHub badges (they look bad in docs)
  content = content.replace(/\[!\[.*\]\(.*\)\]\(.*\)\n/g, '');
  
  // 2. Remove redundant "New to SPP?" alert from README (it points back to itself)
  if (source.includes('README.md')) {
    content = content.replace(/> \[!IMPORTANT\]\n> \*\*New to SPP\?\*\*.*/g, '');
  }

  // 3. Convert numbered lists to Starlight <Steps> for Quick Start
  if (source.includes('README.md')) {
    const lines = content.split('\n');
    let inSteps = false;
    const beautified = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.includes('## Quick Start')) {
        beautified.push(line);
        beautified.push('\nimport { Steps } from \'@astrojs/starlight/components\';\n');
        beautified.push('<Steps>');
        inSteps = true;
        continue;
      }
      
      if (inSteps && /^\d+\./.test(line.trim())) {
        beautified.push(line);
      } else if (inSteps && line.trim() === '') {
        beautified.push(line);
      } else if (inSteps) {
        beautified.push('</Steps>');
        beautified.push(line);
        inSteps = false;
      } else {
        beautified.push(line);
      }
    }
    if (inSteps) beautified.push('</Steps>');
    content = beautified.join('\n');
  }

  // 4. Wrap the workflow diagram in a card if it's text-based
  content = content.replace(/```text\nSelect\n(  ↓\n.*)+\n```/g, (match) => {
    return `:::note[Workflow Lifecycle]\n${match}\n:::`;
  });

  return content;
}

function sync() {
  console.log('🔄 Syncing and Beautifying documentation...');
  
  for (const { source, target, metadata } of DOCS_MAPPING) {
    const sourcePath = path.resolve(source);
    const targetPath = path.resolve(target);
    
    if (!fs.existsSync(sourcePath)) {
      console.warn(`⚠️ Source file not found: ${source}`);
      continue;
    }
    
    let content = fs.readFileSync(sourcePath, 'utf-8');
    
    // Remove the first H1
    content = content.replace(/^# .*\n/, '');
    
    // Core transformations
    content = rewriteLinks(content);
    content = transformAlerts(content);
    content = beautifyContent(content, source);

    const frontmatter = [
      '---',
      `title: ${metadata.title}`,
      `description: ${metadata.description}`,
      '---',
      '',
      ''
    ].join('\n');
    
    fs.writeFileSync(targetPath, frontmatter + content);
    console.log(`✅ Synced & Polished ${source} -> ${target}`);
  }
}

sync();
