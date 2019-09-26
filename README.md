# GuardRailsApp
This GuardRailsApp project uses ReactJs for frontend, NodeJs for backend to build a web application for requirements in the challenge.

## Presiquisites:
Please install Docker, Docker Compose and Mongodb server in your local to run the demo.

## How to run the application:
* Clone code from this repository to source folder.
* Start Mongodb server in your local.
* Go to source code folder. Execute command: .
    * `sudo docker-compose up -d`
* Open the browser, go to url: **http://localhost:8080/**. It will display the **"List of security scan results"** page.
* Click on the link **"Post a new scan result"**. It will display a form to post a new security scan result and store it into Mongodb.
* After that, it will redirect to **"List of security scan results"** page. With each scan result record, if it has **"findings"** data, it will display **number of findings** in column "Findings" of the list.    
* Click on **number of findings badge** of each scan result record, it will display **"List of findings"** page of that scan result record.

## Other Informations:
* We use database **"ScanResultDb"**, collection **"scanresults"** in Mongodb to store security scan results. To ensure uniqueness of id of security scan results in Mongodb, we can create index for field **"id"** using command: `db.collection.createIndex`
* If you want to run backend, frontend part manually, separate, in each folder **"api"**, **"dashboard"** has Dockerfile for each part. You can build docker image for each part, and run it from docker image. Notes: we use network mode **"host"** for our dockers. 
