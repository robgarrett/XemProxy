# XemProxy
Proxy for TheXem.info - inspired by https://github.com/uilton-oliveira/thexem-proxy
Updated to use the latest thexem.info url.

## Details

Sonarr uses https://thexem.info to map season and episode versions on tvdb and tmdb to scene (those on thexem) numbers.
Unfortunately, registration for thexem is currently closed and I wanted to a way to map season and episode numbers for British TB shows on TVCUK, which always seem different to tvdb.

You will need a Reverse Proxy (I used Apache 2) to map this to the url "thexem.info" on port 443 and change your hosts file to redirect thexem.info to localhost, or if your router allow it, change the dnsmasq settings to redirect it.

You will also need a certificate for TLS - I created a self-signed one for thexem.info, associated it to my reverse proxy and then trusted the cert locally on the server running Sonarr.

## Directories
This directory has been created in the image to be used for configuration and persistent storage (xem-mapping.json: custom mapping).
```
/thexem/config
```

### config.yml
This file contains the custom mapping that will be merged with the original response  
```yaml
---
exclude:
  - "70668"
include:
  - "77715":
      scene:
        absolute: 2
        season: 54
        episode: 2
      tvdb:
        absolute: 1
        season: 52
        episode: 1
      range: 300
      names:
        - Emmerdale: 52

```

### Example Apache Reverse Proxy
```xml
<VirtualHost _default_:443>
    ServerName thexem.info
    ServerAdmin admin@localhost
    ProxyPass / http://127.0.0.1:8080/ nocanon
    ProxyPassReverse / http://127.0.0.1:8080/
    ErrorLog ${APACHE_LOG_DIR}/thexem.info.log
    CustomLog /dev/null combined
    SSLEngine on
    SSLCertificateFile /etc/ssl/private/thexem.info.pem
    SSLCertificateKeyFile /etc/ssl/private/thexem.info.key
</VirtualHost>
```
