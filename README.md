# SWEET - An Open-Source Exam Preparation Tool 

## Overview

**SWEET** (SWE Education Tool) is an open-source exam preparation tool designed to help individuals practice and improve their skills by conducting various types of tests such as multiple-choice questions (MCQs), essays, coding problems, and take-home assignments. It's ideal for self-study, skill assessment, and targeted practice.

## Features (TODO - All of these 🥲)

- **Question Types Supported**:
  - MCQ (Multiple Choice Questions)
  - Essay Questions
  - Coding Problems (with built-in code editor and test case validation)
  - Take-Home Assignments (via ZIP uploads)
  - Short Answer Questions
- **Difficulty Levels**:
  - Easy, Medium, and Hard, tagged per question.
- **Question Management**:
  - Import questions via JSON files.
  - Tracks topics and progress.
- **Coding Test Execution**:
  - Integrated coding editor powered by Monaco Editor.
  - Docker support for running code safely and securely with test cases.
- **User Profiles**:
  - Create, save, and manage user profiles.
  - Track individual progress and results.

## Why SWEET? (When it gets here)

Whether you're preparing for coding interviews, learning new concepts, or conducting practice tests, SWEET provides a customizable, lightweight, and powerful tool to achieve your learning goals.

## Tech Stack

- **Frontend**: [React](https://reactjs.org/)
- **Backend**: Node.js (Electron)
- **Code Execution**: Docker for sandboxing
- **Storage**: SQLite for local database management
- **UI Editor**: Monaco Editor for coding problems

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AnupamaCodippily/SWEET.git
   cd SWEET
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the app in development mode:

   ```bash
   npm start
   ```

4. Package the app for distribution:

   ```bash
   npm run package
   ```

### Usage

1. Open the app and create a user profile.
2. Import question sets via JSON files.
3. Select a test type (e.g., MCQ, Essay, Coding Problem).
4. For coding tests, write and test code using the built-in editor.
5. View results and track progress.

### JSON File Format

Here is an example JSON file for importing MCQs:

```json
[
  {
    "topics": ["Java", "Streams API"],
    "statement": "What does the 'reduce' operation in Java Streams do?",
    "options": [
      "Combines all elements of the stream into a single result",
      "Filters elements of the stream",
      "Transforms each element into another type",
      "Splits the stream into multiple smaller streams"
    ],
    "answer": [0],
    "difficulty": 2
  }
]
```

## Contributing

We welcome contributions from the community to enhance SWEET! Here's how you can help:

1. **Fork the repository**.
2. Create a new branch for your feature or bug fix:

   ```bash
   git checkout -b feature/my-awesome-feature
   ```

3. Commit your changes:

   ```bash
   git commit -m "Add my awesome feature"
   ```

4. Push your branch to GitHub:

   ```bash
   git push origin feature/my-awesome-feature
   ```

5. Submit a pull request.

For detailed guidelines, refer to our [CONTRIBUTING.md](CONTRIBUTING.md).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Roadmap

### Upcoming Features
- MVP stuff (basic functionality)
- Timer support for timed exams.
- Cloud-based question sharing and syncing.
- Support for additional coding languages.
- Advanced analytics and progress visualization.

## Contact

If you have questions or feedback, feel free to reach out:

- **GitHub Issues**: [https://github.com/AnupamaCodippily/SWEET/issues](https://github.com/yourusername/SWEET/issues)

---

