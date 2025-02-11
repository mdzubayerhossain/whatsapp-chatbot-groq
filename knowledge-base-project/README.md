# Knowledge Base Project

This project is a knowledge base application that serves user queries by reading from a text file. It is built using TypeScript and follows a modular architecture with separate files for services, controllers, and data.

## Project Structure

```
knowledge-base-project
├── src
│   ├── app.ts                # Entry point of the application
│   ├── services              # Contains service classes
│   │   └── knowledge-base.service.ts
│   ├── controllers           # Contains controller classes
│   │   └── knowledge-base.controller.ts
│   ├── data                 # Data source for the knowledge base
│   │   └── knowledge-base.txt
│   └── types                # Type definitions
│       └── index.ts
├── package.json              # npm configuration file
├── tsconfig.json             # TypeScript configuration file
└── README.md                 # Project documentation
```

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd knowledge-base-project
   ```

2. **Install Dependencies**
   Make sure you have Node.js installed. Then run:
   ```bash
   npm install
   ```

3. **Run the Application**
   To start the application, use:
   ```bash
   npm start
   ```

## Usage Guidelines

- The application reads from `src/data/knowledge-base.txt` to respond to user queries.
- You can define your queries in the appropriate format and send them to the endpoints defined in `knowledge-base.controller.ts`.
- The service logic for processing queries is handled in `knowledge-base.service.ts`.

## Contributing

Feel free to submit issues or pull requests if you have suggestions or improvements for the project.