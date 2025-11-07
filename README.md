# Law Q&A - Angular Frontend

## Overview

An Angular application that provides an interactive interface for asking questions about legal documents. The application communicates with a Spring Boot backend that uses Google's Gemini AI to generate answers.

## Features

- Clean and modern UI with gradient design
- Real-time question answering
- Loading state indicators
- Responsive textarea and input fields
- Smooth animations and transitions
- Error handling

## Technologies

- Angular 18+
- TypeScript
- RxJS
- Angular Signals
- FormsModule
- HttpClient

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   └── law-qa/
│   │       ├── law-qa.ts
│   │       ├── law-qa.html
│   │       └── law-qa.css
│   └── services/
│       └── backendApiService/
│           └── backend-api-calls.ts
```

## Setup

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI

### Installation

```bash

npm install -g @angular/cli

git clone <repository-url>

cd law-qa-frontend


npm install


ng serve
```

The application will be available at `http://localhost:4200`

## Components

### LawQa Component

The main component that handles the Q&A interface.

#### Signals

| Signal   | Type    | Description                   |
| -------- | ------- | ----------------------------- |
| lawtext  | string  | The legal document text       |
| question | string  | User's question about the law |
| answer   | string  | AI-generated answer           |
| loading  | boolean | Loading state indicator       |

#### Methods

- `submit()`: Sends the law text and question to the backend API

## Services

### BackendApiCalls Service

Handles HTTP communication with the Spring Boot backend.

#### Configuration

```typescript
private apiUrl = 'http://localhost:8080/api/law/ask';
```

#### Methods

- `askQuestion(lawtext: string, question: string): Observable<any>`: Sends POST request to backend

## Styling

### Design Features

- **Gradient Background**: Purple gradient (667eea → 764ba2)
- **Button Gradient**: Pink gradient (f093fb → f5576c)
- **Loading State**: Orange gradient (ffecd2 → fcb69f)
- **Animations**:
  - Fade-in effect for answer and loading
  - Spinner animation for loading state
  - Hover effects on buttons and inputs
  - Ripple effect on button click

### CSS Classes

| Class     | Purpose                                 |
| --------- | --------------------------------------- |
| .Qa       | Main container with gradient background |
| .question | Styled input field for questions        |
| .loading  | Loading indicator with spinner          |
| .answer   | Answer display container                |

## Usage

### Basic Workflow

1. Paste legal document text in the textarea
2. Enter your question in the input field
3. Click "Get Answer" button
4. Wait for AI-generated response
5. View the answer in the styled container

### Example

```
Law Text:
"Article 1: All citizens have the right to free speech and expression."

Question:
"What rights do citizens have according to Article 1?"

Answer:
"According to Article 1, citizens have the right to free speech and expression."
```

## API Integration

### Request Format

```typescript
{
  lawtext: string,
  question: string
}
```

### Response Format

```typescript
{
  answer: string;
}
```

### Error Handling

The application handles errors gracefully and displays:

```
"An error occurred while fetching the answer."
```

## Development

### Running in Development Mode

```bash
ng serve
```
