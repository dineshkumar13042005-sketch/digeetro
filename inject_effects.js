const fs = require('fs');
const files = ['index.html', 'services.html', 'work.html', 'about.html', 'why-digeetro.html', 'contact.html'];
const scriptTag = '    <!-- Digeetro Interactive Text Click Effects -->\n    <script src="assets/text-click-effects.js"></script>\n  </body>';

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('assets/text-click-effects.js')) {
    content = content.replace('</body>', scriptTag);
    fs.writeFileSync(file, content, 'utf8');
    console.log('Added text click effects to', file);
  } else {
    console.log('Already in', file);
  }
}
