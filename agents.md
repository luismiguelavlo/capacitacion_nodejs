# AGENTS.md - Development Guidelines

This document outlines the development practices, architecture patterns, and coding standards for this Node.js/TypeScript project.

## 🏗️ Architecture Overview

This project follows a **Layered Architecture** pattern with clear separation of concerns:

```
┌─────────────────────────────────────────┐
│           Presentation Layer            │
│  (Controllers, Routes, HTTP Handling)   │
├─────────────────────────────────────────┤
│            Domain Layer                 │
│    (Interfaces, Errors, Business)       │
├─────────────────────────────────────────┤Ñ
│             Data Layer                  │
│    (Models, Database, Repositories)     │
├─────────────────────────────────────────┤
│          Configuration Layer            │
│   (Environment, Constants, Utils)       │
└─────────────────────────────────────────┘
```

## 📁 Project Structure

```
src/
├── app.ts                    # Application entry point
├── config/                   # Configuration management
│   ├── constants.ts         # Application constants
│   ├── envs.ts              # Environment variables
│   └── generate-uuid.ts     # Utility functions
├── data/                    # Data access layer
│   ├── postgres/           # PostgreSQL implementation
│   │   ├── models/         # Sequelize models
│   │   └── postgres-database.ts
│   └── mssql/              # MSSQL implementation
├── domain/                  # Domain layer
│   ├── errors/             # Custom error classes
│   └── interfaces/         # Domain interfaces
└── presentation/           # Presentation layer
    ├── common/             # Shared utilities
    ├── routes.ts           # Main routes
    ├── server.ts           # Server configuration
    └── users/              # User feature module
        ├── controller.ts   # HTTP controllers
        ├── routes.ts       # Feature routes
        └── services/       # Business logic services
```

## 🎯 SOLID Principles Implementation

### 1. Single Responsibility Principle (SRP)

- **Controllers**: Handle only HTTP concerns
- **Services**: Handle only business logic
- **Models**: Represent only data structure
- **Validators**: Handle only validation logic
- **Password Hashers**: Handle only password operations

### 2. Open/Closed Principle (OCP)

- Services are open for extension through interfaces
- New implementations can be added without modifying existing code
- Error handling can be extended with new error types

### 3. Liskov Substitution Principle (LSP)

- Services implementing the same interface are interchangeable
- Database implementations can be substituted
- Derived classes can replace base classes without breaking functionality

### 4. Interface Segregation Principle (ISP)

- Create focused interfaces like `UserCreatorInterface`, `UserFinderInterface`
- Avoid fat interfaces that force clients to depend on unused methods
- Separate read/write operations in database interfaces

### 5. Dependency Inversion Principle (DIP)

- Depend on interfaces, not concrete implementations
- Use constructor injection for all dependencies
- Create abstractions for database, configuration, and error handling

## 🔧 Development Practices

### TypeScript Standards

- **CRITICAL**: Never use `any` type - always define proper interfaces
- Use strict TypeScript configuration
- Define interfaces before implementations
- Use proper type annotations for all parameters and return types

### Code Organization

- Group related functionality in feature-based directories
- Use consistent naming: `*.controller.ts`, `*.service.ts`, `*.model.ts`
- Keep routes, controllers, and services in the same feature directory
- Export main classes and interfaces from index files

### Error Handling

- Use centralized `CustomError` class for all business logic errors
- Use `handleError` function in controllers for consistent error responses
- Define domain-specific errors with appropriate HTTP status codes
- Never handle HTTP responses in services

### Database Patterns

- Use Sequelize decorators for model definitions
- Keep database-specific logic isolated
- Models should map to database tables with proper relationships
- Use proper TypeScript types, avoid `any` type

### Configuration Management

- Centralize all environment variables in `src/config/envs.ts`
- Use `env-var` package for type-safe environment variable parsing
- Define constants in `src/config/constants.ts`
- Never use `process.env` directly in application code

## 🛡️ Security Guidelines

### Password Security

- Always hash passwords using bcrypt with minimum 12 salt rounds
- Never store plain text passwords
- Implement proper password validation (complexity requirements)
- Use dedicated password hashing services

### Input Validation

- Validate all input parameters in controllers
- Use dedicated validation services
- Sanitize user inputs (trim, normalize)
- Return appropriate HTTP status codes for validation errors

### Error Handling

- Don't expose sensitive information in error messages
- Use generic error messages for internal server errors
- Log detailed errors server-side for debugging

## 📝 Coding Standards

### Naming Conventions

- **Classes**: PascalCase (`UserController`, `CreatorUserService`)
- **Methods**: camelCase (`execute`, `validateUser`)
- **Variables**: camelCase (`userData`, `validationResult`)
- **Constants**: UPPER_SNAKE_CASE (`SYNCHRONIZE_FORCE`)
- **Interfaces**: PascalCase with `Interface` suffix (`UserValidatorInterface`)

