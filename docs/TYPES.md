# Type System Documentation

This document describes the comprehensive type system for the SRM Academia API package. All types are organized into separate files for better maintainability and type safety.

## 📁 Type Organization

The types are organized into the following structure:

```
src/Types/
├── index.ts          # Main export file
├── types.ts          # Legacy compatibility file
├── auth.ts           # Authentication types
├── timetable.ts      # Timetable types
├── marks.ts          # Marks and grades types
├── calendar.ts       # Calendar types
├── course.ts         # Course details types
├── attendance.ts     # Attendance types
├── user.ts           # User information types
└── common.ts         # Common utility types
```

## 🔐 Authentication Types (`auth.ts`)

### `PasswordInput`

Input parameters for password validation.

```typescript
interface PasswordInput {
  identifier: string;
  digest: string;
  password: string;
}
```

### `UserResponse`

Response from user verification.

```typescript
interface UserResponse {
  lookup?: {
    identifier: string;
    digest: string;
  };
  status_code: number;
  message: string;
}
```

### `PasswordResponse`

Response from password validation API.

```typescript
interface PasswordResponse {
  status_code: number;
  localized_message?: string;
  cdigest?: string;
}
```

### `AuthResult`

Result from authentication operations.

```typescript
interface AuthResult {
  data?: {
    cookies?: string;
    statusCode: number;
    message?: string;
    captcha?: {
      required: boolean;
      digest: string | null | undefined;
    };
  };
  isAuthenticated?: boolean;
  error?: string;
  errorReason?: unknown;
}
```

### `UserValidationResult`

Result from user validation operations.

```typescript
interface UserValidationResult {
  data?: UserResponse;
  error?: string;
  errorReason?: unknown;
}
```

## 📅 Timetable Types (`timetable.ts`)

### `SlotInfo`

Information about a course slot.

```typescript
interface SlotInfo {
  courseTitle: string;
  courseCode: string;
  courseType: string;
  courseCategory: string;
  courseRoomNo: string;
}
```

### `CourseSlot`

A slot in the timetable with course information.

```typescript
interface CourseSlot {
  slot: string;
  isClass: boolean;
  courseTitle?: string;
  courseCode?: string;
  courseType?: string;
  courseCategory?: string;
  courseRoomNo?: string;
  time: string;
}
```

### `DaySchedule`

Schedule for a single day.

```typescript
interface DaySchedule {
  dayOrder: string;
  class: CourseSlot[];
}
```

### `TimetableResponse`

Response from timetable parsing.

```typescript
interface TimetableResponse {
  timetable?: DaySchedule[];
  error?: string;
  status: number;
}
```

## 📊 Marks Types (`marks.ts`)

### `Mark`

Individual mark for an exam.

```typescript
interface Mark {
  exam: string;
  obtained: number;
  maxMark: number;
}
```

### `MarkDetail`

Detailed marks for a course.

```typescript
interface MarkDetail {
  course: string;
  category: string;
  marks: Mark[];
  total: { obtained: number; maxMark: number };
}
```

### `MarksResponse`

Response from marks parsing.

```typescript
interface MarksResponse {
  markList?: MarkDetail[];
  error?: string;
  status: number;
}
```

## 🗓️ Calendar Types (`calendar.ts`)

### `Day`

Information about a calendar day.

```typescript
interface Day {
  date: string;
  day: string;
  event: string;
  dayOrder: string;
}
```

### `Month`

Calendar month with days.

```typescript
interface Month {
  month: string;
  days: Day[];
}
```

### `CalendarResponse`

Response from calendar parsing.

```typescript
interface CalendarResponse {
  calendar?: Month[];
  error?: string;
  status: number;
}
```

## 📚 Course Types (`course.ts`)

### `CourseDetail`

Detailed information about a course.

```typescript
interface CourseDetail {
  courseCode: string;
  courseTitle: string;
  courseCredit: string;
  courseCategory: string;
  courseType: string;
  courseFaculty: string;
  courseSlot: string[];
  courseRoomNo: string;
}
```

### `CourseResponse`

Response from course details parsing.

