#Usamos bcrypt para armazenar as senhas protegidas no banco (sem salvar senha crua). E verificamos na hora do login.




from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_senha(senha: str):
    return pwd_context.hash(senha)

def verificar_senha(senha_plain: str, senha_hash: str):
    return pwd_context.verify(senha_plain, senha_hash)


