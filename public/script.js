// create "Create A Bug button"
const createBtn = document.createElement('button');
createBtn.innerText = 'Create A Bug';
document.body.appendChild(createBtn);

// create form container to append all form elements
const formContainer = document.createElement('div');
// create form elements: problem, error, commit, feature
const problemInput = document.createElement('input');
problemInput.placeholder = 'Input problem';
const errorInput = document.createElement('input');
errorInput.placeholder = 'Input Error';
const commitInput = document.createElement('input');
commitInput.placeholder = 'Input Commit';
// create div to append all different features
const featureDiv = document.createElement('div');
// list all features
const listFeatures = () => {
  axios
    .get('/features')
    .then((response) => {
      const { features } = response.data;
      console.log('features :>> ', features);
      for (let i = 0; i < features.length; i += 1) {
        const featureBtn = document.createElement('input');
        console.log('features name :>> ', features[i].name);
        featureBtn.type = 'radio';
        featureBtn.name = 'feature';
        featureBtn.checked = false;
        // featureBtn.className = 'not-selected';
        featureBtn.value = `${features[i].id}`;
        const label = document.createElement('label');
        const description = document.createTextNode(`${features[i].name}`);
        label.appendChild(description);

        featureDiv.appendChild(featureBtn);
        featureDiv.appendChild(label);
      }
    });
};
// create submit form btn
const submitBtn = document.createElement('button');
submitBtn.innerText = 'Submit Bug';

// append all form elements to container
formContainer.appendChild(problemInput);
formContainer.appendChild(errorInput);
formContainer.appendChild(commitInput);
formContainer.appendChild(featureDiv);
formContainer.appendChild(submitBtn);

// create bug list container
const bugListContainer = document.createElement('div');
const createBugList = () => {
  axios
    .get('/index')
    .then((response) => {
      const { bugs } = response.data;
      console.log(response.data.bugs);
      bugs.forEach((bug) => {
        const bugPara = document.createElement('p');
        bugPara.innerHTML = `<h2> ${bug.id}: ${bug.problem} </h2>`;
        bugListContainer.appendChild(bugPara);
      });
    });
};
// set button to display form on click
createBtn.addEventListener('click', () => {
  listFeatures();
  createBugList();
  document.body.appendChild(formContainer);
  document.body.appendChild(bugListContainer);
});

// set button to post form data on click
submitBtn.addEventListener('click', () => {
  const feature = document.querySelector('input[name="feature"]:checked');
  const bugData = {
    problem: problemInput.value,
    errorText: errorInput.value,
    commit: commitInput.value,
    feature: feature.value,
  };
  axios
    .post('/', bugData)
    .then((response) => {
      // display successful bug submission message
      const bugDiv = document.createElement('div');
      const newBug = response.data.bugData;
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