```typescript
interface CourseResponse {
  courseList?: CourseDetail[];
  batch?: string;
  error?: string;
  status: number;
}
```

## 📈 Attendance Types (`attendance.ts`)

### `AttendanceDetail`

Attendance information for a course.

```typescript
interface AttendanceDetail {
  courseCode: string;
  courseTitle: string;
  courseCategory: string;
  courseFaculty: string;
  courseSlot: string;
  courseConducted: number;
  courseAbsent: number;
  courseAttendance: string;
}
```

### `AttendanceResponse`

Response from attendance parsing.

```typescript
interface AttendanceResponse {
  attendance?: AttendanceDetail[];
  error?: string;
  status: number;
}
```

## 👤 User Types (`user.ts`)

### `UserInfo`

User profile information.

```typescript
interface UserInfo {
  regNumber: string;
  name: string;
  mobile: string;
  section: string;
  program: string;
  department: string;
  semester: string;
  batch: string;
}
```

### `UserInfoResponse`

Response from user info parsing.

```typescript
interface UserInfoResponse {
  userInfo?: UserInfo;
  error?: string;
  status: number;
}
```

## 🔧 Common Types (`common.ts`)

### `ApiResponse<T>`

Generic API response wrapper.

```typescript
interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  status: number;
}
```

### `ErrorResponse`

Standard error response.

```typescript
interface ErrorResponse {
  error: string;
  status: number;
}
```

### `SuccessResponse<T>`

Standard success response.

```typescript
interface SuccessResponse<T> {
  data: T;
  status: number;
}
```

### `HttpResponse<T>`

HTTP response wrapper.

```typescript
interface HttpResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}
```

### `Result<T, E>`

Generic result type for operations that can succeed or fail.

```typescript
type Result<T, E = string> =
  | { success: true; data: T }
  | { success: false; error: E };
```

### Utility Types

- `NonNullable<T>`: Removes null and undefined from a type
- `DeepPartial<T>`: Makes all properties optional recursively

## 📦 Usage Examples

### Importing Types

```typescript
// Import specific types
import { PasswordInput, UserResponse } from "srm-academia-api";

// Import all types
import type * as SRMTypes from "srm-academia-api";

// Using types in your code
const passwordInput: PasswordInput = {
  identifier: "user123",
  digest: "abc123",
  password: "password123",
};

const userInfo: SRMTypes.UserInfo = {
  regNumber: "RA123456",
  name: "John Doe",
  mobile: "1234567890",
  section: "A",
  program: "B.Tech",
  department: "Computer Science",
  semester: "6",
  batch: "2021",
};
```

### Type-Safe Function Usage

```typescript
import { verifyUser, getTimetable, getMarks } from "srm-academia-api";

// All functions now have proper return types
const userResult = await verifyUser("username");
// userResult is typed as UserValidationResult

const timetableResult = await getTimetable("cookie");
// timetableResult is typed as TimetableResponse

const marksResult = await getMarks("cookie");
// marksResult is typed as MarksResponse
```

## 🔄 Migration from Old Types

The old `types.ts` file has been updated to re-export from the new organized structure, so existing code should continue to work without changes. However, it's recommended to update imports to use the new organized structure:

```typescript
// Old way (still works)
import { PasswordInput } from "./Types/types";

// New way (recommended)
import { PasswordInput } from "./Types/auth";
// or
import { PasswordInput } from "./Types";
```

## ✨ Benefits of the New Type System

1. **Better Organization**: Types are grouped by domain/functionality
2. **Improved Maintainability**: Easier to find and update related types
3. **Enhanced Type Safety**: All functions have proper return types
4. **Better Developer Experience**: IntelliSense and autocomplete work better
5. **Modularity**: Types can be imported individually or as groups
6. **Backward Compatibility**: Old imports still work
7. **Comprehensive Coverage**: All data structures are properly typed

## 🚀 Future Enhancements

The type system is designed to be extensible. Future enhancements could include:

- Generic response wrappers for consistent error handling
- Zod schemas for runtime validation
- More specific error types for different failure scenarios
- Union types for different response states
- Branded types for better type safety
