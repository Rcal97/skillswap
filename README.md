# SkillSwap
A hyperlocal web platform to exchange skills between neighbors, without money.

## Description
SkillSwap allows people in the same neighborhood to publish skill exchange offers.
For example: "I teach guitar, I need math tutoring".
Offers are displayed on an interactive map, making it easy to find people nearby.

## Features
Publish a skill exchange offer.
View offers on an interactive map.
Geolocation via map click.
Progressive web app (mobile and works offline).

## Tech Stack
Frontend: HTML5, CSS3, JavaScript, jQuery, Leaflet.js
Backend: Python + Flask
Database: MongoDB
PWA: Service Worker + Web Manifest

## Requirements
Python 
MongoDB
pip

## Installation
Clone the repository: git clone https://github.com/Rcal97/skillswap.git, cd skillswap
Create and activate ve: python3 -m venv venv, source venv/bin/activate
Install dependencies: pip install flask pymongo
Start MongoDB: sudo systemctl start mongod
Run the application: python app.py
Open your browser at: http://127.0.0.1:5000

## License
Apache 2.0