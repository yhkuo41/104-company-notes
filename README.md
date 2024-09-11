# 104 Company Notes 🤔

**English | [中文](./README-zh.md)**

A Chrome extension designed for the 104 Job Bank that allows users to customize and save evaluations for companies, organizing them into a list. The extension highlights company names based on personal evaluations, making it easier for job seekers to keep track of their notes. Evaluations can also be shared with other users through additional plugins.

## Installation Links
1. [Install 104 Company Notes](https://chrome.google.com/webstore/detail/104-company-notes/fkpbbanojkgabinplpdoehncppjekdag?hl=zh-TW&authuser=5)
2. [Install Storage Area Explorer](https://chrome.google.com/webstore/detail/storage-area-explorer/ocfjjjjhkpapocigimmppepjgfdecjkb) (Required for sharing notes. Not necessary for personal use only.)

## How to Use Notes
1. Browse 104 Job Bank, click the icon on company/job pages, fill in your note, and submit.
   ![](https://i.imgur.com/7lgJgpF.png)
2. Refresh the page to see company names highlighted according to your notes:
   - **Company Page:**
     ![](https://i.imgur.com/njnek7v.png)
   - **Job Page:**
     ![](https://i.imgur.com/TIFQH3B.png)
   - **Search Results:**
     ![](https://i.imgur.com/4Pif37W.png)
   - **Rating Styles from 1-5 Stars:**  
     _(Not good to find a company to demo low rating style, you can try to use their own. Highlighting in black/grey can help to avoid certain companies, which might be the most common usage of this plugin 🤔.)_
     ![](https://i.imgur.com/PFj3aj4.png)
3. Click the icon on a company with an existing note to view your previous note. To update the note, simply fill it in again and submit.

## Sharing Notes
1. Exporting and importing notes require the [Storage Area Explorer](https://chrome.google.com/webstore/detail/storage-area-explorer/ocfjjjjhkpapocigimmppepjgfdecjkb) plugin. After installation, click the plugin icon on the 104 Job Bank page, right-click the pop-up window, and select "Inspect".
   ![](https://i.imgur.com/kT4sYnF.png)

2. In the DevTools window, select "Storage Explorer" from the top right. Here, you can view the Chrome local storage for the plugin and use the export and import functions to file in JSON format to share notes.
   ![](https://i.imgur.com/OsPSGC4.jpg)

   ❗ Notes for the same company will overwrite each other. To prevent your own notes from being overwritten by imported notes, export your notes first, import the others, and then re-import your own.

3. To convert notes to spreadsheet format, use online tools like [JSON to XLSX](https://www.google.com/search?q=json+to+xlsx) or [JSON to CSV](https://www.google.com/search?q=json+to+csv). You can also convert from CSV to JSON, but be mindful of formatting, field names, and encoding issues.
