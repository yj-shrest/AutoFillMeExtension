import axios from "axios";
let currentInputVariable;
const sampleData = {
  "first name": "Yujal",
  "last name": "Shrestha",
  name: "John Doe",
  "full name": "Yujal Shrestha",
  email: "john.doe@example.com",
  "e-mail address": "john.doe@example.com",
  "phone number": "9841000000",
  "mobile number": "9841000000",
  address: "Kathmandu",
  comments: "Thank You",
  "pan number": "123456789",
};
const fetchField = async (formUrl) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/scrape?url=${encodeURIComponent(formUrl)}`
    );
    return response.data.extractedText;
  } catch (err) {
    console.log("Error fetching data from the provided URL.:", err);
  }
};
async function autoFillForm() {
  const url = window.location.href;
  console.log("Fill form invoked: URL:", url);
  // const fields = await fetchField(url);
  // console.log(fields);
  let fields = [];
  const form = document.querySelector("form");
  const inputs = form.querySelectorAll("input, textarea");
  let filteredInputs = [];
  inputs.forEach((inputElement) => {
    let name = findFieldName(inputElement);
    if (name[0] !== "<") {
      fields.push(name);
      filteredInputs.push(inputElement);
    }
  });
  console.log(fields);

  filteredInputs.forEach((inputElement, index) => {
    let name = fields[index];
    if (sampleData[name.toLowerCase()]) {
      inputElement.value = sampleData[name.toLowerCase()];
      inputElement.dispatchEvent(new Event("input", { bubbles: true }));
      inputElement.dispatchEvent(new Event("change", { bubbles: true }));
      inputElement.focus();
      inputElement.parentElement.parentElement.parentElement.parentElement.classList.add(
        "CDELXb"
      );
      inputElement.parentElement.parentElement.parentElement.classList.add(
        "CDELXb"
      );
    }
  });
}

// Listen for messages from the popup or background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "fillForm") {
    autoFillForm();
    sendResponse({ status: "Form filled" });
  }
});

function findFieldName(target) {
  let currentElement = target;
  if (currentElement && currentElement.hasAttribute("title")) {
    return currentElement.getAttribute("title");
  }
  if (currentElement && currentElement.hasAttribute("placeholder")) {
    return currentElement.getAttribute("placeholder");
  }
  // Traverse upward through the DOM to find the previous element with text content
  let previousTextElement = null;

  // Traverse all the way up the DOM tree
  while (currentElement) {
    // Move to the parent element
    currentElement = currentElement.parentElement;

    // Check if the current element contains non-empty text (ignoring whitespaces)
    // Only check ancestors that are not siblings (skip the immediate parent div if it contains only text nodes)
    if (
      currentElement &&
      currentElement !== target.parentElement &&
      currentElement.textContent.trim() !== "" &&
      currentElement.textContent.trim() !== "Your answer"
    ) {
      previousTextElement = currentElement;
      break; // Stop once we find the first element with non-empty text
    }
  }
  previoustext = previousTextElement.textContent.trim();
  // If a previous element with text is found, log its text content
  if (previoustext.includes("*")) {
    // Use the replace method to remove the phrase (with global and case-insensitive flags)
    previoustext = previoustext.replace(new RegExp("\\*", "gi"), "").trim();
  }
  if (previoustext.includes("Your answer")) {
    // Use the replace method to remove the phrase (with global and case-insensitive flags)
    previoustext = previoustext
      .replace(new RegExp("Your answer", "gi"), "")
      .trim();
  }
  if (previoustext.includes("This is a required question")) {
    // Use the replace method to remove the phrase (with global and case-insensitive flags)
    previoustext = previoustext
      .replace(new RegExp("This is a required question", "gi"), "")
      .trim();
  }
  if (previousTextElement) {
    console.log("Previous element with text content:", previoustext);
  } else {
    console.log("No previous element with text content found.");
  }
  return previoustext;
}

document.addEventListener(
  "focus",
  function (event) {
    // Ensure the event target is an input field (input, textarea, or select)
    if (
      event.target &&
      (event.target.tagName === "INPUT" ||
        event.target.tagName === "TEXTAREA" ||
        event.target.tagName === "SELECT") &&
      isInForm(event.target)
    ) {
      if (
        event.target.attributes[
          Object.keys(event.target.attributes).find((key, id) => {
            let str = event.target.attributes[id].nodeValue.toLowerCase()
            return str.includes("search")||str.includes("query");
          })
        ]
      ) {
        return null;
      } else {
        currentInputVariable = event.target;
        let fieldname = findFieldName(event.target);
        createSuggestionBox(event.target, fieldname);
      }
    }
  },
  true
); // Use capturing phase to catch focus before it bubbles up

function createSuggestionBox(inputElement, name) {
  // Check if the suggestion box already exists, and remove it
  let existingBox = document.querySelector(".suggestion-box");
  if (existingBox) {
    existingBox.remove();
  }

  // Create a new suggestion box
  let suggestionBox = document.createElement("div");
  suggestionBox.className = "suggestion-box";

  let suggestion = sampleData[name.toLowerCase()];
  // Add some sample suggestions
  let suggestions = [suggestion];
  let inputFocus = true;
  // Populate the suggestion box with items
  suggestions.forEach((suggestion) => {
    let suggestionItem = document.createElement("div");
    suggestionItem.textContent = suggestion;
    suggestionItem.classList.add("suggestion-item");
    suggestionItem.addEventListener("click", function () {
      // inputFocus = false;

      console.log("injecting data:", suggestion);
      // inputElement.focus();

      currentInputVariable.value = suggestion;
      currentInputVariable.dispatchEvent(new Event("input", { bubbles: true }));
      currentInputVariable.dispatchEvent(
        new Event("change", { bubbles: true })
      );
      currentInputVariable.focus();
      // document.execCommand('insertText', false, 'Some Answer');
      suggestionBox.remove();
      currentInputVariable.parentElement.parentElement.parentElement.parentElement.classList.add(
        "CDELXb"
      );
      currentInputVariable.parentElement.parentElement.parentElement.classList.add(
        "CDELXb"
      );
    });
    suggestionBox.appendChild(suggestionItem);
  });
  let rect = inputElement.getBoundingClientRect();
  suggestionBox.style.position = "absolute";
  suggestionBox.style.left = `${rect.left + window.scrollX}px`;
  suggestionBox.style.top = `${rect.top + rect.height + 15 + window.scrollY}px`; // Position below the input field
  suggestionBox.style.width = `${rect.width}px`; // Match the width of the input field
  suggestionBox.style.backgroundColor = "white";
  suggestionBox.style.border = "1px solid #ccc";
  suggestionBox.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
  suggestionBox.style.zIndex = "1000";

  // inputElement.addEventListener('blur', function() {
  //     suggestionBox.remove();
  // });
  // Append the suggestion box to the body
  document.body.appendChild(suggestionBox);

  // Close the suggestion box when clicking outside of it
  document.addEventListener(
    "click",
    function (event) {
      if (
        !suggestionBox.contains(event.target) &&
        event.target !== inputElement
      ) {
        suggestionBox.remove();
      }
    },
    {}
  );
}
function isInForm(inputElement) {
  // Check if the input element is valid and belongs to a form
  return inputElement && inputElement.form !== null;
}

const style = document.createElement("style");
style.textContent = `
  .suggestion-box {
    max-height: 150px;
    overflow-y: auto;
    background-color: #fff;
    border: 1px solid #ccc;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    border-radius: 5px;
    box-sizing: border-box;
  }
  .suggestion-item {
    padding: 8px 10px;
    cursor: pointer;
  }
  .suggestion-item:hover {
    background-color: #f0f0f0;
  }
`;
document.head.appendChild(style);
