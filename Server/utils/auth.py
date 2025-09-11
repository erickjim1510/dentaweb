import secrets

def generar_token():
    """Genera un token único para la sesión"""
    return secrets.token_hex(32)