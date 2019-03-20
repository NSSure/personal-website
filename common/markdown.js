const fs = require('fs');
const showdown = require('showdown');
const github = require('./github');

module.exports = {
    async loadRepoMarkdown (repo) {
        let markdownPath = `./public/markdown/${repo}.md`;

        if (!fs.existsSync(markdownPath)) {
            let repoMarkdown = await github.getRepositoryMarkdown(repo);

            if (!repoMarkdown) {
                repoMarkdown = 'Project has no README.md';
            }

            fs.writeFileSync(markdownPath, repoMarkdown);
        }

        let markdown = fs.readFileSync(markdownPath, 'utf8');
        
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