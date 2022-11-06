const milestonesData = JSON.parse(data).data;

// load course milestone data
function loadMilestones() {
  const milestones = document.querySelector('.milestones');

  milestones.innerHTML = `${milestonesData
    .map(function(milestone){
    return `<div class="milestone border-b" id="${milestone._id}">
            <div class="flex">
              <div class="checkbox"><input onclick="markMilestones(this, ${milestone._id})" type="checkbox" /></div>
              <div onclick="openMilestones(this, ${milestone._id})">
                <p>
                  ${milestone.name}
                  <span><i class="fas fa-chevron-down"></i></span>
                </p>
              </div>
            </div>
            <div class="hidden_panel">
              ${milestone.modules.map(function (module){
                return `<div class="module border-b">
                        <p>${module.name}</p>
                        </div>`
                  }).join("")}
            </div>
          </div>`
  }).join("")}`
}

//open milestone item data
function openMilestones(milestoneElement,id) {
  const currentPanel = milestoneElement.parentNode.nextElementSibling;
  const shownPanel = document.querySelector('.show')
  const active = document.querySelector('.active');

  if(active && !milestoneElement.classList.contains('active')){
    active.classList.remove('active');
  }

    milestoneElement.classList.toggle('active');

    if(!currentPanel.classList.contains('show') && shownPanel){
      shownPanel.classList.remove('show');
    }
  currentPanel.classList.toggle("show");

  
  showMilestone(id);
}

//show milestone title and image
function showMilestone(id){
  const title = document.querySelector('.title');
  const details = document.querySelector('.details');
  const milestoneImage = document.querySelector('.milestoneImage');

  milestoneImage.style.opacity = "0";
  milestoneImage.src = milestonesData[id].image;
  title.innerText = milestonesData[id].name;
  details.innerText = milestonesData[id].description;
}


//image load animation
const milestoneImage = document.querySelector('.milestoneImage');
milestoneImage.onload = function(){
  this.style.opacity="1";
}


//mark milestone data
function markMilestones(checkbox, id){
  const milestones = document.querySelector('.milestones');
  const doneList = document.querySelector('.doneList')
  const item = document.getElementById(id);
  if(checkbox.checked){
    milestones.removeChild(item);
    doneList.appendChild(item);
    
  }else{
    milestones.appendChild(item);
    doneList.removeChild(item);
  }
}

loadMilestones();