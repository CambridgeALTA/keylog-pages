// Available prompts
var prompts = [
  {
    id: "q1",
    topic: "Your superpower",
    text: "Imagine you could choose a superpower. What _one_ superpower would you like to have? Explain why you would like this superpower more than others you can imagine. What would you do with this new power and how would it change your life?",
  },
  {
    id: "q2",
    topic: "The best invention that does not exist",
    text: "Think of an invention that does not exist yet. What problem does it solve? How would it make the world a better place?",
  },
  {
    id: "q5",
    topic: "Unforgettable",
    text: "Write a short story with the title 'Unforgettable'. Your story must have a beginning, a middle and an end. The end must be surprising.",
  },
  {
    id: "q8",
    topic: "An animal for a day",
    text: "If you could be any animal you choose for one day, what animal would you choose? Why?",
  },
  {
    id: "q9",
    topic: "Your own television talk show",
    text: "You have the opportunity to have your own television talk show. Write to the television company and describe who you would like to interview on your talk show and why.",
  },
  {
    id: "q11",
    topic: "Thoughts from the present",
    text: "Write a letter to your future self. What do you want to say? Maybe you want to write about your future goals or give yourself some advice or a warning?",
  },
  {
    id: "q12",
    topic: "Would you rather ...",
    text: "Would you rather be invisible for a day or be able to fly for a day? Why?",
  },
  {
    id: "q16",
    topic: "An important decision",
    text: "Write about a time when you had to make an important decision. What was the decision? What did you decide? Describe how you felt about it.",
  },
  {
    id: "q18",
    topic: "A special place",
    text: "If you could be anywhere in the world right now, where would you choose to be? Describe the place. Why do you want to be there?",
  },
  {
    id: "q20",
    topic: "Reading in English",
    text: "Your friend wants to improve their English reading skills. Write an email to your friend: remember not to reveal personal information (so just use a first name, for instance). Write about what you find difficult about reading in English and give some ideas for how to practise and improve English reading.",
  },
];

// Variable to store the random prompt id from the list of prompts
var currentPromptId = "";

// Function to get the random Prompt
function showRandomPrompt() {
  var randomIndex = Math.floor(Math.random() * prompts.length);
  var randomPrompt = prompts[randomIndex];
  document.getElementById("prompt").innerText = randomPrompt.text;
  document.getElementById("topic").innerText = "Topic: " + randomPrompt.topic;
  currentPromptId = randomPrompt.id;
}

// When refreshing the page a new random prompt will be assigned
window.onload = showRandomPrompt;

function countWords() {
  // Get the input text value
  var text = document.getElementById("lname").value;

  // Initialize the word counter
  var numWords = 0;

  // Loop through the text
  // and count spaces in it
  for (var i = 0; i < text.length; i++) {
    var currentCharacter = text[i];

    // Check if the character is a space
    if (currentCharacter == " ") {
      numWords += 1;
    }
  }

  // Add 1 to make the count equal to
  // the number of words
  // (count of words = count of spaces + 1)
  numWords += 1;

  // Display it as output
  document.getElementById("show").innerHTML = numWords;
}

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
    selectedItem + "_" + selectedNumber + "_" + "prompt_" + currentPromptId;
  return file;
}
