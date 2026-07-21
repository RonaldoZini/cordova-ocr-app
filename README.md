<h1>Leitor de Boletos com OCR</h1>

<p>Aplicativo de captura e leitura de boletos utilizando <b>OCR</b> (Optical Character Recognition) em dispositivos Android. </p>
<p>O objetivo é demonstrar a integração entre a câmera do dispositivo, processamento OCR e extração do código do boleto em uma aplicação mobile hibrida com <b>Angular, Ionic e Cordova</b>.</p>

<b>Tecnologias:</b>
- Angular 20
- Ionic 8
- Apache Cordova 12
- Android Platform 14
- RxJS 7.8
- Node 20.19.0

<b>Funcionalidades:</b>
- Captura de imagem utilizando a câmera do dispositivo
- Processamento OCR da imagem capturada
- Identificação do código do boleto
- Exibição do resultado da leitura
- Demonstração da integração entre câmera e OCR em aplicações híbridas

<b>Plugins cordova utilizados:</b>
- cordova-plugin-camera
- cordova-plugin-device
- cordova-plugin-file
- cordova-plugin-ionic-keyboard
- cordova-plugin-ionic-webview
- cordova-plugin-mobile-ocr
- cordova-plugin-statusbar

<b>Requisitos:</b>
- Android Studio
- Node.js ```20.19.0```
- Cordova ```12.0.0```
- Ionic CLI ```7.2.1```
- Angular ```v20.2.1```
- Gradle ```9.0.0```
- Java JDK ```17 ou superior```

<br>
<b>Instalação:</b>
<br><br>
Clone o projeto:
```
git clone https://github.com/RonaldoZini/cordova-ocr-app
cd cordova-ocr-app
```

Instale as dependências:
```
npm install
```

Adicionando a plataforma Android
```
ionic cordova platform add android
```

Build + Install (debug):
```
npm run install-apk
```

