# scouting-app
This app was created for high school robotics teams to enter competitive scouting data at First Robotics Competitions. Because WiFi is not permitted it uses QR codes to transmit data from phones to the database. It's written in React Native so it runs on any platform.

# How it works
This repository contains two components. The phone app for entering data, and the desktop app for reading QR codes and storing the data.

The app uses a schema to generate the forms that are displayed to users. If we simply transfered the entered data in a JSON format the QR codes would be too large to read reliably. In order to prevent this we have two solutions. One solution is to just use multiple QR codes. This allows any amount of data to be transfered but it can take longer. The other way is to pack the data as efficiently as possible. We do this by treating the form schema as a series of bases, each one representing the number of possible inputs for that value, and encoding this as a mixed-radix number. This means each possible state of the form has a unique number and we just need to send that. Strings are encoded with their length so we don't waste space with blank characters.

# Installation
Make sure you have a new version of `nodejs` and `npm` installed. In order to test the app you must install a few libraries. Start by installing `expo-cli` with
```
npm install -g expo-cli
```

You might need to run it as root.   To just be able to run the desktop side, after cloning this repository run ```npm install``` in both scouting-app and desktopSide. Then you can open the desktop app with ```cd desktopSide``` ```npm start```
   git clone this repository with
```
git clone https://github.com/Arctos6135/scouting-app.git
cd scouting-app
```
You can run the expo server with
```
npm start
```
It will open the QR code in you browser and you can scan that with the expo app on your phone to see the app.

Thank you to our generous sponsors:<br/>
<img src="https://dynamicmedia.zuza.com/zz/m/original_/3/a/3aae60b3-ff18-4be5-b2b1-e244943a85fb/TDSB_Gallery.png" alt="Toronto District School Board" height="200px"/>
<img src="https://developer.nordicsemi.com/.webresources/NordicS.jpg" alt="Nordic Semiconductors" height="170px"/>
<img src="https://upload.wikimedia.org/wikipedia/en/thumb/5/50/SNC-Lavalin_logo.svg/1280px-SNC-Lavalin_logo.svg.png" alt="SNC-Lavalin" height="170px"/>
<img src="https://user-images.githubusercontent.com/32781310/52970668-acd64780-3382-11e9-857f-85b829690e0c.png" alt="Scotia McLeod" height="200px"/>
<img src="https://kissmybutton.gr/wp-content/uploads/2017/09/ryver.png" alt="Ryver Inc." height="200px"/>
<img src="https://user-images.githubusercontent.com/32781310/52224389-eaf94480-2875-11e9-82ba-78ec58cd20cd.png" alt="The Maker Bean Cafe" height="200px"/>
<img src="http://connecttech.com/logo.jpg" alt="Connect Tech Inc." height="200px"/>
<img src="https://brafasco.com/media/wysiwyg/HDS_construction_industrial_BF_4C_pos.png" alt="HD Supply Brafasco" height="200px"/>
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqnEGnLesUirrtMQfhxLGUTZn2xkVWpbROlvmABI2Nk6HzhD1w" alt="Arbour Memorial" height="200px"/>
