import type { Command } from "bluebun"

const command: Command = {
  name: "help",
  description: "Show help information",
  run: async (props) => {
    console.log("Homeschool CLI - Available Commands:")
    console.log("")
    console.log("  hello     - Say hello")
    console.log("  list      - List available scripts")
    console.log("  convert   - Run the convert_words script")
    console.log("  help      - Show this help message")
    console.log("")
    console.log("Usage: homeschool <command> [options]")
  },
}

export default command 