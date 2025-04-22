import { NoteRepository } from "../repositories/NoteRepository";
import { createNoteSchema } from "../validators/note.schema";
import { updateNoteSchema } from "../validators/note.schema";

export class NoteService {
  private repository = new NoteRepository();

  async createNote(taskId: number, input: unknown) {
    const parsed = createNoteSchema.safeParse(input);

    if (!parsed.success) {
      throw { type: "validation", details: parsed.error.format() };
    }
    return this.repository.create(taskId, parsed.data.content);
  }

  async getNotesByTaskId(
    taskId: number,
    params: { page: number; limit: number; content?: string }
  ) {
    return this.repository.findByTaskId(taskId, params);
  }
  async getNoteById(id: number) {
    return this.repository.findById(id);
  }
  async updateNote(id: number, input: unknown) {
    const parse = updateNoteSchema.safeParse(input);
    if (!parse.success) {
      throw { type: "validation", details: parse.error.format() };
    }
    const existingNote = await this.repository.findById(id);
    if (!existingNote) {
      throw { type: "not_found", message: "Note not found" };
    }
    return this.repository.update(id, parse.data);
  }

  async deleteNote(id: number) {
    const noteExists = await this.repository.findById(id);

    if (!noteExists) {
      throw { type: "not_found", message: "Note not found" };
    }
    await this.repository.delete(id);
  }
}
