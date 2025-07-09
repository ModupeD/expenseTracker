# Expense Tracker Backend API

A RESTful API built with Spring Boot for tracking personal expenses with categorization and monthly filtering capabilities.

## 🚀 Features

- **Add Expenses**: Create new expense entries with amount, category, and date
- **List Expenses**: Retrieve all expenses or filter by specific month
- **Expense Summary**: Get spending totals grouped by category
- **Data Validation**: Built-in validation for amount, category, and date fields
- **In-Memory Database**: H2 database for quick setup and testing
- **CORS Support**: Configured for frontend integration

## 🛠️ Tech Stack

- **Java 17**
- **Spring Boot 3.2.5**
- **Spring Data JPA**
- **H2 Database** (in-memory)
- **Maven** for dependency management
- **Bean Validation** for input validation

## 📋 Prerequisites

- Java 17 or higher
- Maven 3.6+ (or use the included Maven wrapper)

## 🏃‍♂️ Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd expense-tracker
   ```

2. **Run the application**
   ```bash
   # Using Maven wrapper (recommended)
   ./mvnw spring-boot:run
   
   # Or using Maven directly
   mvn spring-boot:run
   ```

3. **Access the application**
   - API Base URL: `http://localhost:8080/api`
   - H2 Database Console: `http://localhost:8080/h2-console`
     - JDBC URL: `jdbc:h2:mem:expensetracker`
     - Username: `sa`
     - Password: (empty)

## 📊 API Endpoints

### 1. Add Expense
```http
POST /api/expenses
Content-Type: application/json

{
  "amount": 25.50,
  "category": "GROCERIES",
  "date": "2024-01-15"
}
```

**Response:**
```json
{
  "id": 1,
  "amount": 25.50,
  "category": "GROCERIES",
  "date": "2024-01-15"
}
```

### 2. List Expenses
```http
# Get all expenses
GET /api/expenses

# Get expenses for a specific month
GET /api/expenses?month=January
```

**Response:**
```json
[
  {
    "id": 1,
    "amount": 25.50,
    "category": "GROCERIES",
    "date": "2024-01-15"
  },
  {
    "id": 2,
    "amount": 120.00,
    "category": "UTILITIES",
    "date": "2024-01-20"
  }
]
```

### 3. Get Summary
```http
GET /api/summary
```

**Response:**
```json
[
  {
    "category": "GROCERIES",
    "total": 125.50
  },
  {
    "category": "UTILITIES",
    "total": 240.00
  }
]
```

## 🏷️ Expense Categories

The API supports the following predefined categories:

- `RENT` - Housing and rent expenses
- `GROCERIES` - Food and grocery shopping
- `UTILITIES` - Bills (electricity, water, internet, etc.)
- `ENTERTAINMENT` - Movies, games, subscriptions
- `TRAVEL` - Transportation and travel costs
- `HEALTH` - Medical and healthcare expenses
- `OTHER` - Miscellaneous expenses

## 🗂️ Project Structure

```
src/
├── main/
│   ├── java/com/example/expensetracker/
│   │   ├── controller/          # REST controllers
│   │   │   └── ExpenseController.java
│   │   ├── service/             # Business logic
│   │   │   └── ExpenseService.java
│   │   ├── repository/          # Data access layer
│   │   │   └── ExpenseRepository.java
│   │   ├── model/               # Entity classes
│   │   │   ├── Expense.java
│   │   │   └── Category.java
│   │   ├── dto/                 # Data transfer objects
│   │   │   ├── ExpenseRequest.java
│   │   │   ├── ExpenseResponse.java
│   │   │   └── SummaryItem.java
│   │   └── ExpenseTrackerApplication.java
│   └── resources/
│       └── application.yml      # Configuration
└── test/                        # Test files
```

## ⚙️ Configuration

The application uses the following default configuration (in `application.yml`):

```yaml
spring:
  datasource:
    url: jdbc:h2:mem:expensetracker;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE
    driverClassName: org.h2.Driver
    username: sa
    password:
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
  h2:
    console:
      enabled: true
```

## 🔧 Development

### Building the Project
```bash
./mvnw clean compile
```

### Running Tests
```bash
./mvnw test
```

### Creating JAR
```bash
./mvnw clean package
```

### Running the JAR
```bash
java -jar target/expense-tracker-0.0.1-SNAPSHOT.jar
```

## 🌐 CORS Configuration

The API is configured to accept requests from `http://localhost:4200` (Angular development server). To modify this for production or different frontend URLs, update the `@CrossOrigin` annotation in `ExpenseController.java`.

## 🚀 Deployment

### Option 1: JAR Deployment
1. Build the JAR: `./mvnw clean package`
2. Deploy the JAR file to your server
3. Run with: `java -jar expense-tracker-0.0.1-SNAPSHOT.jar`

### Option 2: Docker (Optional)
```dockerfile
FROM openjdk:17-jdk-slim
COPY target/expense-tracker-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

## 📝 API Validation

The API includes comprehensive input validation:

- **Amount**: Must be positive and not null
- **Category**: Must be one of the predefined categories
- **Date**: Must be in ISO date format (YYYY-MM-DD)

Invalid requests will return appropriate HTTP status codes with error messages.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Happy Expense Tracking! 💰** 