### File Naming

- **Controllers**: `*.controller.ts`
- **Services**: `*.service.ts`
- **Models**: `*.model.ts`
- **Routes**: `*.routes.ts`
- **Interfaces**: `*.interface.ts`
- **Errors**: `*.error.ts`

### Import Organization

1. Node.js built-in modules
2. External libraries
3. Internal modules (relative imports)

```typescript
// Node.js modules
import { Request, Response } from "express";

// External libraries
import bcrypt from "bcrypt";

// Internal modules
import { User } from "../../../data";
import { CustomError } from "../../domain/errors/custom.error";
```

## 🧪 Testing Guidelines

### Unit Testing

- Test each service in isolation
- Mock all dependencies using interfaces
- Test both success and error scenarios
- Use descriptive test names

### Integration Testing

- Test complete user flows
- Use test database for integration tests
- Test API endpoints with real HTTP requests
- Verify database operations

### Test Structure

```typescript
describe("CreatorUserService", () => {
  let service: CreatorUserService;
  let mockValidator: jest.Mocked<UserValidatorInterface>;
  let mockPasswordHasher: jest.Mocked<PasswordHasherInterface>;

  beforeEach(() => {
    // Setup mocks and service
  });

  describe("execute", () => {
    it("should create user successfully with valid data", async () => {
      // Test implementation
    });

    it("should throw validation error for invalid data", async () => {
      // Test implementation
    });
  });
});
```

## 🚀 API Development

### RESTful Endpoints

- Use proper HTTP methods (GET, POST, PUT, DELETE)
- Use appropriate HTTP status codes
- Follow RESTful URL patterns
- Use consistent response formats

### Response Format

```typescript
// Success Response
{
  "status": "success",
  "message": "Operation completed successfully",
  "data": { ... }
}

// Error Response
{
  "status": "error",
  "message": "Error description"
}
```

### Request Validation

- Validate all required fields
- Use proper data types
- Implement business rule validation
- Return detailed validation errors

## 📊 Database Guidelines

### Model Definition

```typescript
@Table({ tableName: "user", timestamps: true })
export class User extends Model {
  @PrimaryKey
  @Default(() => generateUUID())
  @Column(DataType.UUID)
  id: string;

  @Column({ type: DataType.STRING(100), allowNull: false })
  name: string;
}
```

### Database Operations

- Use transactions for complex operations
- Implement proper error handling
- Use appropriate indexes for performance
- Follow naming conventions for tables and columns

## 🔄 Development Workflow

### Feature Development

1. Create interfaces in `domain/interfaces/`
2. Implement services in `presentation/[feature]/services/`
3. Create controllers in `presentation/[feature]/controller.ts`
4. Define routes in `presentation/[feature]/routes.ts`
5. Add tests for all components
6. Update documentation

### Code Review Checklist

- [ ] Follows SOLID principles
- [ ] Uses proper TypeScript types (no `any`)
- [ ] Implements proper error handling
- [ ] Has appropriate tests
- [ ] Follows naming conventions
- [ ] Uses dependency injection
- [ ] Validates all inputs
- [ ] Handles security concerns

## 🛠️ Tools and Dependencies

### Core Dependencies

- **Express**: Web framework
- **TypeScript**: Type safety
- **Sequelize**: ORM for PostgreSQL
- **bcrypt**: Password hashing
- **env-var**: Environment variable validation

### Development Dependencies

- **ts-node-dev**: Development server
- **rimraf**: File cleanup
- **@types/\***: TypeScript type definitions

## 📚 Best Practices Summary

1. **Type Safety**: Always use proper TypeScript types, never `any`
2. **Single Responsibility**: Each class should have one clear purpose
3. **Dependency Injection**: Use constructor injection for all dependencies
4. **Interface Segregation**: Create focused, specific interfaces
5. **Error Handling**: Use centralized error management
6. **Input Validation**: Validate all inputs with dedicated services
7. **Security**: Hash passwords, sanitize inputs, handle errors safely
8. **Testing**: Write comprehensive tests for all components
9. **Documentation**: Document interfaces and complex business logic
10. **Consistency**: Follow established patterns and conventions

## 🎯 Performance Considerations

- Use database indexes appropriately
- Implement pagination for large datasets
- Use connection pooling for database connections
- Cache frequently accessed data when appropriate
- Monitor and log performance metrics

## 🔍 Debugging and Monitoring

- Use structured logging
- Implement health check endpoints
- Monitor database performance
- Track application metrics
- Use proper error tracking

---

**Remember**: These guidelines ensure maintainable, scalable, and secure code. Always follow these practices when developing new features or modifying existing code.
