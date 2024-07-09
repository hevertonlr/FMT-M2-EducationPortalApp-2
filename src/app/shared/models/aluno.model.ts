import { CursoModel } from "./curso.model";

export interface AlunoModel {
  id:string,
  nomeCompleto: string;
  cpf: string;
  email: string;
  celular: string;
  curso: CursoModel;
}
