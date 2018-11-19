const posts = require('../public/blog/posts.json');
const markdown = require('./markdown');

module.exports = {
    posts() {
        return posts;   
    },
    getPost(normalizedUrl) {
        let post = posts.find(x => x.normalizedUrl);
        let markdown
    }
}