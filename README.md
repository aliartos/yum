# Yum - Food orders

#### Order food daily from the best chef in town!

## [License](LICENSE)

Copyright (C) 2017 JR Technologies.

Yum is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License
as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

Yum is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; 
without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
See the GNU General Public License for more details.

## Credits

This software was developed during the Training Bootcamp 2017 at [JR Technologies](http://www.jrtechnologies.com).

Team members:
* Lazos Christos
* Venizelos Kostas
* Manatakis Ioannis
* Piperidi Sofia Anna

Also contributed to this project: Vasilis Antonakis, Alex Ntousakis, Angie Spyrou, Thymios Floros, Dimitris Ntilis, George Filippakis, 
Stavros Apostolakis, Stefanos Markakis, Andreas Kolokotronis, Isidoros Kefakis, Kostas Asargiotakis, Dimitris Marmatakis, Stelios Iliadis.

## Requirements

**Runtime:**

* JRE 1.7 or higher
* Mysql server
* SMTP account

**Build:**

* Node.js, JDK SE
 
**Debug/Development:**

* Netbeans (Optionally with NB spring boot plugin installed)

## Installation

* clone the git repository

* in the `Yum/src/main/resources` folder, you will find `application-*.properties`. Fill in the configuration settings as follow:
	* Modify `server.port = 80` if needed
	* Modify `spring.datasource.url` to point to your mysql server.
	* Modify the username and password of the datasource to match with your mysql user.
	* Modify `spring.mail.host`, `spring.mail.port`, `spring.mail.username` and `spring.mail.password` to match with your SMTP account.
	* If your SMTP server needs extra authentication or encryption, you can use the following properties `spring.mail.properties.mail.smtp.*` below.
	* Modify `yum.mail.from` and enter here the email address that should be used as sender to send all automatic emails.
	* Modify `yum.mail.domain` to reflect the hostname your yum server will be accessible to on the network
	* Modify `yum.tokenExpiration.unit` and enter here the unit of time (SECOND, MINUTE or HOUR) for the expiration of the jwt token. 
	* Modify `yum.tokenExpiration.value` and enter here the value for the expiration of the jwt token.
	*  LDAP / Active directory authentication:
	Optionally you can enable ldap authentication by setting the following vars:
		* Modify `yum.ldap.enabled` to true to enable ldap auth.
		* Modify `yum.ldap.base` to set the base DN.
		* Modify `yum.ldap.url` to point to the ldap server.
		* Modify `yum.ldap.domain` optionally for Active Directory to authenticate users on domain.
		* Modify `yum.ldap.idAttribute` to point to the appropriate binary user id attribute (ex. objectGuid for AD). This value will be stored in the yum database.
		* Modify `yum.ldap.principalAttribute`to point to the appropriate user name attribute (ex. sAMAccountName for AD).
		
* Run the SQL file `Yum/install.sql` into your mysql database.

## Build

* `npm install -g @angular/cli`


#### Front-end and Back-end on separate servers (for coding, debug...)

* configure the client-side by editing the file `yumfe/src/environments/environment.ts` and modifying the line:

` base_path: 'http://localhost:8080/api'` ( replace `localhost:8080` with the hostname and port of your backend server )

* in the folder `yumfe` run the command

`npm install`

* and then

`ng serve` if you want to run the front-end on a separate server than the backend.

* Start your back-end (In netbeans just run the project).

#### Front-end and Back-end on same server ( for deploy )


* in the `yumfe` folder, run `ng build --prod`

* copy the whole content of the subfolder `dist` inside the folder `Yum/src/main/resources/static` so that the `index.html` and all other files now reside in the static folder.

* If you want to change the secret for the JWT token, you can do so in the file `Yum/src/main/java/com/jrtechnologies/JWTCodec.java` by changing the `key` string.

*	##### Build using Netbeans:

	* Open the folder `Yum` in netbeans.

	* Build the project.  


	##### Build in a console / command line: 

	* Navigate to the folder Yum and run: 
    `mvnw clean install`  

* You should now have a file called `target/yum-1.0.4.jar` that you can move to your installation folder along with the application-prod.properties file.

* in a console / command line, run the command:
`java -jar yum-1.0.4.jar`

## Use

* Access your server at the hostname you specified (by example: http://localhost/)

* Login as `admin@yum.com` with password `123456`

* You can change your email address, first name, last name and password from the GUI (click on your name on the top right corner of the screen).

* You are ready to use the Yum application!
