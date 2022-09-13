document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const issueId = Math.floor(Math.random() * 100000000) + '';
  const status = 'Open';

  const issue = { issueId, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')) {
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}

const setStatusClosed = issueId => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  console.log(issues)
  const currentIssue = issues.filter(issue => issue.issueId == issueId);
  console.log(currentIssue)
  currentIssue[0].status = 'Closed';
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

const deleteIssue = issueId => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter(issue => issue.issueId != issueId)
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues();
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    const { issueId, description, severity, assignedTo, status } = issues[i];
    issuesList.innerHTML += `<div class="well">
                            <h6>Issue ID: ${issueId} </h6>
                            <p><span class="label label-info"> ${status} </span></p>
                            <h3> ${description} </h3>
                            <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                            <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                            <a href="#" onclick="setStatusClosed(${issueId})" class="btn btn-warning">Close</a>
                            <a href="#" onclick="deleteIssue(${issueId})" class="btn btn-danger">Delete</a>
                            </div>`;

  }
}
