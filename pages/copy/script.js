// Global variables
var delay = 1000;
var next_saved = delay;


// // Initialise the record - get user language, agent, and date
// var startRecord = {
//   type: "start",
//   language: navigator.language,
//   useragent: navigator.userAgent,
//   time: Date.now(),
// };

// Initialise the list with the keylogs to be returned
// Include StartRecord if you want to capture metadate
var dset = [];

// Create the textbox and initialise it
textbox = document.getElementById("lname");
textbox.value = "";

// Add a record when a key is pressed when focused on the textbox element.
textbox.addEventListener("keydown", (res) => {
  var nline = {
    time: res.timeStamp,
    type: "down",
    key: res.key,
    key_code: res.code,
    range_start: res.target.selectionStart,
    range_end: res.target.selectionEnd,
  };

  if (res.altKey) {
    nline.alt_key = true;
  }
  if (res.ctrlKey) {
    nline.ctrl_key = true;
  }
  if (res.metaKey) {
    nline.meta_key = true;
  }
  if (res.shiftKey) {
    nline.shift_key = true;
  }
  if (res.repeat) {
    nline.is_repeat = true;
  }

  dset.push(nline);
});

// Add a record when a key is released when focused on the textbox element.
textbox.addEventListener("keyup", (res) => {
  var nline = {
    time: res.timeStamp,
    type: "up",
    key: res.key,
    key_code: res.code,
    range_start: res.target.selectionStart,
    range_end: res.target.selectionEnd,
  };

  if (res.altKey) {
    nline.alt_key = true;
  }
  if (res.ctrlKey) {
    nline.ctrl_key = true;
  }
  if (res.metaKey) {
    nline.meta_key = true;
  }
  if (res.shiftKey) {
    nline.shift_key = true;
  }
  if (res.repeat) {
    nline.is_repeat = true;
  }

  dset.push(nline);
});

// Add a record when the mouse is clicked in the textbox element.
textbox.addEventListener("click", (res) => {
  var nline = {
    time: res.timeStamp,
    type: "click",
    range_start: res.target.selectionStart,
    range_end: res.target.selectionEnd,
  };

  if (res.altKey) {
    nline.alt_key = true;
  }
  if (res.ctrlKey) {
    nline.ctrl_key = true;
  }
  if (res.metaKey) {
    nline.meta_key = true;
  }
  if (res.shiftKey) {
    nline.shift_key = true;
  }
  if (res.repeat) {
    nline.is_repeat = true;
  }

  dset.push(nline);
});

// Add a record when there is an input
textbox.addEventListener("input", (res) => {
  var nline = {
    time: res.timeStamp,
    type: "insert",
    text: res.data || "",
    range_start: res.target.selectionStart,
    range_end: res.target.selectionEnd,
  };

  // If it has been a while, also store the current text as well:
  if (res.timeStamp > next_saved) {
    next_saved = res.timeStamp + delay;
    dset.push({
      time: res.timeStamp,
      type: "capture",
      text: textbox.value,
    });
  }

  dset.push(nline);
});


downloadLink = document.getElementById("downloadAnchorElem");
downloadLink.addEventListener("click", (res) => {
  // add one last record of the full final text
  dset.push({
    time: res.timeStamp,
    type: "capture",
    text: textbox.value,
  });

  // collapse records to a string
  var dataStr =
    "data:application/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(dset));
  var dlAnchorElem = document.getElementById("downloadAnchorElem");

  //Handle unique identifier
  let user = fileName();
  let today = Date.now();
  downloadLink.setAttribute("href", dataStr);
  downloadLink.setAttribute(
    "download",
    "keylogs_" + today + "_" + user + ".json"
  );
});

function fileName() {
  var items = [
    "Sun",
    "Moon",
    "Star",
    "Sky",
    "Ocean",
    "Cake",
    "Wolf",
    "Eagle",
    "Lion",
    "Tiger",
  ];
  var randomIndex = Math.floor(Math.random() * items.length);
  var selectedItem = items[randomIndex];
  var totalNumbers = 1000000;
  var selectedNumber = Math.floor(Math.random() * totalNumbers) + 1;
  file =
    selectedItem + "_" + selectedNumber + "_" + "copy";
  return file;
}
