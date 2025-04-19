#Essas rotas recebem requisições do seu front-end.


from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, EmailStr, constr
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from database import SessionLocal, engine
import models

app = FastAPI()

# Cria as tabelas no banco
models.Base.metadata.create_all(bind=engine)

# Dependência para o banco de dados
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Criptografia de senhas
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# ---------- SCHEMAS ----------

class RegisterUser(BaseModel):
    nome: str
    cpf: constr(regex=r"^\d{3}\.\d{3}\.\d{3}-\d{2}$")
    nascimento: str
    telefone: str
    email: EmailStr
    confirmEmail: EmailStr
    senha: constr(min_length=6)
    confirmSenha: str

class LoginUser(BaseModel):
    cpf: str
    senha: str

# ---------- ENDPOINT: REGISTRO ----------

@app.post("/register")
def register_user(user: RegisterUser, db: Session = Depends(get_db)):
    if user.email != user.confirmEmail:
        raise HTTPException(status_code=400, detail="E-mails não coincidem.")
    if user.senha != user.confirmSenha:
        raise HTTPException(status_code=400, detail="Senhas não coincidem.")

    existing_user = db.query(models.User).filter(
        (models.User.email == user.email) | (models.User.cpf == user.cpf)
    ).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Usuário com esse CPF ou e-mail já existe.")

    hashed_password = pwd_context.hash(user.senha)

    new_user = models.User(
        nome=user.nome,
        cpf=user.cpf,
        nascimento=user.nascimento,
        telefone=user.telefone,
        email=user.email,
        senha=hashed_password,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "Cadastro realizado com sucesso!"}

# ---------- ENDPOINT: LOGIN ----------

@app.post("/login")
def login_user(credentials: LoginUser, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.cpf == credentials.cpf).first()

    if not user or not pwd_context.verify(credentials.senha, user.senha):
        raise HTTPException(status_code=401, detail="CPF ou senha incorretos.")

    return {"message": "Login realizado com sucesso", "nome": user.nome}



