# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: app.spec.ts >> Notificaciones >> al marcar favorito se programa notificación y se dispara
- Location: tests\app.spec.ts:352:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 1
Received: 0
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - banner [ref=e3]:
      - generic [ref=e4]:
        - link "← Volver al programa" [ref=e5] [cursor=pointer]:
          - /url: /
        - generic [ref=e6]:
          - generic [ref=e7]: "9"
          - generic [ref=e8]:
            - heading "Domingo" [level=1] [ref=e9]
            - paragraph [ref=e10]: 9 agosto · 25 eventos
            - generic [ref=e12]: Hoy
    - main [ref=e13]:
      - generic [ref=e14]:
        - generic [ref=e16]:
          - group "Filtrar por categoría" [ref=e18]:
            - button "🎵 Música" [ref=e19] [cursor=pointer]
            - button "🎪 Infantil" [ref=e20] [cursor=pointer]
            - button "⛪ Religioso" [ref=e21] [cursor=pointer]
            - button "🎺 Tradicional" [ref=e22] [cursor=pointer]
            - button "⚽ Deportivo" [ref=e23] [cursor=pointer]
            - button "🎭 Cultural" [ref=e24] [cursor=pointer]
            - button "🐂 Taurino" [ref=e25] [cursor=pointer]
            - button "📌 Otro" [ref=e26] [cursor=pointer]
          - generic [ref=e27]:
            - generic [ref=e28]:
              - generic [ref=e29]:
                - heading "Mañana" [level=2] [ref=e31]
                - generic [ref=e32]: "7"
              - generic [ref=e33]:
                - generic [ref=e37]:
                  - generic [ref=e39]: 09:00
                  - generic [ref=e40]:
                    - generic [ref=e41]:
                      - generic "Tradicional" [ref=e42]: 🎺
                      - generic [ref=e43]: Tradicional
                      - generic [ref=e44]: Extrarradio
                    - heading "Colocación pañoleta a San Juan Bosco" [level=3] [ref=e45]
                    - paragraph [ref=e46]: Acto de colocación de la pañoleta de las Fiestas de San Lorenzo a San Juan Bosco
                    - generic [ref=e47]:
                      - generic [ref=e48]: Colegio Salesianos San Bernardo
                      - link "Cómo llegar →" [ref=e49] [cursor=pointer]:
                        - /url: https://www.google.com/maps/search/?api=1&query=Colegio%20Salesianos%20San%20Bernardo%2C%2022002%20Huesca
                    - paragraph [ref=e50]: "Organiza: Salesianos Huesca"
                  - button "Quitar de favoritos" [ref=e51]: ★
                - generic [ref=e55]:
                  - generic [ref=e57]: 09:00
                  - generic [ref=e58]:
                    - generic [ref=e59]:
                      - generic "Tradicional" [ref=e60]: 🎺
                      - generic [ref=e61]: Tradicional
                      - generic [ref=e62]: Barrio de San Lorenzo
                    - heading "Saludo al Santo" [level=3] [ref=e63]
                    - paragraph [ref=e64]: Saludo al Santo y colocación de la pañoleta a cargo de Carlos Jalle González
                    - generic [ref=e65]:
                      - generic [ref=e66]: Plaza de San Lorenzo
                      - link "Cómo llegar →" [ref=e67] [cursor=pointer]:
                        - /url: https://www.google.com/maps/search/?api=1&query=Plaza%20de%20San%20Lorenzo%2C%2022002%20Huesca
                    - paragraph [ref=e68]: "Organiza: Peña Recreativa La Parrilla"
                  - button "Añadir a favoritos" [ref=e69]: ☆
                - generic [ref=e73]:
                  - generic [ref=e75]: 10:15
                  - generic [ref=e76]:
                    - generic [ref=e77]:
                      - generic "Tradicional" [ref=e78]: 🎺
                      - generic [ref=e79]: Tradicional
                    - heading "Izado de banderas" [level=3] [ref=e80]
                    - paragraph [ref=e81]: Acto de izado de banderas de Francia y España por parte de los alcaldes de las ciudades de Tarbes y Huesca. Interpretación de los respectivos himnos a cargo de la Banda de Música de Huesca
                    - generic [ref=e82]:
                      - generic [ref=e83]: Plaza de la Catedral
                      - link "Cómo llegar →" [ref=e84] [cursor=pointer]:
                        - /url: https://www.google.com/maps/search/?api=1&query=Plaza%20de%20la%20Catedral
                  - button "Añadir a favoritos" [ref=e85]: ☆
                - generic [ref=e89]:
                  - generic [ref=e91]: 11:00
                  - generic [ref=e92]:
                    - generic [ref=e93]:
                      - generic "Música" [ref=e94]: 🎵
                      - generic [ref=e95]: Música
                      - generic [ref=e96]: Centro Histórico
                    - heading "DJ Erik Romero" [level=3] [ref=e97]
                    - paragraph [ref=e98]: DJ Erik Romero + Adrián Roche + Rai + Sergio Aguilar
                    - generic [ref=e99]:
                      - generic [ref=e100]: Plaza de los Fueros de Aragón
                      - link "Cómo llegar →" [ref=e101] [cursor=pointer]:
                        - /url: https://www.google.com/maps/search/?api=1&query=Plaza%20de%20los%20Fueros%20de%20Arag%C3%B3n%2C%2022002%20Huesca
                    - paragraph [ref=e102]: "Organiza: Bares de plaza Fueros de Aragón"
                  - button "Añadir a favoritos" [ref=e103]: ☆
                - generic [ref=e107]:
                  - generic [ref=e109]: 12:00
                  - generic [ref=e110]:
                    - generic [ref=e111]:
                      - generic "Tradicional" [ref=e112]: 🎺
                      - generic [ref=e113]: Tradicional
                      - generic [ref=e114]: Centro Histórico
                    - heading "Pregón de fiestas" [level=3] [ref=e115]
                    - paragraph [ref=e116]: Desde el balcón principal del Palacio Consistorial, lectura del pregón y disparo del cohete anunciador del comienzo de las fiestas
                    - generic [ref=e117]:
                      - generic [ref=e118]: Palacio Consistorial / Plaza de Navarra
                      - link "Cómo llegar →" [ref=e119] [cursor=pointer]:
                        - /url: https://www.google.com/maps/search/?api=1&query=Plaza%20de%20Navarra%2C%2022002%20Huesca
                    - paragraph [ref=e120]: "Organiza: Aragón TV"
                  - button "Añadir a favoritos" [ref=e121]: ☆
                - generic [ref=e125]:
                  - generic [ref=e127]: 12:00
                  - generic [ref=e128]:
                    - generic [ref=e129]:
                      - generic "Tradicional" [ref=e130]: 🎺
                      - generic [ref=e131]: Tradicional
                      - generic [ref=e132]: Centro Histórico
                    - heading "Cabalgata pregón de fiestas" [level=3] [ref=e133]
                    - paragraph [ref=e134]: Cabalgata pregón de fiestas con la actuación de la Batucada Sambalá. Pasacalles con las charangas de las Peñas Recreativas Oscenses
                    - generic [ref=e135]:
                      - generic [ref=e136]: Plaza de la Catedral - Coso Alto - Porches de Galicia - Plaza de Navarra
                      - link "Cómo llegar →" [ref=e137] [cursor=pointer]:
                        - /url: https://www.google.com/maps/search/?api=1&query=Plaza%20de%20Navarra%2C%2022002%20Huesca
                    - paragraph [ref=e138]: "Organiza: Peña Recreativa 10 D'Agosto"
                  - button "Añadir a favoritos" [ref=e139]: ☆
                - generic [ref=e143]:
                  - generic [ref=e145]: 13:30
                  - generic [ref=e146]:
                    - generic [ref=e147]:
                      - generic "Música" [ref=e148]: 🎵
                      - generic [ref=e149]: Música
                      - generic [ref=e150]: Centro Histórico
                    - heading "DJ Alberto Andreu & Steve Lagarto" [level=3] [ref=e151]
                    - paragraph [ref=e152]: Música. DJ Alberto Andreu & Steve Lagarto
                    - generic [ref=e153]:
                      - generic [ref=e154]: Plaza de Navarra
                      - link "Cómo llegar →" [ref=e155] [cursor=pointer]:
                        - /url: https://www.google.com/maps/search/?api=1&query=Plaza%20de%20Navarra%2C%2022002%20Huesca
                  - button "Añadir a favoritos" [ref=e156]: ☆
            - generic [ref=e157]:
              - generic [ref=e158]:
                - heading "Tarde" [level=2] [ref=e160]
                - generic [ref=e161]: "12"
              - generic [ref=e162]:
                - generic [ref=e166]:
                  - generic [ref=e168]: 17:00
                  - generic [ref=e169]:
                    - generic [ref=e170]:
                      - generic "Música" [ref=e171]: 🎵
                      - generic [ref=e172]: Música
                    - heading "Actuación Batucada Sambalá" [level=3] [ref=e173]
                    - paragraph [ref=e174]: Actuación. Batucada Sambalá
                    - generic [ref=e175]:
                      - generic [ref=e176]: Residencia Saturnino López Novoa
                      - link "Cómo llegar →" [ref=e177] [cursor=pointer]:
                        - /url: https://www.google.com/maps/search/?api=1&query=Residencia%20Saturnino%20L%C3%B3pez%20Novoa
                  - button "Añadir a favoritos" [ref=e178]: ☆
                - generic [ref=e182]:
                  - generic [ref=e184]: 17:00
                  - generic [ref=e185]:
                    - generic [ref=e186]:
                      - generic "Tradicional" [ref=e187]: 🎺
                      - generic [ref=e188]: Tradicional
                      - generic [ref=e189]: Centro Histórico
                    - heading "Pasacalles charangas" [level=3] [ref=e190]
                    - paragraph [ref=e191]: Pasacalles con las charangas de las Peñas Recreativas Oscenses
                    - generic [ref=e192]:
                      - generic [ref=e193]: Plaza de Navarra - Plaza de Toros
                      - link "Cómo llegar →" [ref=e194] [cursor=pointer]:
                        - /url: https://www.google.com/maps/search/?api=1&query=Plaza%20de%20Navarra%2C%2022002%20Huesca
                  - button "Añadir a favoritos" [ref=e195]: ☆
                - generic [ref=e199]:
                  - generic [ref=e201]: 17:30
                  - generic [ref=e202]:
                    - generic [ref=e203]:
                      - generic "Infantil" [ref=e204]: 🎪
                      - generic [ref=e205]: Infantil
                      - generic [ref=e206]: Centro Histórico
                    - heading "Gran Parque Infantil de Hinchables" [level=3] [ref=e207]
                    - generic [ref=e208]:
                      - generic [ref=e209]: Parque Miguel Servet
                      - link "Cómo llegar →" [ref=e210] [cursor=pointer]:
                        - /url: https://www.google.com/maps/search/?api=1&query=Parque%20Miguel%20Servet%2C%2022002%20Huesca
                  - button "Añadir a favoritos" [ref=e211]: ☆
                - generic [ref=e215]:
                  - generic [ref=e217]: 18:30
                  - generic [ref=e218]:
                    - generic [ref=e219]:
                      - generic "Taurino" [ref=e220]: 🐂
                      - generic [ref=e221]: Taurino
                      - generic [ref=e222]: Plaza de Toros
                    - heading "Becerrada de las Peñas" [level=3] [ref=e223]
                    - paragraph [ref=e224]: Espectáculo de 'Casta aragonesa' y suelta de vacas
                    - generic [ref=e225]:
                      - generic [ref=e226]: Plaza de Toros
                      - link "Cómo llegar →" [ref=e227] [cursor=pointer]:
                        - /url: https://www.google.com/maps/search/?api=1&query=Plaza%20de%20Toros%2C%2022003%20Huesca
                    - paragraph [ref=e228]: "Organiza: Tauroemoción y Peñas Recreativas Oscenses"
                  - button "Añadir a favoritos" [ref=e229]: ☆
                - generic [ref=e233]:
                  - generic [ref=e235]: 19:00
                  - generic [ref=e236]:
                    - generic [ref=e237]:
                      - generic "Tradicional" [ref=e238]: 🎺
                      - generic [ref=e239]: Tradicional
                      - generic [ref=e240]: Centro Histórico
                    - heading "Pasacalles Gigantes y Cabezudos" [level=3] [ref=e241]
                    - paragraph [ref=e242]: Comparsa de Gigantes, Cabezudos y Caballicos de Huesca, acompañados por los Gaiters de Tierra Plana
                    - generic [ref=e243]:
                      - generic [ref=e244]: Plaza de la Catedral (recorrido por centro)
                      - link "Cómo llegar →" [ref=e245] [cursor=pointer]:
                        - /url: https://www.google.com/maps/search/?api=1&query=Plaza%20de%20Navarra%2C%2022002%20Huesca
                  - button "Añadir a favoritos" [ref=e246]: ☆
                - generic [ref=e250]:
                  - generic [ref=e252]: 20:00
                  - generic [ref=e253]:
                    - generic [ref=e254]:
                      - generic "Tradicional" [ref=e255]: 🎺
                      - generic [ref=e256]: Tradicional
                      - generic [ref=e257]: Centro Histórico
                    - heading "Toques de campana tradicionales" [level=3] [ref=e258]
                    - paragraph [ref=e259]: Toques de campana tradicionales de forma manual a cargo de la Asociación de Campaneros de Puzol (Valencia)
                    - generic [ref=e260]:
                      - generic [ref=e261]: Catedral de Huesca
                      - link "Cómo llegar →" [ref=e262] [cursor=pointer]:
                        - /url: https://www.google.com/maps/search/?api=1&query=Plaza%20de%20la%20Catedral%2C%2022001%20Huesca
                    - paragraph [ref=e263]: "Organiza: Catedral de Huesca"
                  - button "Añadir a favoritos" [ref=e264]: ☆
                - generic [ref=e268]:
                  - generic [ref=e270]: 20:00
                  - generic [ref=e271]:
                    - generic [ref=e272]:
                      - generic "Infantil" [ref=e273]: 🎪
                      - generic [ref=e274]: Infantil
                      - generic [ref=e275]: Centro Histórico
                    - heading "Circo Alas - Espectáculo familiar" [level=3] [ref=e276]
                    - paragraph [ref=e277]: Alas Teatro Circo con el espectáculo familiar 'Circo Alas'
                    - generic [ref=e278]:
                      - generic [ref=e279]: Parque Miguel Servet. Solárium
                      - link "Cómo llegar →" [ref=e280] [cursor=pointer]:
                        - /url: https://www.google.com/maps/search/?api=1&query=Parque%20Miguel%20Servet%2C%2022002%20Huesca
                  - button "Añadir a favoritos" [ref=e281]: ☆
                - generic [ref=e285]:
                  - generic [ref=e287]: 20:30
                  - generic [ref=e288]:
                    - generic [ref=e289]:
                      - generic "Música" [ref=e290]: 🎵
                      - generic [ref=e291]: Música
                      - generic [ref=e292]: Centro Histórico
                    - heading "Verbena Orquesta Centauro" [level=3] [ref=e293]
                    - paragraph [ref=e294]: Verbena. Orquesta Centauro La Grupestra
                    - generic [ref=e295]:
                      - generic [ref=e296]: Plaza Luis López Allué
                      - link "Cómo llegar →" [ref=e297] [cursor=pointer]:
                        - /url: https://www.google.com/maps/search/?api=1&query=Plaza%20Luis%20L%C3%B3pez%20Allu%C3%A9%2C%2022002%20Huesca
                  - button "Añadir a favoritos" [ref=e298]: ☆
                - generic [ref=e302]:
                  - generic [ref=e304]: 20:30
                  - generic [ref=e305]:
                    - generic [ref=e306]:
                      - generic "Música" [ref=e307]: 🎵
                      - generic [ref=e308]: Música
                      - generic [ref=e309]: Plaza de Toros
                    - heading "Salida Banda de Música" [level=3] [ref=e310]
                    - paragraph [ref=e311]: Salida de la Plaza de Toros con la Banda de Música de Huesca y las Peñas Recreativas Oscenses con sus charangas
                    - generic [ref=e312]:
                      - generic [ref=e313]: Plaza de Toros
                      - link "Cómo llegar →" [ref=e314] [cursor=pointer]:
                        - /url: https://www.google.com/maps/search/?api=1&query=Plaza%20de%20Toros%2C%2022003%20Huesca
                  - button "Añadir a favoritos" [ref=e315]: ☆
                - generic [ref=e319]:
                  - generic [ref=e321]: 20:30
                  - generic [ref=e322]:
                    - generic [ref=e323]:
                      - generic "Música" [ref=e324]: 🎵
                      - generic [ref=e325]: Música
                      - generic [ref=e326]: Coso Bajo
                    - heading "Animación musical Sonido 54" [level=3] [ref=e327]
                    - paragraph [ref=e328]: Animación musical Sonido 54 hasta las 23:00 horas
                    - generic [ref=e329]:
                      - generic [ref=e330]: Coso Bajo - Plaza Navarra
                      - link "Cómo llegar →" [ref=e331] [cursor=pointer]:
                        - /url: https://www.google.com/maps/search/?api=1&query=Coso%20Bajo%2C%2022002%20Huesca
                    - paragraph [ref=e332]: "Organiza: Peña Recreativa 10 D'Agosto"
                  - button "Añadir a favoritos" [ref=e333]: ☆
                - generic [ref=e337]:
                  - generic [ref=e339]: 21:00
                  - generic [ref=e340]:
                    - generic [ref=e341]:
                      - generic "Religioso" [ref=e342]: ⛪
                      - generic [ref=e343]: Religioso
                      - generic [ref=e344]: Barrio de San Lorenzo
                    - heading "Completas solemnes" [level=3] [ref=e345]
                    - paragraph [ref=e346]: Solemnes completas, interpretadas por la Coral Oscense, el Coro Ars Musicae, acompañados por la Orquesta de Cámara de Huesca
                    - generic [ref=e347]:
                      - generic [ref=e348]: Basílica de San Lorenzo
                      - link "Cómo llegar →" [ref=e349] [cursor=pointer]:
                        - /url: https://www.google.com/maps/search/?api=1&query=Plaza%20de%20San%20Lorenzo%2C%2022002%20Huesca
                    - paragraph [ref=e350]: "Organiza: Parroquia de San Lorenzo y Ayuntamiento de Huesca"
                  - button "Añadir a favoritos" [ref=e351]: ☆
                - generic [ref=e355]:
                  - generic [ref=e357]: 21:00
                  - generic [ref=e358]:
                    - generic [ref=e359]:
                      - generic "Tradicional" [ref=e360]: 🎺
                      - generic [ref=e361]: Tradicional
                      - generic [ref=e362]: Centro Histórico
                    - heading "Ronda jotera de los balcones" [level=3] [ref=e363]
                    - generic [ref=e364]:
                      - generic [ref=e365]: Plaza de Navarra - Plaza Concepción Arenal - Calle Fatás - Calle Padre Huesca - Plaza de San Lorenzo - Coso Bajo - Plaza Santo Domingo
                      - link "Cómo llegar →" [ref=e366] [cursor=pointer]:
                        - /url: https://www.google.com/maps/search/?api=1&query=Plaza%20de%20Navarra%2C%2022002%20Huesca
                    - paragraph [ref=e367]: "Organiza: Grupo Folclórico Roldán del Altoaragón"
                  - button "Añadir a favoritos" [ref=e368]: ☆
            - generic [ref=e369]:
              - generic [ref=e370]:
                - heading "Noche" [level=2] [ref=e372]
                - generic [ref=e373]: "6"
              - generic [ref=e374]:
                - generic [ref=e378]:
                  - generic [ref=e380]: 22:30
                  - generic [ref=e381]:
                    - generic [ref=e382]:
                      - generic "Música" [ref=e383]: 🎵
                      - generic [ref=e384]: Música
                      - generic [ref=e385]: Centro Histórico
                    - heading "XXVI Festival iberi@huesca.folk" [level=3] [ref=e386]
                    - paragraph [ref=e387]: Concierto. Dúo Bourry Rouch / Mirlos Folk
                    - generic [ref=e388]:
                      - generic [ref=e389]: Plaza General Alsina
                      - link "Cómo llegar →" [ref=e390] [cursor=pointer]:
                        - /url: https://www.google.com/maps/search/?api=1&query=Plaza%20General%20Alsina%2C%2022002%20Huesca
                  - button "Añadir a favoritos" [ref=e391]: ☆
                - generic [ref=e395]:
                  - generic [ref=e397]: 23:00
                  - generic [ref=e398]:
                    - generic [ref=e399]:
                      - generic "Tradicional" [ref=e400]: 🎺
                      - generic [ref=e401]: Tradicional
                      - generic [ref=e402]: Barrio de San Lorenzo
                    - heading "Ronda a San Lorenzo" [level=3] [ref=e403]
                    - paragraph [ref=e404]: Ronda a San Lorenzo a cargo de Agrupación Folclórica Santa Cecilia y Asociación Folclórica Estirpe de Aragonia
                    - generic [ref=e405]:
                      - generic [ref=e406]: Plaza de San Lorenzo
                      - link "Cómo llegar →" [ref=e407] [cursor=pointer]:
                        - /url: https://www.google.com/maps/search/?api=1&query=Plaza%20de%20San%20Lorenzo%2C%2022002%20Huesca
                  - button "Añadir a favoritos" [ref=e408]: ☆
                - generic [ref=e412]:
                  - generic [ref=e414]: 23:00
                  - generic [ref=e415]:
                    - generic [ref=e416]:
                      - generic "Música" [ref=e417]: 🎵
                      - generic [ref=e418]: Música
                      - generic [ref=e419]: Centro Histórico
                    - heading "DJ Apolo White" [level=3] [ref=e420]
                    - generic [ref=e421]:
                      - generic [ref=e422]: Plaza de los Fueros de Aragón
                      - link "Cómo llegar →" [ref=e423] [cursor=pointer]:
                        - /url: https://www.google.com/maps/search/?api=1&query=Plaza%20de%20los%20Fueros%20de%20Arag%C3%B3n%2C%2022002%20Huesca
                    - paragraph [ref=e424]: "Organiza: Bares de plaza Fueros de Aragón"
                  - button "Añadir a favoritos" [ref=e425]: ☆
                - generic [ref=e429]:
                  - generic [ref=e431]: 23:30
                  - generic [ref=e432]:
                    - generic [ref=e433]:
                      - generic "Música" [ref=e434]: 🎵
                      - generic [ref=e435]: Música
                      - generic [ref=e436]: Centro Histórico
                    - heading "DJ Gatobeat" [level=3] [ref=e437]
                    - paragraph [ref=e438]: Música. DJ Gatobeat
                    - generic [ref=e439]:
                      - generic [ref=e440]: Plaza de Navarra
                      - link "Cómo llegar →" [ref=e441] [cursor=pointer]:
                        - /url: https://www.google.com/maps/search/?api=1&query=Plaza%20de%20Navarra%2C%2022002%20Huesca
                  - button "Añadir a favoritos" [ref=e442]: ☆
                - generic [ref=e446]:
                  - generic [ref=e448]: 00:00
                  - generic [ref=e449]:
                    - generic [ref=e450]:
                      - generic "Música" [ref=e451]: 🎵
                      - generic [ref=e452]: Música
                      - generic [ref=e453]: Centro Histórico
                    - heading "Verbena Orquesta Centauro (continuación)" [level=3] [ref=e454]
                    - paragraph [ref=e455]: Verbena. Orquesta Centauro La Grupestra
                    - generic [ref=e456]:
                      - generic [ref=e457]: Plaza Luis López Allué
                      - link "Cómo llegar →" [ref=e458] [cursor=pointer]:
                        - /url: https://www.google.com/maps/search/?api=1&query=Plaza%20Luis%20L%C3%B3pez%20Allu%C3%A9%2C%2022002%20Huesca
                  - button "Añadir a favoritos" [ref=e459]: ☆
                - generic [ref=e463]:
                  - generic [ref=e465]: 03:00
                  - generic [ref=e466]:
                    - generic [ref=e467]:
                      - generic [ref=e468]: AHORA
                      - generic "Música" [ref=e469]: 🎵
                      - generic [ref=e470]: Música
                      - generic [ref=e471]: Palacio de Congresos
                    - heading "DJ Sessions - Álex Andreu & Alberto Fernández" [level=3] [ref=e472]
                    - paragraph [ref=e473]: DJ Sessions. Álex Andreu & Alberto Fernández
                    - generic [ref=e474]:
                      - generic [ref=e475]: Palacio de Congresos. Espacio escénico exterior
                      - link "Cómo llegar →" [ref=e476] [cursor=pointer]:
                        - /url: https://www.google.com/maps/search/?api=1&query=Palacio%20de%20Congresos%20de%20Huesca%2C%20Avenida%20de%20la%20Constituci%C3%B3n%2C%2022002%20Huesca
                  - button "Añadir a favoritos" [ref=e477]: ☆
        - complementary [ref=e478]:
          - generic [ref=e480]:
            - heading "Favoritos (1)" [level=2] [ref=e481]:
              - text: Favoritos
              - generic [ref=e482]: (1)
            - generic [ref=e484]:
              - generic [ref=e486]: 09:00
              - generic [ref=e487]:
                - generic [ref=e488]:
                  - generic "Tradicional" [ref=e489]: 🎺
                  - generic [ref=e490]: Tradicional
                  - generic [ref=e491]: Extrarradio
                - heading "Colocación pañoleta a San Juan Bosco" [level=3] [ref=e492]
                - paragraph [ref=e493]: Acto de colocación de la pañoleta de las Fiestas de San Lorenzo a San Juan Bosco
                - generic [ref=e494]:
                  - generic [ref=e495]: Colegio Salesianos San Bernardo
                  - link "Cómo llegar →" [ref=e496] [cursor=pointer]:
                    - /url: https://www.google.com/maps/search/?api=1&query=Colegio%20Salesianos%20San%20Bernardo%2C%2022002%20Huesca
                - paragraph [ref=e497]: "Organiza: Salesianos Huesca"
              - button "Quitar de favoritos" [ref=e498]: ★
  - navigation "Navegación principal" [ref=e500]:
    - generic [ref=e501]:
      - link "🏠 Inicio" [ref=e502] [cursor=pointer]:
        - /url: /
        - generic [ref=e503]: 🏠
        - generic [ref=e504]: Inicio
      - link "🎵 Música" [ref=e505] [cursor=pointer]:
        - /url: /conciertos
        - generic [ref=e506]: 🎵
        - generic [ref=e507]: Música
      - link "☆ Favoritos" [ref=e508] [cursor=pointer]:
        - /url: /favoritos
        - generic [ref=e509]: ☆
        - generic [ref=e510]: Favoritos
      - link "🗺️ Mapa" [ref=e511] [cursor=pointer]:
        - /url: /mapa
        - generic [ref=e512]: 🗺️
        - generic [ref=e513]: Mapa
  - button "Enviar feedback o sugerencia" [ref=e514] [cursor=pointer]:
    - img [ref=e515]
  - generic [ref=e521] [cursor=pointer]:
    - button "Open Next.js Dev Tools" [ref=e522]:
      - img [ref=e523]
    - generic [ref=e526]:
      - button "Open issues overlay" [ref=e527]:
        - generic [ref=e528]:
          - generic [ref=e529]: "0"
          - generic [ref=e530]: "1"
        - generic [ref=e531]: Issue
      - button "Collapse issues badge" [ref=e532]:
        - img [ref=e533]
  - alert [ref=e535]
