import type { Command } from "bluebun"

const command: Command = {
  name: "list",
  description: "List available scripts",
  run: async (props) => {
    console.log("Available scripts:")
    console.log("  - hello: Say hello")
    console.log("  - list: List available scripts")
    console.log("  - convert: Run the convert_words script")
    console.log("  - help: Show help information")
  },
}

export default command 