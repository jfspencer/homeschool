import type { Command } from "bluebun"

const command: Command = {
  name: "example",
  description: "Example command showing how to add new scripts",
  run: async (props) => {
    console.log("This is an example command!")
    console.log("You can add your own scripts by creating new files in cli/commands/")
    console.log("")
    console.log("Example usage:")
    console.log("  homeschool example")
    console.log("")
    console.log("To add a new script:")
    console.log("  1. Create a new .ts file in cli/commands/")
    console.log("  2. Export a Command object with name, description, and run function")
    console.log("  3. The command will be automatically available!")
  },
}

export default command 