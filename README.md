# Food Raccoon 

Using crowd wisdom to reduce food waste and improve health by utilizing IoT, machine learning, and social media.

## How it Works

Uses Clarifai's Food Vision API to find all the foods in every trash can picture created by my IoT camera. IoT camera takes one picture every 10 minutes, and will be turned on during lunch time. After lunch time is over, the device will send all the photos to my cloud app. Using all the foods found, my cloud app will display a leaderboard of which foods are being wasted the most in schools. Through individual school forums, I will compact all the ideas and form an overall sentiment pertaining to each school, using Microsoft's Cognitive Services (Sentiment Analysis). Two leaderboards, Best Sentiment Schools, and Worst Sentiment Schools, will also be displayed for users to see. Users can also see a graphical representation of a certain school's sentiment as months go by. Upon receiving these pieces of data, users can complete polls of which foods they would like to see in their menu.

<img src="https://i.imgur.com/a24N9i4.png" style="width: 700px"/>

## Built With

* Raspberry Pi + Camera Module
* Node.js 
* MongoDB
* Clarifai's Food Vision API
* Microsoft Cognitive Services
* Topix Forum API

## Submission

https://devpost.com/software/food-raccoon

## Screenshots

### Dashboard

<img src="https://i.imgur.com/6MdPhVW.png" />

### Sentiment Analysis based on Forums

<img src="https://i.imgur.com/1HGfyJw.png" />