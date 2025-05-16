# DUST

This too shall pass.


## Usage
To run the HTTPS server, you need to have Python installed then follow these steps to generate a self-signed certificate and start the server:

```bash
cd src

openssl req -new -x509 -keyout key.pem -out cert.pem -days 365 -nodes

python3 https_server.py
```