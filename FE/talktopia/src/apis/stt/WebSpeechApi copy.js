<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <input type="text" id="myname" placeholder="님이름입력">
    <button class="click">누르면 음성인식 시작</button>
    <button class="click-end">누르면 음성인식 끝</button>
    <div class="output">
    </div>
    <div class="message">

    </div>

    <script src="
https://cdn.jsdelivr.net/npm/sockjs-client@1.1.2/dist/sockjs.min.js
"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/stomp.js/2.3.3/stomp.min.js"
        integrity="sha512-iKDtgDyTHjAitUDdLljGhenhPwrbBfqTKWO1mkhSFH3A7blITC9MhYon6SjnMhp4o0rADGw9yAC6EW4t5a4K3g=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script>
        // navigator.mediaDevices.getUserMedia({audio:true})
        // .then((res)=>{
        //     console.log("??")
        // })
        // 웹소켓 통신 시작
        // var sockJs = new SockJS("http://172.30.1.49:5000/audio-stream");
        var sockJs = new SockJS("http://192.168.31.232:5000/audio-stream"); // 웹소켓 연결
        var stomp = Stomp.over(sockJs) // stomp로 감싸기

        // 웹소켓 연결
        function connect() {
            // connect에서 비어있는 {}는 헤더정보임.
            stomp.connect({}, function (frame) { //frame은 stomp의 메세지 프레임
                // 웹소켓서버의 /topic/sub을 구독하면 message들어옴
                stomp.subscribe("/topic/getText/", function (message) {

                    console.log(JSON.parse(message.body));
                    showMessage(JSON.parse(message.body));
                })
            })
        }
        
        //메세지 출력
        function showMessage(message) {
            let message_area = document.querySelector(".message");
            message_area.innerHTML += `<p> ${message.sender}가 보낸 메세지: ${message.content}</p>`
        }
        // 웹소켓에 전달하는 기능
        function send(finalTranscript) {
            const myname = document.getElementById("myname").value; // 사용자 이름
            const sendMessage = {
                "sender": myname,
                "content": finalTranscript
            }
            stomp.send("/app/sendText", {}, JSON.stringify(sendMessage));
        }

        // 웹소켓 연결 시작
        connect();

        // 웹소켓 통신 끝

        // SpeechRecognition
        // https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition

        const recognition = new webkitSpeechRecognition();
        recognition.continuous = true; //  true: 각각 인식된 문장을 하나로 합침. 중간에 쉬어도 stop X
        recognition.lang = "ko-KR"; // 한국어 음성인식
        recognition.interimResults = true; // 중간에 인식되는 결과도 나오게 함
        recognition.maxAlternatives = 1;  // 다른 음성 인식 결과 최대 개수

        const diagnostic = document.querySelector(".output");
        const click = document.querySelector(".click");
        const click_end = document.querySelector(".click-end");

        click.addEventListener("click", () => {
            click.disabled = true;
            click_end.disabled = false;
            if (navigator.mediaDevices) { // 마이크 가능한지
                recognition.start();
                console.log("말 시작!!!");
            }
        });


        click_end.addEventListener("click", () => {
            click.disabled = false;
            click_end.disabled = true;
            recognition.stop();
            console.log("말 끝!!!");
        });

        var finalTranscripts = "";
        var i = 0;
        recognition.onresult = (event) => {
            // The first [0] returns the "SpeechRecognitionResult" at position 0.
            // Each SpeechRecognitionResult object contains "SpeechRecognitionAlternative objects" that contain individual results.
            console.log(event.results)

            var interimTranscripts = ""; // <= 중간결과
            let transcript = event.results[i][0].transcript; // 
            console.log(transcript);
            transcript.replace("\n", "<br>");
            if (event.results[i].isFinal) { // 지금 하는 말이 끝나면
                finalTranscripts = transcript;
                interimTranscripts = "";
                i++;
                diagnostic.innerHTML += "<br>"

                // 말 다했으면 웹소켓으로 전달
                send(finalTranscripts);
            }
            else {
                interimTranscripts += transcript;
            }
            diagnostic.innerHTML = finalTranscripts + '<span style="color: #999;">' + interimTranscripts + '</span>';
        };

        // 이벤트핸들러 시작
        recognition.onspeechend = function () {
            recognition.stop();
            console.log("speech end")
            i = 0;
        }

        recognition.onerror = function (event) {
            console.log('Error occurred in recognition: ' + event.error);
        }

        recognition.onaudiostart = function (event) {
            //Fired when the user agent has started to capture audio.
            console.log('onaudiostart');
        }

        recognition.onaudioend = function (event) {
            //Fired when the user agent has finished capturing audio.
            console.log('onaudioend');
        }

        recognition.onend = function (event) {
            //Fired when the speech recognition service has disconnected.
            console.log('한 뭉탱이 인식이 끝났습니다.');
        }

        recognition.onnomatch = function (event) {
            //Fired when the speech recognition service returns a final result with no significant recognition. This may involve some degree of recognition, which doesn't meet or exceed the confidence threshold.
            console.log('nomatch');
        }

        recognition.onsoundstart = function (event) {
            //Fired when any sound — recognisable speech or not — has been detected.
            console.log('on sound start');
        }

        recognition.onsoundend = function (event) {
            //Fired when any sound — recognisable speech or not — has stopped being detected.
            console.log('on sound end');
        }

        recognition.onspeechstart = function (event) {
            //Fired when sound that is recognised by the speech recognition service as speech has been detected.
            console.log('onspeechstart');
        }
        recognition.onstart = function (event) {
            //Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
            console.log('onstart');
        }
    // 이벤트핸들러 끝

    </script>
</body>

</html>