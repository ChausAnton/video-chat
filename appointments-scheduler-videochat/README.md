# How to add connection to server

First you need to copy folder "lib" from "app-new" to your project. Then copy content from "index.js" and add to your index.js. you need to add auth0 to your project, after that add ID token from auth0 to to cookie with name "access_token". Your server must run on the same host as your client and on the same protocol. 

---

npm i --legacy-peer-deps

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

12. move ssl certificates to certs folder

13. run the app by "npm run start"