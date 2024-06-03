# IMPORTS

from tapo import ApiClient



# FONCTIONS

async def allumer_prise(tapo_username, tapo_password, ip_address):
    client = ApiClient(tapo_username, tapo_password)
    device = await client.p100(ip_address)
    await device.on()

async def eteindre_prise(tapo_username, tapo_password, ip_address):
    client = ApiClient(tapo_username, tapo_password)
    device = await client.p100(ip_address)
    await device.off()
