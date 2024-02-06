# ThoughtBridge
[![License Badge](https://img.shields.io/badge/license-MIT-green)](./LICENSE)

## Description
    
ThoughtBridge is a robust social networking backend application designed for a social media startup. Leveraging the capabilities of MongoDB, the API is tailored to handle large amounts of unstructured data, providing a flexible and scalable solution for managing users, thoughts, reactions, and friend connections within a social network platform.
    
## Table of Contents

- [ThoughtBridge](#thoughtbridge)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Usage](#usage)
  - [Credits](#credits)
  - [Questions](#questions)
  - [License](#license)

## Usage

To use ThoughtBridge, follow these steps:

Initialization:
Ensure that Node.js and MongoDB are installed on your system.
Clone the repository containing the API codebase to your local machine.

Installation:
Navigate to the root directory of the application in your terminal.
Run npm install to install the required dependencies.

Starting the Server:
Execute ```node index.js``` to start the server.
This will initiate the API and synchronize the Mongoose models with the MongoDB database.

Exploring the API:
Access the API routes using a tool like Insomnia, Postman, or any HTTP client.
Interact with the following API endpoints:
/api/users: Manage user profiles and friend lists.
/api/thoughts: Post thoughts, view, update, and delete thoughts.
/api/thoughts/:thoughtId/reactions: Add or remove reactions to specific thoughts.

Testing Endpoints:
Use GET, POST, PUT, and DELETE requests to test the functionality of each endpoint.
Verify that the responses are as expected and that data operations are successful.

Refer to the following walkthrough video for a visual demonstration of the API's features and usage.

[Video Walkthrough Link](https://drive.google.com/file/d/1MBfZi-9uBbnAfNQDacdEbJbSAH-Qmh3V/view)

## Credits

This project was created for educational purposes as part of the KU Coding Bootcamp curriculum.

The following resources were utilized:

- KU Coding Bootcamp Spot:
    - Provided project requirements and guidelines.
- W3Schools:
    - Reference for general documentation.
- MDN Web Docs:
    - Referenced for general documentation.
- Stack Overflow:
    - Referenced for general documentation.
- Node.js:
    - [Node.js Documentation](https://nodejs.org/docs/latest/api/)
- NPM:
    - [NPM](https://npmjs.com)
- Express.js:
    - [Express.js Documentation](https://expressjs.com/en/guide/routing.html)
- MongoDB:
    - [MongoDB Documentation](https://www.mongodb.com/docs/)
- Mongoose.js:
    - [Mongoose.js Documentation](https://mongoosejs.com/docs/)
- Insomnia:
    - [Insomnia Documentation](https://docs.insomnia.rest/insomnia/get-started)

## Questions

For any questions, feel free to email me ([joem3847@gmail.com](mailto:joem3847@gmail.com)) or visit my GitHub profile ([jmlouf](https://github.com/jmlouf/)).

## License

This project is available under the following license: MIT. For more information on rights and limitations, please review the [LICENSE](./LICENSE) file.