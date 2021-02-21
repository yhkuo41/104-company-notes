# 104 Company Notes 🤔

針對104人力銀行設計的chrome插件，可自訂對公司的評價並記錄成清單，插件會根據個人的評價幫公司名稱著色，除方便求職者個人記錄用之外，也可透過其他插件匯出評價清單和其他求職者分享。

## 安裝連結
1. [點我](https://chrome.google.com/webstore/detail/104-company-notes/fkpbbanojkgabinplpdoehncppjekdag?hl=zh-TW&authuser=5)安裝104 Company Notes
2. [點我](https://chrome.google.com/webstore/detail/storage-area-explorer/ocfjjjjhkpapocigimmppepjgfdecjkb)安裝Storage Area Explorer(Note分享需安裝，若僅個人使用可不必安裝)

## Note使用
1. 瀏覽104人力銀行並在公司／職缺頁面點選圖示，填寫筆記後送出
![](https://i.imgur.com/7lgJgpF.png)
2. 重新整理頁面就會看到有個人筆記的公司名稱被上色
* 公司頁面
![](https://i.imgur.com/njnek7v.png)
* 職缺頁面
![](https://i.imgur.com/TIFQH3B.png)
* 搜尋結果頁面
![](https://i.imgur.com/4Pif37W.png)
* 1~5顆星評價樣式如下（ 不好找公司demo低評價的樣式，大家可以自己試用，可以上色成黑色／灰色，方便避雷用，可能也是本插件最常見的使用方式 🤔 ）
![](https://i.imgur.com/PFj3aj4.png)
3. 再次到有筆記的公司點選圖示可看到之前的筆記，若要更新筆記，重新填寫後送出即可

## Note分享
1. 匯出與匯入功能需藉由其他插件[Storage Area Explorer](https://chrome.google.com/webstore/detail/storage-area-explorer/ocfjjjjhkpapocigimmppepjgfdecjkb)實現，安裝後請在104人力銀行頁面點擊本插件圖示 🤔 ，並在彈出視窗右鍵點檢查
![](https://i.imgur.com/kT4sYnF.png)

2. 點DevTools視窗右上方的Storage Explorer，在此視窗可以看到本插件的chrome本地儲存庫，可使用Export和Import裡的To File(存成json檔)來進行Note分享
![](https://i.imgur.com/OsPSGC4.jpg)

❗ 注意同一公司的Note會互相覆蓋，若不希望自己的Note被匯入的其他Note覆蓋，可以先將自己的Note匯出，先匯入其他Note，再重新將自己的Note匯回

3. 若希望整理成試算表形式，可以透過[json to xlsx](https://www.google.com/search?q=json+to+xlsx&rlz=1C5CHFA_enTW935TW935&oq=js&aqs=chrome.0.69i59l2j69i57j69i59j69i61j69i60l3.2220j0j7&sourceid=chrome&ie=UTF-8)或[json to csv](https://www.google.com/search?rlz=1C5CHFA_enTW935TW935&sxsrf=ALeKk00Fsb69ufodo4lxPdKqIDXVpfOzUw%3A1612798653255&ei=vVohYKqED-qRr7wPnpOR8AM&q=json+to+csv&oq=json+to+csv&gs_lcp=CgZwc3ktYWIQAzIHCCMQsAMQJzIFCAAQsAMyBQgAELADMgUIABCwAzIFCAAQsAMyBQgAELADMgUIABCwAzIFCAAQsAMyBQgAELADMgUIABCwA1AAWABgwVdoBnAAeACAAUiIAUiSAQExmAEAoAECqgEHZ3dzLXdpesgBCsABAQ&sclient=psy-ab&ved=0ahUKEwjq1siWz9ruAhXqyIsBHZ5JBD4Q4dUDCA0&uact=5)等線上轉換工具，把json檔案整理成易於閱讀的形式，反之亦可將csv轉為json，但需注意格式、欄位名稱與編碼等問題。