import type { Command } from "bluebun"

const command: Command = {
  name: "convert",
  description: "Run the convert_words script",
  run: async (props) => {
    console.log("Running convert_words script...")
    // Import and run the convert_words script
    await import("../../convert_words_array_to_object.ts")
  },
}

export default command 