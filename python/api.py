# IMPORTS

import requests



# FONCTIONS

def getDonnees(id_utilisateur, clef_API):
    try:
        r = requests.get(f"http://10.0.200.35:5000/configuration/{id_utilisateur}", headers={"API-Key": clef_API})
        if r.status_code == 200:
            return r.json()
    except:
        return
