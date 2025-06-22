import type { Command } from "bluebun"

const command: Command = {
  name: "homeschool",
  description: "Default command - shows welcome message",
  run: async (props) => {
    console.log("Welcome to the Homeschool CLI!")
    console.log("Use 'homeschool help' to see available commands.")
  },
}

export default command 