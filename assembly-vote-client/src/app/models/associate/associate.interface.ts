export interface IAssociateProps {
  id?: number;
  name?: string;
  cpf: string;
}

export interface IAssociateComponentProps extends IAssociateProps {
  vote: boolean;
}
