# Homeschool CLI

A command-line interface for managing homeschool scripts and tools, built with Bluebun and Bun.

## Installation

This project uses Bun as the JavaScript runtime. Make sure you have Bun installed:

```bash
curl -fsSL https://bun.sh/install | bash
```

## Setup

1. Install dependencies:
```bash
bun install
```

2. Link the CLI globally:
```bash
bun link
```

## Usage

The CLI provides several commands to manage your homeschool scripts:

### Available Commands

- `homeschool` - Show welcome message (default command)
- `homeschool help` - Show help information
- `homeschool list` - List available scripts
- `homeschool hello` - Say hello
- `homeschool convert` - Run the convert_words script

### Examples

```bash
# Show help
homeschool help

# List available scripts
homeschool list

# Run the convert_words script
homeschool convert

# Say hello
homeschool hello
```

## Adding New Commands

To add a new command, create a new TypeScript file in the `cli/commands/` directory:

```typescript
import type { Command } from "bluebun"

const command: Command = {
  name: "your-command",
  description: "Description of your command",
  run: async (props) => {
    // Your command logic here
    console.log("Your command executed!")
  },
}

export default command
```

The command will automatically be available as `homeschool your-command`.

## Project Structure

```
homeschool/
├── cli/
│   ├── commands/          # Command files
│   │   ├── hello.ts
│   │   ├── list.ts
│   │   ├── convert.ts
│   │   ├── help.ts
│   │   └── homeschool.ts  # Default command
│   └── index.ts           # CLI entry point
├── convert_words.ts       # Example script
├── package.json
└── README.md
```

## Development

The CLI is built using [Bluebun](https://github.com/jamonholmgren/bluebun), a CLI framework designed for Bun. Each command is a separate TypeScript file that exports a Command object.