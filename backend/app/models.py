#modelo da tabela no banco. Cada campo corresponde a uma coluna.

from sqlalchemy import Column, Integer, String
from .database import Base

class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String)
    cpf = Column(String, unique=True, index=True)
    nascimento = Column(String)
    telefone = Column(String)
    email = Column(String)
    senha = Column(String)

