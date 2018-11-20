const fs = require('fs');
const showdown = require('showdown');

module.exports = {
    loadRepoMarkdown (repo) {
        let markdown = fs.readFileSync(`./public/markdown/${repo}.md`, 'utf8');
        
        let converter = new showdown.Converter({
            tables: true
        });

        return converter.makeHtml(markdown);
    },
    loadPostMarkdown (normalizedUrl) {
        let markdown = fs.readFileSync(`./public/blog/${normalizedUrl}/markdown.md`, 'utf8');
        
        let converter = new showdown.Converter({
            tables: true
        });

        return converter.makeHtml(markdown);
    }
}