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

If you encounter any issues or have questions, please [open an issue](https://github.com/jackwaghan/srm-academia-api/issues) on GitHub.
