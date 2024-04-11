# IMPORTS

import requests



# FONCTIONS

def getDonnees(id_utilisateur, clef_API, ip_api, port_api):
    try:
        r = requests.get(f"http://{ip_api}:{port_api}/configuration/{id_utilisateur}", headers={"API-Key": clef_API})
        if r.status_code == 200:
            return r.json()
    except:
        return
