// Set date to today
document.getElementById('lastFillDate').valueAsDate = new Date();
/**
 * Run copyText() function if Ctrl+C is pressed
 */
document.addEventListener('keydown', (e) => {
  // event.metaKey - pressed Command key on Macs
  // event.ctrlKey - pressed Control key on Linux or Windows
  if ((e.metaKey || e.ctrlKey) && e.code === 'KeyC') {
    copyText();
  }
})
/**
 * Shows/Hides custom days supply input.
 * Triggered by onchange event.
 */
function showCustomDays() {
  const daysSupplyInput = document.getElementById('daysSupply');
  if (daysSupplyInput.value == 'custom') {
    document.getElementById('customDays').style.display = 'block';
  } else {
    document.getElementById('customDays').style.display = 'none';
  }
  calc();
}
/**
 * Calculates days supply and outputs via innerHTML.
 * Triggered by onclick event.
 */
function calc() {
  // Data Validation
  if (document.getElementById('daysEarly').value == '' || (document.getElementById('daysSupply').value == 'custom' && document.getElementById('customDaysSupply').value == '')) {
    document.getElementById('result').innerHTML = 'Invalid input(s)';
  } else {
    // Get last fill date and convert to date object
    let lastFillDate = document.getElementById('lastFillDate').value;
    lastFillDate = new Date(lastFillDate.replace(/-/g, '\/'));
    // Get today's date and convert to date object
    let todayDate = new Date();
    todayDate = new Date(todayDate.getFullYear()+'/'+Number(todayDate.getMonth()+1)+'/'+todayDate.getDate())
    // Get difference between last fill date and today's date
    let dateDif = Math.round((todayDate.getTime() - lastFillDate.getTime()) / (1000 * 3600 * 24));
    // Get days supply
    let daysSupply;
    if (document.getElementById('daysSupply').value == 'custom') {
      daysSupply = document.getElementById('customDaysSupply').value;
    } else {
      daysSupply = document.getElementById('daysSupply').value;
    }
    // Get days early
    let adjustedDaysEarly = daysSupply - document.getElementById('daysEarly').value;

    if (dateDif < adjustedDaysEarly) {
      let tooEarly = adjustedDaysEarly - dateDif;
      let nextFill = addDays(lastFillDate,adjustedDaysEarly);

      document.getElementById('result').innerHTML = 'Filling '+tooEarly+' day(s) early';
      document.getElementById('nextFill').style.display = 'block';
      document.getElementById('nextFill').innerHTML = 'Last fill date: '+lastFillDate.toLocaleDateString('en-US')+' for '+daysSupply+' days<br>Next fill date: '+nextFill.toLocaleDateString('en-US')+' ['+document.getElementById('daysEarly').value+' day(s) early]';
    } else {
      document.getElementById('result').innerHTML = 'Filling 0 days early or less';
      document.getElementById('nextFill').style.display = 'none';
      document.getElementById('nextFill').innerHTML = '';
    }
  }
}
/**
 * Adds/Subtracts days from date.
 * 
 * @param {date} date Date to add/subtract.
 * @param {number} days Number of days to add/subtract.
 * @return {date} date + days.
 */
function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
/**
 * Copies next fill date info and displays alert.
 * Triggered by onclick event.
 */
function copyText() {
  var result = document.getElementById('nextFill').innerText
  if (document.getElementById('nextFill').innerText.length == 0) {
    alert('No text found');
  } else {
    navigator.clipboard.writeText(result);
    document.getElementById('copyAlert').style.display = 'block';
    document.getElementById('copyAlert').innerHTML = 'Text copied!';
    setTimeout(function() {
      document.getElementById('copyAlert').innerHTML = '';
      document.getElementById('copyAlert').style.display = 'none';
    }, 2000);
  }
}
