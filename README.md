# SRM Academia API

A robust TypeScript/JavaScript client for interacting with the SRMIST KTR Academia portal. This package provides easy-to-use functions to fetch student data including timetables, attendance, marks, user information, and course details.

## Features

- 🔐 **Authentication**: Secure user verification and password validation
- 📅 **Timetable**: Fetch and parse student timetables
- 📊 **Attendance**: Retrieve attendance records
- 📈 **Marks**: Get academic performance data
- 👤 **User Info**: Access student profile information
- 📚 **Course Details**: Fetch course information
- 🗓️ **Calendar**: Get academic calendar data
- 🛡️ **TypeScript Support**: Full TypeScript definitions included
- ⚡ **Modern ES Modules**: Built with modern JavaScript standards

## Installation

```bash
npm install srm-academia-api
```

## Quick Start

```typescript
import {
  verifyUser,
  verifyPassword,
  getTimetable,
  getAttendance,
  getMarks,
  getUserInfo,
  getCalendar,
  getCourse,
} from "srm-academia-api";

// Example usage
async function example() {
  // Verify user credentials
  const userVerification = await verifyUser("your-username");

  // Verify password
  const passwordVerification = await verifyPassword({
    identifier: "identifier",
    digest: "digest",
    password: "password",
  });

  // Get timetable (requires valid cookie)
  const timetable = await getTimetable("your-session-cookie");

  // Get attendance
  const attendance = await getAttendance("your-session-cookie");
}
```

## API Reference

### Authentication

#### `verifyUser(username: string)`

Verifies if a username exists in the SRM system.

**Parameters:**

- `username` (string): The username to verify

**Returns:** Promise with user verification result

#### `verifyPassword(input: PasswordInput)`

Validates user password with the provided credentials.

**Parameters:**

- `input` (PasswordInput): Object containing identifier, digest, and password

**Returns:** Promise with password validation result

### Data Fetching

All data fetching functions require a valid session cookie from the SRM Academia portal.

#### `getTimetable(cookie: string)`

Fetches and parses the student's timetable.

#### `getAttendance(cookie: string)`

Retrieves attendance records.

#### `getMarks(cookie: string)`

Fetches academic marks and grades.

#### `getUserInfo(cookie: string)`

Gets student profile information.

#### `getCalendar(cookie: string)`

Retrieves academic calendar data.

#### `getCourse(cookie: string)`

Fetches course details and information.

## Types

The package provides comprehensive TypeScript types organized by functionality:

### Authentication Types

```typescript
interface PasswordInput {
  identifier: string;
  digest: string;
  password: string;
}

interface UserResponse {
  lookup?: {
    identifier: string;
    digest: string;
  };
  status_code: number;
  message: string;
}

interface AuthResult {
  data?: {
    cookies?: string;
    statusCode: number;
    message?: string;
    captcha?: {
      required: boolean;
      digest: string | null;
    };
  };
  isAuthenticated?: boolean;
  error?: string;
  errorReason?: unknown;
}
```

### Response Types

All API functions return properly typed responses:

```typescript
// Timetable
interface TimetableResponse {
  timetable?: DaySchedule[];
  error?: string;
  status: number;
}

// Marks
interface MarksResponse {
  markList?: MarkDetail[];
  error?: string;
  status: number;
}

// Attendance
interface AttendanceResponse {
  attendance?: AttendanceDetail[];
  error?: string;
  status: number;
}

// And more...
```

### Importing Types

```typescript
// Import specific types
import { PasswordInput, UserResponse } from "srm-academia-api";

// Import all types
import type * as SRMTypes from "srm-academia-api";
```

For complete type documentation, see [TYPES.md](docs/TYPES.md).

## Error Handling

All functions return consistent error objects:

```typescript
// Success response
{
  // ... data
}

// Error response
{
  error: "Error message",
  status: "error-status"
}
```

## Development

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn

### Setup

```bash
git clone https://github.com/yourusername/srm-academia-api.git
cd srm-academia-api
npm install
```

### Build

```bash
npm run build
```

### Development Mode

```bash
npm run dev
```

### Type Checking

```bash
npm run type-check
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

This package is not officially affiliated with SRM Institute of Science and Technology. Use responsibly and in accordance with the institution's terms of service.

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/yourusername/srm-academia-api/issues) on GitHub.
