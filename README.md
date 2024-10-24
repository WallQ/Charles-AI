# INESC TEC - Institute for Systems and Computer Engineering, Technology and Science / Internship

## Getting Started

To get started with the app application on your local machine, follow these steps:

<sup>Taking in consideration Node.js v20+, PnPM and Docker is already installed.</sup>

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Install the required dependencies:

```bash
pnpm install
```

3. Set up the environment variables:

```bash
cp .env.example .env
```

4. Set up the database:

```bash
chmod +x ./start-database.sh
./start-database.sh
```

or

```bash
docker compose -f "docker-compose.yml" up -d --build
```

5. Push the schema directly into the database:

```bash
pnpm run db:push
```

6. Run the application:

```bash
pnpm run dev
```

7. (Optional) Other useful commands:

Interact with the database with a GUI tool

```bash
pnpm run db:studio
```

Generate migration based on your schema

```bash
pnpm run db:generate
```

Apply the migration stored in you migrations folder

```bash
pnpm run db:studio
```

The application should now be perfectly running locally on http://localhost:3000.
