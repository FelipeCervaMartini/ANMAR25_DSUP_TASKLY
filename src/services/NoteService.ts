import { NoteRepository } from "../repositories/NoteRepository";
import { createNoteSchema } from "../validators/note.schema";

export class NoteService {
  private repository = new NoteRepository();

  async createNote(taskId: number, input: unknown) {
    const parsed = createNoteSchema.safeParse(input);

    if (!parsed.success) {
      throw { type: "validation", details: parsed.error.format() };
    }

    return this.repository.create(taskId, parsed.data.content);
  }
}
