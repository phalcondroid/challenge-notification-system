# 🎮 Real-Time Notification System for a Gaming Platform

This repository implements a **real-time, event-driven notification system** for a multiplayer gaming platform. Built with **Clean Architecture**, it ensures clear separation of concerns, scalability, testability, and maintainability.

---

## ⚖️ Architectural Overview: Clean Architecture + Microservices Support

```
   +------------------------+
   |        Clients         |
   +-----------+------------+
  |
       (HTTP/Event/Input)
  v
   +-----------+------------+
   |     Adapters/Ports     |  ← Kafka, RabbitMQ, Google, Apple
   +-----------+------------+
  |
   +-----------+------------+
   |     Application        |
   |     (Use Cases)        |
   +-----------+------------+
  |
   +-----------+------------+
   |     Domain Models      |
   +-----------+------------+
  |
   +-----------+------------+
   |    Infrastructure      |
   +------------------------+
```

---

## 📂 Project Structure (Microservices Ready)

```
/src
  /achievements
    /domain
      - useCases/
      - entities/
      - rules/
      - enums/
    /infra
      - repositories/
      - adapters/
      - clients/
      - controllers/

  /events
    /domain
    /infra

  /notifications
    /domain
    /infra

  /translations
    /domain
    /infra

  /users
    /domain
    /infra

  /store
    /domain
    /infra

/shared (abstract contracts)
  - interfaces/
  - contracts/
  - enums/
  - errors/
```

---

## 📊 Components Overview

Each component is implemented as a **domain module** with its own use cases, events, and endpoints.

### 1. Achievements

**Responsibilities**: Manage user achievements and rewards.

* **Domain**: Unlock achievements, define reward logic.
* **Infra**: Persistence, REST API controller.
* **Endpoints**:

  * `POST /achievements/unlock`
  * `GET /achievements/:userId`
* **Events**:

  * `AchievementUnlocked`
  * `RewardGranted`

---

### 2. Events

**Responsibilities**: Handle and dispatch game events through HTTP or external event systems.

* **Domain**: Abstract event types, event dispatching logic.
* **Infra**: Adapter for event providers (Kafka, RabbitMQ).
* **Endpoints**:

  * `POST /events/leveledUp`
  * `POST /events/itemAcquired`

* **Events**:

  * levelUp,
  * llevelDown,
  * lfindingMatch,
  * lmatched,
  * llostMatch,
  * lwinMatch,
  * ldrawMatch,
  * lpassTurorial
---

### 3. Translations

**Responsibilities**: Localize all messages to user-specific languages by region.

* **Domain**: Translation logic per key/locale.
* **Infra**: Integration with i18n or DB/locales.
* **Endpoints**:

  * `GET /translations/:locale/:key`

---

### 4. Notifications

**Responsibilities**: Send user notifications across channels and platforms.

* **Domain**: Notification creation rules, formatting.
* **Infra**: Channels via adapter pattern: toast, email, push.
* **Events Notification global**:

  * `NotificationStatus` sent, failed
  * `NotificationType` local, ingame, email, push, sms

* **Events Notification providers**:
  * malchimb,
  * firebase,
  * AwsSns,
  * twilio,
  * pusher

---

### 5. Users

**Responsibilities**: Manage user data, preferences, social events, sessions, and user registration, check if user is online, progression.

* **Domain**: Entities, friend logic, preferences.
* **Infra**: DB adapter, auth/session service.
* **Endpoints**:

  * `POST /users` save new user
  * `POST /auth/login`
  * `POST /auth/logout`
  * `POST /users/preferences/:id` change user preferences

* **Social Events**:

  * friendRequest,
  * friendRequestAccepted,
  * friendRequestRejected,
  * newFollower,
  * online,
  * offline

---

### 6. Store

**Responsibilities**: Manage item purchases and receipt validation.

* **Domain**: Receipt validation rules, purchases store saving, find, logic.

* **Infra**: Clients via Adapter Pattern for:

  * Google Play
  * Apple Store
  * GamePass

* **Endpoints**:

  * `POST /store/purchase` buy items
  * `POST /store/validate` validate receipt of purchase

* **Events**
  * itemAcquired = "ST_1",
  * purchaseComplete = "ST_2",
  * purchaseFailed = "ST_3",
  * waiting = "ST_4",
  * validating = "ST_5",
  * validationFailed = "ST_6"


## 🔄 Events System

* **Adapter pattern** used for pluggable event systems:

  * Kafka
  * RabbitMQ
  * In-memory (for testing/dev)

---

## ⚡ Performance Optimization

### Redis Caching

* **Use Cases**:

  * Caching translations
  * Caching preferences
  * Throttling notifications

### Adapter Support

* Abstract Redis client via interface to support:

  * Redis
  * Memcached
  * Custom in-memory store

---

## 🔧 Testing Strategy

### Tooling

* [Jest](https://jestjs.io/) for unit and integration testing.

### Scope

* Domain entities and use cases
* Event propagation logic
* Mocked adapters and client behavior

### Example Structure

```
/src
  /notifications
    /domain/useCases
      - sendNotificationUseCase.test.ts
  /store
    /domain/useCases
      - validateReceiptUseCase.test.ts
```
### Patterns Used for testing

* **AAA (Arrange-Act-Assert)**
* **GWT (Given-When-Then)**

---

## 🚀 Running the Project

```bash
# Install dependencies
npm install

# Run the simulation
npm start

# Run tests
npm test
```

---

## 👤 Author

Made with ❤️ by Julian Arturo Molina Castiblanco
email jmolinac5116@gmail.com
