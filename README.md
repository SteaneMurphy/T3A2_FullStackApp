# ${\textsf{\color{lightgreen}TRAVELMATE APP}}$

![image](./docs/Banner.jpg)

[Link To GitHub Repository](https://github.com/SteaneMurphy/T3A2_FullStackApp)

Clone (HTTPS): <https://github.com/SteaneMurphy/T3A2_FullStackApp.git>

## ${\textsf{\color{lightgreen}PROJECT DESCRIPTION}}$

### ${\textsf{\color{lightblue}PURPOSE}}$

TravelMate Itinerary Builder is designed to assist TravelMate, a boutique travel agency, in overcoming challenges related to efficiently managing personalised travel itineraries for their clients. According to a study by American Express Travel (2024), 85% of travellers plan to book a personalised travel experience in 2024, reflecting a growing desire for unique and tailor-made itineraries. However, 67% of small to medium-sized travel agencies struggle with operational inefficiencies due to the manual handling of these itineraries, often resulting in errors and reduced client satisfaction (Skift Research, 2023).

TravelMate faced the difficulty of tracking and managing client needs alongside their increasing workload. The Global Business Travel Association (2023) reported that 75% of travel agencies have seen a 50% increase in client expectations for personalised service, significantly increasing the workload on travel agents. This manual process often led to delays and inconsistencies in service delivery.

The TravelMate Itinerary Builder addresses these issues by providing a streamlined, automated solution that simplifies the process of creating and managing travel itineraries. Automation in travel management, as identified by McKinsey & Company (2023), can reduce operational workload by up to 30%, allowing travel agencies to focus more on enhancing client experiences.

### ${\textsf{\color{lightblue}FEATURES}}$

- **Home Page**: Includes login inputs for user authentication.
- **Registration Page**: A dedicated page with multiple inputs for new users to register.
- **Dashboard**: Displays existing itineraries for the user.
- **Create New Itinerary Page**: Allows users to create new travel itineraries.
- **View Single Itinerary Page**: Enables users to view details of a single itinerary.

### ${\textsf{\color{lightblue}TARGET AUDIENCE}}$

- **Travel Agents**: Professionals who need a tool to create and manage travel itineraries for clients quickly and efficiently.
- **Frequent Travellers**: Individuals who frequently plan trips and want an organised way to manage their itineraries.
- **Travel Enthusiasts**: Anyone interested in exploring new destinations and needing a tool to plan their travels effectively.

### ${\textsf{\color{lightblue}TECH STACK}}$

- **Front-End**: React.js (for future implementation)
- **Back-End**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Environment Management**: dotenv
- **Testing**: Jest, Supertest
- **Version Control**: Git

## ${\textsf{\color{lightgreen}DIAGRAMS}}$

### ${\textsf{\color{lightblue}DATAFLOW DIAGRAM}}$

![image](./docs/Dataflow_Diagram.png)

- **User Interaction:** The user interacts with the system through a Browser.
- **Login/Registration Process:**
  - Handles the user's credentials.
  - Interacts with the Authentication Service (JWT) to validate and generate tokens.
- **Itinerary Management Process:**
  - Handles requests related to itineraries.
  - Interacts with the User Data Store and Itinerary Data Store for saving and retrieving data.
- **Data Flows:**
  - Shows how information like login credentials, authentication tokens, and itinerary details move between these components.

### ${\textsf{\color{lightblue}APPLICATION ARCHITECTURE DIAGRAM}}$

![image](./docs/App_Architecture.png)

- **Admin User and Normal User:** Represent the different user roles interacting with the system.

- **Admin Visual Interface and User Visual Interface:** The respective interfaces that admins and normal users interact with.

- **Web Server:** Centralises the handling of requests from both admin and normal users, routing them through the back-end.

- **Back-End (Node.js + Express):** Manages business logic and processes requests.

- **Database (MongoDB):** Stores all application data.

- **Authentication Service (JWT):** Manages user authentication and session handling.

## ${\textsf{\color{lightgreen}USER STORIES}}$

**Account Creation and Management**
A frequent traveler who likes to keep their plans organised wants to create an account so they can securely store and access their travel itineraries across different devices. Initially, the focus was on simply creating an account, but the revised version emphasizes the need for secure access to itineraries on multiple devices.

**Itinerary Creation**
A busy professional with limited time for travel planning wants to quickly create a new itinerary by entering key destinations and dates, allowing them to efficiently organize their trip without missing important details. Initially, the idea was centered around simple itinerary creation, but the revision now emphasizes efficiency and the importance of capturing key travel details without hassle.

**Itinerary Editing**
A spontaneous traveler who often changes plans wants to easily edit their existing itinerary to update their travel plans on the go as new opportunities arise. Initially, the story was about basic editing, but the revision now focuses on the need for flexibility and the ability to adapt plans as new opportunities emerge.

**Data Security**
A privacy-conscious traveler wants their personal information and itineraries to be securely stored and encrypted so they can trust the app with sensitive travel details and feel safe using it. Initially, the focus was on basic security, but the refined story now highlights the importance of encryption and trust, particularly for users concerned about privacy.

**User Interface & Experience**
A user who values simplicity and aesthetics wants the app to have a clean and intuitive user interface so they can navigate it easily and enjoy using it to plan their trips. Initially, the focus was on functionality, but the revision now emphasizes the aesthetic and user-friendly aspects of the interface, aligning with the persona’s values.

## ${\textsf{\color{lightgreen}WIREFRAMES}}$

### ${\textsf{\color{lightblue}DESKTOP (FROM 1024PX)}}$

##### ${\textsf{\color{pink}LOGIN}}$

![image](./docs/Wireframes/Desktop/Login.png)

##### ${\textsf{\color{pink}REGISTER ACCOUNT}}$

![image](./docs/Wireframes/Desktop/Register.png)

##### ${\textsf{\color{pink}ALL ITINERARIES}}$

![image](./docs/Wireframes/Desktop/All%20Itineraries.png)

##### ${\textsf{\color{pink}CREATE ITINERARY}}$

![image](./docs/Wireframes/Desktop/Itinerary%20Create.png)

##### ${\textsf{\color{pink}VIEW ITINERARY (SINGLE)}}$

![image](./docs/Wireframes/Desktop/Itinerary%20View%20(Single).png)

### ${\textsf{\color{lightblue}TABLET (FROM 769PX)}}$

##### ${\textsf{\color{pink}LOGIN}}$

![image](./docs/Wireframes/Tablet/Login%20(Tablet).png)

##### ${\textsf{\color{pink}REGISTER ACCOUNT}}$

![image](./docs/Wireframes/Tablet/Register%20(Tablet).png)

##### ${\textsf{\color{pink}ALL ITINERARIES}}$

![image](./docs/Wireframes/Tablet/All%20Itineraries%20(Tablet).png)

##### ${\textsf{\color{pink}CREATE ITINERARY}}$

![image](./docs/Wireframes/Tablet/Itinerary%20Create%20(Tablet).png)

##### ${\textsf{\color{pink}VIEW ITINERARY (SINGLE)}}$

![image](./docs/Wireframes/Tablet/Itinerary%20View%20(Single)%20(Tablet).png)

### ${\textsf{\color{lightblue}MOBILE (UPTO 768PX)}}$

##### ${\textsf{\color{pink}LOGIN}}$

![image](./docs/Wireframes/Mobile/Login%20(Mobile).png)

##### ${\textsf{\color{pink}REGISTER ACCOUNT}}$

![image](./docs/Wireframes/Mobile/Register%20(Mobile).png)

##### ${\textsf{\color{pink}ALL ITINERARIES}}$

![image](./docs/Wireframes/Mobile/All%20Itineraries%20(Mobile).png)

##### ${\textsf{\color{pink}CREATE ITINERARY}}$

![image](./docs/Wireframes/Mobile/Itinerary%20Create%20(Mobile).png)

##### ${\textsf{\color{pink}VIEW ITINERARY (SINGLE)}}$

![image](./docs/Wireframes/Mobile/Itinerary%20View%20(Single)%20(Mobile).png)

## ${\textsf{\color{lightgreen}PROJECT MANAGEMENT}}$

## ${\textsf{\color{lightgreen}REFERENCES}}$

- **American Express Travel, 2024.** *2024 Global Travel Trends Report.* American Express.
- **Skift Research, 2023.** *The State of the Travel Agency Sector 2023.* Skift.
- **Global Business Travel Association (GBTA), 2023.** *2023 Business Travel Outlook.* GBTA.
- **McKinsey & Company, 2023.** *The Future of Travel: Technology and Automation.* McKinsey & Company.
