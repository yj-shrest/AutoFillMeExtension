# AutoFillMe Extension

AutoFillMe Browser Extension allows users to automatically fill online forms with custom user data. The extension intelligently detects form fields on a webpage and auto-populates them with relevant information, streamlining the process of completing forms online.

---

## How to Use

### Download the Extension

You can download the latest version of the AutoFillMe Extension from the following link:

[Download AutoFillMe Extension](https://github.com/yj-shrest/AutoFillMeExtension/releases/download/V.1.2/dist.zip)

### Install the Extension

Before installing the extension, you need to configure the user data.

1. **Download and Extract the ZIP File**
   - Download the `dist.zip` file from the above link.
   - Extract the contents of the ZIP file to a folder of your choice.

2. **Configure the `data.json` File**
   - Inside the extracted folder, locate the `data.json` file.
   - Open the `data.json` file and configure it with your personal details. 
     
     **Important Note:** While adding keys to the `data.json` file, **USE SMALL CASE ONLY**.

     Here's an example of how to configure the file:

     ```json
     {
         "comment": "Edit this file to add personal information fields.",
         "important note": "While adding key values USE SMALL CASE ONLY",
         "first name": "Yujal",
         "last name": "Shrestha",
         "name": "Edit",
         "full name": "Edit",
         "email": "example.example@example.com",
         "e-mail address": "example.example@example.com",
         "phone number": "9841000000",
         "mobile number": "9841000000",
         "address": "Kathmandu",
         "pan number": "123456789"
     }
     ```

3. **Install the Extension in Your Browser**
   
   #### For Google Chrome:
   1. Open Google Chrome and go to the Extensions page: `chrome://extensions/`.
   2. Enable "Developer mode" by toggling the switch in the top right corner.
   3. Click on the "Load unpacked" button.
   4. Navigate to the folder where you extracted the `dist.zip` file, and select the folder.

   #### For Mozilla Firefox:
   1. Open Firefox and go to the Add-ons page: `about:addons`.
   2. Click on the gear icon in the top-right and select "Install Add-on From File."
   3. Choose the extracted folder that contains the extension files.

4. After installing the extension, the icon will appear in the browser toolbar, ready to use.

---

### How the Extension Works

Once the extension is installed, it will automatically detect the form fields on websites that you visit. It will populate these fields with the information from the `data.json` file, saving you time when filling out forms.

---

## Development Instructions

We used **Vite** to build this project. If you'd like to make changes to the code or build the project from source, follow these instructions:

1. **Clone the Repository**

   Clone the repository to your local machine:

   ```bash
   git clone https://github.com/yj-shrest/AutoFillMeExtension.git
   cd AutoFillMeExtension
   ```

2. **Install Dependencies**

   Install the required dependencies using npm:

   ```bash
   npm install
   ```

3. **Run the Development Server**

   To run the extension in development mode, use Vite's development server:

   ```bash
   npm run dev
   ```

4. **Build the Extension**

   After making changes to the code, you can build the extension by running:

   ```bash
   npm run build
   ```

   This will generate the production-ready files in the `dist` folder.

---

## Contributing

We welcome contributions to improve this project! Feel free to fork the repository, make your changes, and create a pull request.
