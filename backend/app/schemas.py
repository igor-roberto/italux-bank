#Esse esquema define o que o front precisa enviar no JSON quando for cadastrar alguém.

from pydantic import BaseModel

class UsuarioCreate(BaseModel):
    nome: str
    cpf: str
    nascimento: str
    telefone: str
    email: str
    senha: str

class UsuarioLogin(BaseModel):
    cpf: str
    senha: str

