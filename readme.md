# Simple Chrome Extension

A simple chrome extension that adds your own custom CSS file to a page.

> Find more interesting software at [https://CodeRunDebug.com](https://coderundebug.com/)

## Testing

You can test your extension in chrome, using it just like any other extension. You need to do the following.

- In the chrome browser, go to the chrome menu, look for "Extensions > Manage Extensions".
- Look for a "Developer mode" switch and turn it on.
- Select the "Load unpacked" button.
- Find the "extension" folder inside the repo.
- Once chrome has loaded it in, if there are no issues, then you can use the extension like any other.

## Folders

- **extension** This is the folder that chrome will need to be pointed to. You will also need to zip the contents of this folder and then use the zip file when deploying it.

- **images** This is used to create and format all the images that are used. You will need to copy the final finished files into the extension folder.

- **extension/_locales/en/messages.json** These files contain all the words the extension uses, in all the different lanuages you want to support.

- **extension/images/** The images used by the extension, in all the sizes required.

## Manifest JSON File

Below is some information relating to setting up the `manifest.json` file.


```json
"name": "__MSG_title__",
"description": "__MSG_description__",
"default_locale": "en",
```

When you are using a `_locales` folder, which is used for different translations, the `__MSG_title__` text points to the `title` property, and the `__MSG_description__` text links to the `description` property. This way, you are not hard coding the title and description in just one language.

You will need to set the default language (locale). This much match one of the `_locales` subfolders you are using.

```json
"author": "StephenPaulHassall@hotmail.com",
"homepage_url": "https://CodeRunDebug.com",
```

You need to replace the author property to your own email address. Also make sure the home page URL points to one of your own web sites.

```json
"background": {
  "service_worker": "background.js"
},
```

This points to the background service worker JavaScript file. Most of your code will be placed in here.

