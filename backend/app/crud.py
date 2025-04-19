

from sqlalchemy.orm import Session
from . import models, schemas, auth

def criar_usuario(db: Session, usuario: schemas.UsuarioCreate):
    senha_hash = auth.hash_senha(usuario.senha)
    db_usuario = models.Usuario(
        nome=usuario.nome,
        cpf=usuario.cpf,
        nascimento=usuario.nascimento,
        telefone=usuario.telefone,
        email=usuario.email,
        senha=senha_hash
    )
    db.add(db_usuario)
    db.commit()
    db.refresh(db_usuario)
    return db_usuario

def autenticar_usuario(db: Session, cpf: str, senha: str):
    user = db.query(models.Usuario).filter(models.Usuario.cpf == cpf).first()
    if not user or not auth.verificar_senha(senha, user.senha):
        return None
    return user
