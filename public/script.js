const createBtn = document.createElement('button');
createBtn.innerText = 'Create A Bug';
document.body.appendChild(createBtn);
// set button to display form on click

const formContainer = document.createElement('div');

const createProblemInput = document.createElement('input');
createProblemInput.placeholder = 'Input problem';
const createErrorInput = document.createElement('input');
createErrorInput.placeholder = 'Input Error';
const createCommitInput = document.createElement('input');
createCommitInput.placeholder = 'Input Commit';

const submitBtn = document.createElement('button');
submitBtn.innerText = 'Submit Bug';

formContainer.appendChild(createProblemInput);
formContainer.appendChild(createErrorInput);
formContainer.appendChild(createCommitInput);
formContainer.appendChild(submitBtn);

createBtn.addEventListener('click', () => {
  document.body.appendChild(formContainer);
});

submitBtn.addEventListener('click', () => {
  const data = {
    problem: createProblemInput.value,
    errorText: createErrorInput.value,
    commit: createCommitInput.value,
  };
  axios
    .post('/', data)
    .then((response) => {
      const bugDiv = document.createElement('div');
      const newBug = response.data.data;
      console.log('response :>> ', response);
      bugDiv.innerHTML = `<h3>New Bug Problem (${newBug.problem}) Created<br> </h3> `;
      document.body.appendChild(bugDiv);
      document.body.removeChild(formContainer);
    })
    .catch((error) => {
    // handle error
      console.log(error);
    });
});
