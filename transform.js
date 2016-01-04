// Right now, we need to re-write .html and remove it
// But, firebase does not do that.
// This is how we fix it manually.

var fs = require('fs');
var files = fs.readdirSync('./_site');
var newFiles = files
  .filter(file => {
    if(!(/html$/.test(file))) {
      return false;
    }

    if(file === 'index.html') {
      return false;
    }

    return true;
  })
  .map(file => file.replace(/\.html/, ''));

newFiles.forEach(file => {
  fs.mkdirSync(`_site/${file}`);
  var content = fs.readFileSync(`_site/${file}.html`, 'utf8');
  fs.writeFileSync(`_site/${file}/index.html`, content);
});