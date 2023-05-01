# Getting Started

## How to run
- configure .env file "look for, example, in .env.example"
    -   all env variable described in DOKCKER.md
- create folder "certs" with "fullchain.pem" and "privkey.pem" form https
- set serviceAccountKey.json in firebase foldet, you can get it from firebase 
- docker-compose -f docker-compose-dev.yml build
- docker-compose -f docker-compose-dev.yml up

### Deployment

## deploy to VM instance

1. Upload files to cloud with google cloud shell

2. create VM instance

3. set static External IP for VM instance

4. create firewall where you allow tcp:4443, tcp:2000-2020, udp:4443, udp:2000-2020

5. buy domain on google domains 

6. bind your domain to your VM instance by static External IP

7. connect to VM instance with google cloud shell

8. install all needed dependencies such as gcc, make, python, etc.

9. set MEDIASOUP_ANNOUNCED_IP to be equal to static External IP

10. set MEDIASOUP_LISTEN_IP to be equal to 0.0.0.0

11. generate ssl certificates with letsencrypt

12. create folder certs in server folder

12. move ssl certificates to certs folder

13. run the app by "npm run start"