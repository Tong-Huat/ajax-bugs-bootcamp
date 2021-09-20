// create "Create A Bug button"
const createBtn = document.createElement('button');
createBtn.innerText = 'Create A Bug';
document.body.appendChild(createBtn);

const reportNewBug = document.createElement('p');
reportNewBug.innerText = 'Report A Bug:';
// create form container to append all form elements
const formContainer = document.createElement('div');
// create form elements: problem, error, commit, feature
const problemInput = document.createElement('input');
problemInput.placeholder = 'Input problem';
problemInput.setAttribute('required', 'required');

const errorInput = document.createElement('input');
errorInput.placeholder = 'Input Error';
errorInput.setAttribute('required', 'required');

const commitInput = document.createElement('input');
commitInput.placeholder = 'Input Commit';
commitInput.setAttribute('required', 'required');

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
        featureBtn.setAttribute('required', 'required');

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

// create submit form btn for bug
const submitBtn = document.createElement('button');
submitBtn.innerText = 'Create Bug';

// append all form elements to container
formContainer.appendChild(reportNewBug);
formContainer.appendChild(problemInput);
formContainer.appendChild(errorInput);
formContainer.appendChild(commitInput);
formContainer.appendChild(featureDiv);
formContainer.appendChild(submitBtn);

// create bug list container
const bugListContainer = document.createElement('div');
bugListContainer.classList.add('container');

const rows = document.createElement('div');
rows.classList.add('row');

const bugList = document.createElement('p');
bugList.innerText = 'List of Bugs Reported:';

bugListContainer.appendChild(bugList);
bugListContainer.appendChild(rows);

const createBugList = () => {
  axios
    .get('/index')
    .then((response) => {
      const { bugs } = response.data;
      console.log(response.data.bugs);
      bugs.forEach((bug) => {
        const bugDiv = document.createElement('div');
        bugDiv.classList.add('col-8', 'bug-card');
        bugDiv.innerHTML = `<div class="card">
            <div class="card-body">
              <p> 
        ${bug.id}: ${bug.problem}
              </p>
            </div>
        </div>`;
        rows.appendChild(bugDiv);
      });
    });
};

// create feature container to append feature element
const featureContainer = document.createElement('div');
featureContainer.classList.add('container');

const reportNewFeature = document.createElement('p');
reportNewFeature.innerText = 'Report New Bug Feature:';

const featureRows = document.createElement('div');
featureRows.classList.add('col-8', 'row');
// create feature element: name
const featureName = document.createElement('input');
featureName.placeholder = 'Input Feature Name';
featureName.setAttribute('required', 'required');

// create submit form btn for bug
const createFeatureBtn = document.createElement('button');
createFeatureBtn.innerText = 'Create Feature';

featureRows.appendChild(featureName);
featureContainer.appendChild(reportNewFeature);
featureContainer.appendChild(featureRows);
featureContainer.appendChild(createFeatureBtn);

// set button to display form on click
createBtn.addEventListener('click', () => {
  document.body.removeChild(createBtn);
  // bugDiv.innerHTML = '';
  createBugList();
  listFeatures();
  document.body.appendChild(formContainer);
  document.body.appendChild(bugListContainer);
  document.body.appendChild(featureContainer);
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
      console.log('response :>> ', response);

      const newBug = response.data.bug.problem;
      alert(`New Bug Problem (${newBug}) Created`);
      problemInput.value = '';
      errorInput.value = '';
      commitInput.value = '';
    })
    .catch((error) => {
    // handle error
      console.log(error);
    });
});

// set button to post form data on click
createFeatureBtn.addEventListener('click', () => {
  const featureData = {
    feature: featureName.value,
  };

  axios
    .post('/createFeature', featureData)
    .then((response) => {
      console.log('response :>> ', response.data.feature);
      console.log('feature created');
      featureName.value = '';
      const newFeature = response.data.feature.name;
      alert(`New Feature (${newFeature}) Created`);
    })
    .catch((error) => {
    // handle error
      console.log(error);
    });
});