```

# Test source

```ts
  316 |     await page.goto("/");
  317 |     const mapLink = page.locator('nav a[href="/mapa"]');
  318 |     await mapLink.click();
  319 |     await expect(page).toHaveURL(/\/mapa/);
  320 |   });
  321 | });
  322 | 
  323 | test.describe("PWA", () => {
  324 |   test("manifest está disponible", async ({ page }) => {
  325 |     const response = await page.goto("/manifest.json");
  326 |     expect(response?.status()).toBe(200);
  327 |   });
  328 | 
  329 |   test("service worker se registra", async ({ page }) => {
  330 |     test.setTimeout(20000);
  331 |     const swResp = await page.request.get("/sw.js");
  332 |     test.skip(swResp.status() !== 200, "Service worker no disponible en este entorno");
  333 | 
  334 |     await page.goto("/");
  335 |     const swReady = await page.evaluate(async () => {
  336 |       if (!("serviceWorker" in navigator)) return false;
  337 |       try {
  338 |         const reg = await Promise.race([
  339 |           navigator.serviceWorker.ready,
  340 |           new Promise<null>((resolve) => setTimeout(() => resolve(null), 8000)),
  341 |         ]);
  342 |         return reg ? "active" in reg && !!reg.active : false;
  343 |       } catch {
  344 |         return false;
  345 |       }
  346 |     });
  347 |     expect(swReady).toBe(true);
  348 |   });
  349 | });
  350 | 
  351 | test.describe("Notificaciones", () => {
  352 |   test("al marcar favorito se programa notificación y se dispara", async ({ page }) => {
  353 |     // En headless Chromium, grantPermissions('notifications') deja el permiso en
  354 |     // "denied". Se simula con un init script para que el permiso sea "granted".
  355 |     await page.addInitScript(() => {
  356 |       const permiso: NotificationPermission = "granted";
  357 |       Object.defineProperty(Notification, "permission", {
  358 |         get: () => permiso,
  359 |         configurable: true,
  360 |       });
  361 |       Notification.requestPermission = async () => permiso;
  362 |     });
  363 | 
  364 |     // Fijar reloj a 9 agosto 2026, 08:59:50 (10s antes del evento a las 09:00)
  365 |     await page.clock.install();
  366 |     await page.clock.setSystemTime(new Date("2026-08-09T08:59:50"));
  367 | 
  368 |     await page.goto("/dia/9");
  369 |     await page.waitForSelector(".evento-card");
  370 | 
  371 |     // Espiar constructor de Notification
  372 |     interface NotifCall {
  373 |       title: string;
  374 |       options: NotificationOptions;
  375 |     }
  376 | 
  377 |     interface NotifSpyWindow {
  378 |       __notifCalls: NotifCall[];
  379 |       Notification: {
  380 |         new (title: string, options?: NotificationOptions): Notification;
  381 |         permission: NotificationPermission;
  382 |         requestPermission: () => Promise<NotificationPermission>;
  383 |       };
  384 |     }
  385 | 
  386 |     await page.evaluate(() => {
  387 |       const w = window as unknown as NotifSpyWindow;
  388 |       w.__notifCalls = [];
  389 |       const OrigNotif = window.Notification;
  390 |       const mockNotif = function (
  391 |         this: void,
  392 |         title: string,
  393 |         options?: NotificationOptions
  394 |       ) {
  395 |         w.__notifCalls.push({ title, options: options ?? {} });
  396 |         return new OrigNotif(title, options);
  397 |       };
  398 |       w.Notification = mockNotif as unknown as NotifSpyWindow["Notification"];
  399 |       w.Notification.permission = OrigNotif.permission;
  400 |       w.Notification.requestPermission = OrigNotif.requestPermission.bind(OrigNotif);
  401 |     });
  402 | 
  403 |     // Marcar primer evento como favorito
  404 |     const favBtn = page.locator('button[aria-label="Añadir a favoritos"]').first();
  405 |     await favBtn.click();
  406 |     await page.waitForTimeout(200);
  407 | 
  408 |     // Avanzar reloj 11 segundos (pasamos de 08:59:50 a 09:00:01)
  409 |     // Con NEXT_PUBLIC_NOTIFICATION_TEST_DELAY=1000, el timer dispara a los 9s
  410 |     await page.clock.runFor(11_000);
  411 |     await page.waitForTimeout(500);
  412 | 
  413 |     const calls = await page.evaluate(() => {
  414 |       return (window as unknown as NotifSpyWindow).__notifCalls;
  415 |     });
> 416 |     expect(calls.length).toBe(1);
      |                          ^ Error: expect(received).toBe(expected) // Object.is equality
  417 |     expect(calls[0].title).toContain("Colocación pañoleta");
  418 |     expect(calls[0].options.body).toContain("09:00");
  419 |   });
  420 | });
  421 | 
  422 | test.describe("SEO", () => {
  423 |   test("homepage tiene título correcto", async ({ page }) => {
  424 |     await page.goto("/");
  425 |     const title = await page.title();
  426 |     expect(title).toContain("San Lorenzo");
  427 |   });
  428 | 
  429 |   test("homepage tiene meta description", async ({ page }) => {
  430 |     await page.goto("/");
  431 |     const desc = await page.locator('meta[name="description"]').getAttribute("content");
  432 |     expect(desc).toBeTruthy();
  433 |     expect(desc!.length).toBeGreaterThan(20);
  434 |   });
  435 | 
  436 |   test("días tienen generateMetadata", async ({ page }) => {
  437 |     await page.goto("/dia/9");
  438 |     const title = await page.title();
  439 |     expect(title).toContain("San Lorenzo");
  440 |   });
  441 | });
  442 | 
```