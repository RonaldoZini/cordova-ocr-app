Leitor de Boletos com OCR
Aplicativo demonstrativo desenvolvido com Angular, Ionic e Apache Cordova para captura e leitura de boletos utilizando OCR (Optical Character Recognition) em dispositivos Android.

O objetivo deste projeto é demonstrar a integração entre a câmera do dispositivo, processamento OCR e extração do código de barras do boleto para posterior tratamento pela aplicação.

Tecnologias
Angular 20
Ionic 8
Apache Cordova
Android Platform 14
RxJS 7.8
TypeScript
Principais Dependências
Framework
@angular/cli ^20.0.0
@ionic/angular ^8.0.0
rxjs ~7.8.0
Plataforma Mobile
cordova-android ^14.0.0
Plugins Cordova
cordova-plugin-camera
cordova-plugin-device
cordova-plugin-file
cordova-plugin-ionic-keyboard
cordova-plugin-ionic-webview
cordova-plugin-mobile-ocr
cordova-plugin-statusbar
Funcionalidades
Captura de imagem utilizando a câmera do dispositivo
Processamento OCR da imagem capturada
Identificação do código do boleto
Exibição do resultado da leitura
Demonstração da integração entre câmera e OCR em aplicações híbridas
Requisitos
Node.js (versão LTS recomendada)
Java JDK 17 ou superior
Android Studio
Android SDK
Ionic CLI
Cordova CLI
Instalação
Clone o projeto:

git clone <url-do-repositorio>
cd <nome-do-projeto>

Instale as dependências:

npm install

Executando no navegador
ionic serve

Observação: A funcionalidade de OCR depende dos plugins nativos e não estará disponível no navegador.

Adicionando a plataforma Android
ionic cordova platform add android

Executando no Android
Conecte um dispositivo Android ou inicie um emulador.

Execute:

ionic cordova run android

Para executar em modo Live Reload:

ionic cordova run android -l

Build de Produção
ionic build --prod
ionic cordova build android --release