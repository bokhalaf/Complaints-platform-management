export class addNoteUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async execute({ id, message, type }) {
  const result = await this.repository.addNote(id, message, type);
  return result;
}

}
