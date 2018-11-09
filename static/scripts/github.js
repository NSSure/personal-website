
axios.get(`https://api.github.com/repos/NSSure/${window.repo}`).then((response) => {
    console.log(response.data);
});

axios.get(`https://api.github.com/repos/NSSure/${window.repo}/issues`).then((response) => {
    let issues = document.getElementById('issues');
    document.getElementById('issues-count').innerText = `Displaying ${response.data.length} issue(s)`;

    console.log(response.data);


    response.data.forEach((issue) => {
        let markdown = 
        `
            <div class="item">
                <div class="content">
                    <span class="title">${issue.title} <span>${issue.number}</span> - <span>${issue.state}</span></span>
                    <span>${issue.body ? issue.body : 'Issue has no body markup'}</span><br>
                    <span>Created at: ${moment(issue.created_at).format('MM-DD-YYYY')} - Updated at: ${moment(issue.updated_at).format('MM-DD-YYYY')}</span>
                </div>
            </div>
        `;

        let template = document.createElement('template');

        

        document.createElement()

        issues.innerHTML += template;
    });
});