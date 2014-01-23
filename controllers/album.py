# coding: utf8
def index():
    grid = SQLFORM.grid(db.album, user_signature=False)
    return dict(grid=grid)

def upload_file():
    try:
        id = db.arquivos.insert(arquivo = db.arquivos.arquivo.store(request.vars.file, request.vars.filename))
        return id
    except:
        return dict(message=T('Upload error'))

 
def delete_file():
        try:
            name = request.args[0]
            db(db.arquivos.arquivo==name).delete()
            return name
        except:
            return 'erro'
