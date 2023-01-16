
const bookmark = document.querySelector('.bookmark-btn-design') 

//nav
const mobileBurger = document.querySelector('.mobile-burger') 
const mobileNav = document.querySelector('.mobile-nav')
const mobileExit = document.querySelector('.exit-nav')


//pop-up const
const activateRewards = document.querySelectorAll('.select-reward-btn, .back-project');
const popUpDisplay = document.querySelector('.pop-up')
const exitPopUp = document.querySelector('.exit-pop-up')

//pledge buttons
const pledgeAccept = document.querySelectorAll('.continue-pledge-btn');
const purchasePopUp = document.querySelector('.purchase-complete');
const purchaseEnd = document.querySelector('.purchase-got-it');



const [overlayDiv, activateOverlay] = [document.createElement("div"), "overlay"];

bookmark.addEventListener('click', () => {
  if(bookmark.classList.contains('active')) {
    bookmark.classList.remove('active');
  } else {
    bookmark.classList.add('active');
    console.log('Bookmarked (literally does nothing)')
  }
});


//nav function



let originalState = {
  navActive: false,
  overlayActive: false,
  mobileBurgerDisplay: 'block',
  mobileExitDisplay: 'none'
}

mobileBurger.addEventListener('click', () => {
      mobileNav.classList.add('nav-active');
      overlayDiv.classList.add(activateOverlay);
      document.body.appendChild(overlayDiv);

      mobileBurger.style.display = 'none'
      mobileExit.style.display = 'block'
      originalState = {
        navActive: true,
        overlayActive: true,
        mobileBurgerDisplay: 'none',
        mobileExitDisplay: 'block'
      }
});

mobileExit.addEventListener('click', () => {
    mobileNav.classList.remove('nav-active');
    overlayDiv.classList.remove(activateOverlay);
    mobileExit.style.display = 'none'
    mobileBurger.style.display = 'block'
    originalState = {
      navActive: false,
      overlayActive: false,
      mobileBurgerDisplay: 'block',
      mobileExitDisplay: 'none'
    }
});

window.onresize = function() {
  if (window.innerWidth > 767 && popUpDisplay.style.display === 'none') {
    mobileNav.classList.remove('nav-active');
    overlayDiv.classList.remove(activateOverlay);
    mobileExit.style.display = originalState.mobileExitDisplay
    mobileBurger.style.display = originalState.mobileBurgerDisplay
  }
};

//pop-up-function
const togglePopUp = (isOpen) => {
  overlayDiv.classList[isOpen ? 'add' : 'remove'](activateOverlay);
  document.body.appendChild(overlayDiv);
  popUpDisplay.style.display = isOpen ? 'block' : 'none';
}

activateRewards.forEach(rewardsBtn => {
  rewardsBtn.addEventListener('click', () => {
    togglePopUp(true);
  })
});

exitPopUp.addEventListener('click', () => {
  togglePopUp(false);
});

//pledge functions purchase-complete
pledgeAccept.forEach(pledgeBtn => {
  pledgeBtn.addEventListener('click', () => {
    overlayDiv.style.zIndex = '3';
    purchasePopUp.style.display = 'block';
  })
})

purchaseEnd.addEventListener('click', () => location.reload(true))



//pledge inner display styles
const pledgeContainers = document.querySelectorAll('.pledge-container');
pledgeContainers.forEach(pledgeContainer => {
  pledgeContainer.addEventListener('click', function() {
    activatePledge(this);
  });
});

function activatePledge(pledge) {
  // Check if the pledge container has the class "no-stock-pledge" or "no-reward-pledge"
  

  // Select all pledge containers, pledge info containers, and pledge text containers
  const pledgeContainers = document.querySelectorAll('.pledge-container');
  const pledgeInfoContainers = document.querySelectorAll('.pledge-info-container');
  const pledgeTextContainers = document.querySelectorAll('.pledge-text-container');

  // Remove the "active" class from all pledge containers, pledge info containers, and pledge text containers
  pledgeContainers.forEach(container => container.classList.remove('active'));
  pledgeInfoContainers.forEach(container => container.classList.remove('active'));
  pledgeTextContainers.forEach(container => container.classList.remove('active-check'))

  


  // Check if the pledge container has the class "no-reward-pledge"

  if (pledge.classList.contains('no-stock-pledge')) {
    return;
  }

  // Add the "active" class to the selected pledge container, pledge info container, and pledge text container
  pledge.classList.add('active');
  pledge.querySelector('.pledge-info-container').classList.add('active');
  pledge.querySelector('.pledge-text-container').classList.add('active-check');

}