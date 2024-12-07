# Backend Assignment Techlanz
A file upload service using **Express.Js**  that allows users to upload files,
 store them on the server, and save file metadata in a database

## Prerequisites

Before setting up the app, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (Recommended version: v14 or above)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [git](https://git-scm.com/) (Version control)

## Getting Started

Follow these steps to get the project up and running locally.

### 1. Clone the Repository

Start by cloning the repository to your local machine. Open a terminal and run:

```bash
git clone https://github.com/nidhish-srivastava/BackendAssignmentTechlanz.git
```


### 2. Navigate to the Project Directory
Go into the project directory:
```bash
cd BackendAssignmentTechlanz
```

### 3. Install Dependencies
Install all required dependencies using npm:
```bash
npm install
```

### 4. Set Up Environment Variables
Create a .env file in the root of the project directory.  Here's an example of what you need:
```bash
MONGO_DB_URI = ""
PORT = 
```

### 5. Start the Application
Once everything is set up, start the Express.js application locally:
```bash
npm run dev
```
By Default it is running on port 3000


## API Usage

### 1. **Upload a File**

- **Endpoint**: `POST /upload`
- **Description**: Upload a file to the server and store its metadata in the database.
- **Request Body**: 
  - Form-data (use Postman or a similar tool to send a file):
    - **file**: The file to be uploaded (supports JPEG, PNG, PDF)
- **Response**:
  - **200 OK**: File uploaded successfully with metadata.
  - **400 Bad Request**: No file uploaded or invalid file type.
  - **500 Internal Server Error**: If something goes wrong during the upload process.
  
- **Example**:
  ```bash
  POST /upload
  Form-data:
    file: <file>


### 2. **Download a File**

- **Endpoint**: `GET /download/:id`
- **Description**: Download a file from the server using its unique ID.
- **Request Parameters**:
  - **id**: The unique identifier of the file in the database.
- **Response**:
  - **200 OK**: File is downloaded successfully.
  - **404 Not Found**: File not found in the database or on the server.
- **Example**:
  ```bash
  GET /download/60d21bb3f542d5f7a97b8124

### 3. **Delete a File**

- **Endpoint**: `DELETE /delete/:id`
- **Description**: Delete a file from the server and its associated metadata from the database.
- **Request Parameters**:
  - **id**: The unique identifier of the file in the database.
- **Response**:
  - **200 OK**: File and metadata deleted successfully.
  - **404 Not Found**: File not found in the database or on the server.
  - **500 Internal Server Error**: If something goes wrong during the deletion process.
- **Example**:
  ```bash
  DELETE /delete/60d21bb3f542d5f7a97b8124


## Tech Stack

### Backend

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js**: A minimal and flexible Node.js web application framework.

### Database

- **MongoDB**: A NoSQL database for storing application data.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.

### Packages

- **express**: Fast, unopinionated, minimalist web framework for Node.js.
- **cors**: Enable Cross-Origin Resource Sharing (CORS) with various options.
- **nodemon**: A tool that helps develop Node.js-based applications by automatically restarting the node application when file changes are detected.
- **dotenv**: Loads environment variables from a `.env` file into `process.env`.
- **multer**: a middleware for handling multipart/form-data used for uploading files 